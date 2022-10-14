package handlers

import (
	"encoding/json"
	"fmt"
	"strconv"

	"sc2006-JustJio/database"
	"sc2006-JustJio/model"
	"sc2006-JustJio/util"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

func createRoomUser(roomID_str string, username string, userType string) (*model.RoomUser, error) {
	roomID_uint32, err := strconv.ParseUint(roomID_str, 10, 32)
	if err != nil {
		return nil, err
	}
	roomID := uint(roomID_uint32)

	if userType == "attendee" {
		roomUser := model.RoomUser{
			User:       username,
			RoomID:     roomID,
			IsAttendee: true,
			Accepted:   false,
		}
		return &roomUser, nil
	} else if userType == "host" {
		roomUser := model.RoomUser{
			User:     username,
			RoomID:   roomID,
			IsHost:   true,
			Accepted: true,
		}
		return &roomUser, nil
	}
	return nil, nil
}

func inviteUser(usernames []string, roomID_str string) error {
	db := database.DB

	for _, username := range usernames {
		roomUser, err := createRoomUser(roomID_str, username, "attendee")
		if err != nil || roomUser == nil {
			return err
		}

		if err := db.Table("room_users").Create(&roomUser).Error; err != nil {
			return err
		}
	}
	return nil
}

func getAttendees(roomID string) ([]string, error) {
	db := database.DB
	var users []string

	// find room_users record
	if err := db.Table("room_users").Distinct("user").Find(&users, "room_id = ? AND accepted = ? AND is_attendee = ?", roomID, true, true).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// TODO: fix the logic for host
func GetRooms(c *fiber.Ctx) error {
	db := database.DB

	token := c.Locals("user").(*jwt.Token)
	username := util.GetUser(token, "username")
	var roomInvites []string

	// find room_users record
	if err := db.Table("room_users").Distinct("room_id").Find(&roomInvites, "user = ? AND accepted = ?", username, true).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't get rooms - error in room_users table", "data": err})
	}

	// get the rooms data
	var rooms = new([]model.Room)
	if err := db.Table("rooms").Find(&rooms, "id IN ?", roomInvites).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't get rooms - error in rooms table", "data": err})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Found rooms successfully", "data": rooms})
}

func GetRoomInvitations(c *fiber.Ctx) error {
	db := database.DB

	token := c.Locals("user").(*jwt.Token)
	username := util.GetUser(token, "username")
	var roomInvites []string

	// find room_users record
	if err := db.Table("room_users").Distinct("room_id").Find(&roomInvites, "user = ? AND accepted = ?", username, false).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't get room invitations - error in room_users table", "data": err})
	}

	// get the rooms data
	var rooms = new([]model.Room)
	if err := db.Table("rooms").Find(&rooms, "id IN ?", roomInvites).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't get room invitations - error in rooms table", "data": err})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Found room invitations", "data": rooms})
}

func GetRoomAttendees(c *fiber.Ctx) error {
	roomID := c.Params("id")

	attendees, err := getAttendees(roomID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't get room attendees", "data": err})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Found room attendees", "data": attendees})
}

func CreateRoom(c *fiber.Ctx) error {
	db := database.DB
	type CreateRoomInput struct {
		Room     model.Room     `json:"room"`
		Invitees datatypes.JSON `json:"invitees"`
	}

	// create room
	var roomInput CreateRoomInput
	if err := c.BodyParser(&roomInput); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	token := c.Locals("user").(*jwt.Token)
	roomInput.Room.Host = util.GetUser(token, "username")

	if err := db.Table("rooms").Create(&roomInput.Room).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room - error in rooms table", "data": err})
	}

	// convert to str
	roomID_str := strconv.FormatUint(uint64(roomInput.Room.ID), 10)

	// invitees -> create roomUser relationship
	var usernames []string
	json.Unmarshal([]byte(roomInput.Invitees), &usernames)
	if err := inviteUser(usernames, roomID_str); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room - error in creating room_user record (invitees)", "data": err})
	}

	// host -> create roomUser relationship
	roomUser, err := createRoomUser(roomID_str, roomInput.Room.Host, "host")
	if err != nil || roomUser == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room - error in creating room_user record (host)", "data": err})
	}

	if err := db.Table("room_users").Create(&roomUser).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room - error in room_users table", "data": err})
	}

	fmt.Println("Room " + roomInput.Room.Name + " created successfully.")
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "message": "Created room", "data": roomInput})
}

func CloseRoom(c *fiber.Ctx) error {
	db := database.DB
	roomID_str := c.Params("id")

	if err := db.Table("rooms").Delete(&model.Room{}, roomID_str).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't close room - error in rooms table", "data": err})
	}

	if err := db.Table("room_users").Where("room_id = ?", roomID_str).Delete(&model.RoomUser{}).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't close room - error in room_users table", "data": err})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Closed room successfully", "data": nil})
}

func JoinRoom(c *fiber.Ctx) error {
	db := database.DB
	token := c.Locals("user").(*jwt.Token)

	roomID_str := c.Params("id")
	username := util.GetUser(token, "username")

	// update accepted -> true
	if err := db.Table("room_users").Where("user = ? AND room_id = ?", username, roomID_str).Update("accepted", true).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room - error in room_users table", "data": err})
	}

	// update attendees_count
	if err := db.Table("rooms").Where("id = ?", roomID_str).Update("attendees_count", gorm.Expr("attendees_count + ?", 1)).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room - error in updating rooms table", "data": err})
	}

	// get room & attendees to return
	type RoomResponse struct {
		Room     model.Room `json:"room"`
		Attendes []string   `json:"attendees"`
	}

	var room model.Room
	if err := db.Table("rooms").Find(&room, "id = ?", roomID_str).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room - error in getting room", "data": err})
	}

	attendees, err := getAttendees(roomID_str)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room - error in getting room attendees", "data": err})
	}

	roomResponse := RoomResponse{
		Room:     room,
		Attendes: attendees,
	}

	fmt.Println("User " + username + " joined Room " + roomID_str + " successfully.")
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "message": "Joined room", "data": roomResponse})
}

func DeclineRoom(c *fiber.Ctx) error {
	db := database.DB
	token := c.Locals("user").(*jwt.Token)
	username := util.GetUser(token, "username")
	roomID := c.Params("id")

	var toDelete model.RoomUser
	if err := db.Table("room_users").First(&toDelete, "user = ? AND room_id = ?", username, roomID).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't decline room - error in finding invitation", "data": err})
	}

	if err := db.Table("room_users").Delete(&toDelete).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't decline room - error in deleting invitation", "data": err})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Declined room successfully", "data": nil})
}
