package handlers

import (
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

func createRoomUser(roomID_str string, userID_str string, userType string) (*model.RoomUser, error) {
	roomID_uint32, err := strconv.ParseUint(roomID_str, 10, 32)
	if err != nil {
		return nil, err
	}
	roomID := uint(roomID_uint32)

	userID_uint32, err := strconv.ParseUint(userID_str, 10, 32)
	if err != nil {
		return nil, err
	}
	userID := uint(userID_uint32)

	if userType == "attendee" {
		roomUser := model.RoomUser{
			UserID:     userID,
			RoomID:     roomID,
			IsAttendee: true,
		}
		return &roomUser, nil
	} else if userType == "host" {
		roomUser := model.RoomUser{
			UserID: userID,
			RoomID: roomID,
			IsHost: true,
		}
		return &roomUser, nil
	}
	return nil, nil
}

func GetRooms(c *fiber.Ctx) error {
	roomsDB := database.DB.Table("rooms")

	var allRooms = new([]model.Room)

	roomsDB.Find(&allRooms)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Rooms found", "data": allRooms})
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
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room - error in room table", "data": err})
	}

	// create roomUser relationship
	roomID_str := strconv.FormatUint(uint64(room.ID), 10)
	userID_str := getUser(token, "user_id")

	roomUser, err := createRoomUser(roomID_str, userID_str, "host")
	if err != nil || roomUser == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room - error in creating room_user record", "data": err})
	}

	if err := db.Table("room_users").Create((&roomUser)).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room  - error in room_users table", "data": err})
	}

	fmt.Println("Room " + room.Name + " created successfully.")
	return c.JSON(fiber.Map{"status": "success", "message": "Created room", "data": room})
}

func JoinRoom(c *fiber.Ctx) error {
	db := database.DB
	token := c.Locals("user").(*jwt.Token)

	roomID_str := c.Params("id")
	userID_str := getUser(token, "user_id")

	roomUser, err := createRoomUser(roomID_str, userID_str, "attendee")
	if err != nil || roomUser == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room - error in creating room_user record", "data": err})
	}

	if err := db.Table("room_users").Create((&roomUser)).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room - error in room_users table", "data": err})
	}

	if err := db.Table("rooms").Where("id = ?", roomID_str).Update("attendees_count", gorm.Expr("attendees_count + ?", 1)).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room - error in updating room table", "data": err})
	}

	fmt.Println("User " + userID_str + " joined Room " + roomID_str + " successfully.")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Joined room", "data": roomUser})
}
