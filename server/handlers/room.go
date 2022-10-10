package handlers

import (
	"encoding/json"
	"fmt"
	"strconv"

	"sc2006-JustJio/database"
	"sc2006-JustJio/model"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

func getUser(t *jwt.Token, field string) string {
	claims := t.Claims.(jwt.MapClaims)
	if field == "user_id" {
		return fmt.Sprint(claims["user_id"].(float64))
	}
	return claims[field].(string)
}

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

func getAttendees(roomId string) ([]string, error) {
	db := database.DB

	var users []string

	// find room_users record
	if err := db.Table("room_users").Distinct("user").Find(&users, "room_id = ? AND accepted = ? AND is_attendee = ?", roomId, true, true).Error; err != nil {
		return nil, err
	}

	return users, nil
}

func GetRooms(c *fiber.Ctx) error {
	db := database.DB

	token := c.Locals("user").(*jwt.Token)
	username := getUser(token, "username")
	var roomInvites []string

	// find room_users record
	if err := db.Table("room_users").Distinct("room_id").Find(&roomInvites, "user = ? AND accepted = ? AND is_attendee = ?", username, true, true).Error; err != nil {
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
	username := getUser(token, "username")
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

func CreateRoom(c *fiber.Ctx) error {
	db := database.DB

	// create room
	room := new(model.Room)
	if err := c.BodyParser(room); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	token := c.Locals("user").(*jwt.Token)
	room.Host = getUser(token, "username")

	if err := db.Table("rooms").Create(&room).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room - error in rooms table", "data": err})
	}

	// convert to str
	roomID_str := strconv.FormatUint(uint64(room.ID), 10)

	// invitees -> create roomUser relationship
	var usernames []string
	json.Unmarshal([]byte(room.Invitees), &usernames)
	if err := inviteUser(usernames, roomID_str); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room - error in creating room_user record (invitees)", "data": err})
	}

	// host -> create roomUser relationship
	roomUser, err := createRoomUser(roomID_str, room.Host, "host")
	if err != nil || roomUser == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room - error in creating room_user record (host)", "data": err})
	}

	if err := db.Table("room_users").Create((&roomUser)).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room - error in room_users table", "data": err})
	}

	fmt.Println("Room " + room.Name + " created successfully.")
	return c.JSON(fiber.Map{"status": "success", "message": "Created room", "data": room})
}

func JoinRoom(c *fiber.Ctx) error {
	db := database.DB
	token := c.Locals("user").(*jwt.Token)

	roomID_str := c.Params("id")
	username := getUser(token, "username")

	// update accepted -> true
	if err := db.Table("room_users").Where("user = ? AND room_id = ?", username, roomID_str).Update("accepted", true).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room - error in room_users table", "data": err})
	}

	// update attendees_count
	if err := db.Table("rooms").Where("id = ?", roomID_str).Update("attendees_count", gorm.Expr("attendees_count + ?", 1)).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room - error in updating room table", "data": err})
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
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Joined room", "data": roomResponse})
}
