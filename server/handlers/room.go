package handlers

import (
	"encoding/json"
	"fmt"

	"sc2006-JustJio/database"
	"sc2006-JustJio/model"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/datatypes"
)

func getHost(t *jwt.Token) string {
	claims := t.Claims.(jwt.MapClaims)
	return claims["username"].(string)
}

func GetRooms(c *fiber.Ctx) error {
	roomsDB := database.DB.Table("rooms")

	var allRooms = new([]model.Room)

	roomsDB.Find(&allRooms)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Rooms found", "data": allRooms})
}

func CreateRoom(c *fiber.Ctx) error {
	roomsDB := database.DB.Table("rooms")
	usersDB := database.DB.Table("users")
	room := new(model.Room)
	if err := c.BodyParser(room); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	token := c.Locals("user").(*jwt.Token)
	user, err := getUserByUsername(getHost(token))
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Username not found", "data": err})
	}

	room.Host = getHost(token)
	room.Attendees = datatypes.JSON([]byte(`{"name": []}`))

	if err := roomsDB.Create(&room).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create room", "data": err})
	}

	// Update room record
	type HostRooms struct {
		Name []string `json:"name"`
	}
	var hostRoomsList HostRooms

	json.Unmarshal([]byte(user.HostRooms), &hostRoomsList)
	hostRoomsList.Name = append(hostRoomsList.Name, room.Name)
	user.HostRooms, err = json.Marshal(hostRoomsList)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Failed to add host", "data": err})
	}
	usersDB.Save(&user)

	fmt.Println("Room " + room.Name + " created successfully.")
	return c.JSON(fiber.Map{"status": "success", "message": "Created room", "data": room})
}

func JoinRoom(c *fiber.Ctx) error {
	roomsDB := database.DB.Table("rooms")
	usersDB := database.DB.Table("users")

	// Find existing room
	roomID := c.Params("id")
	var room model.Room
	roomsDB.First(&room, roomID)
	if room.Name == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "No room found", "data": nil})
	}

	// Get user who made the request (Wants to join)
	token := c.Locals("user").(*jwt.Token)
	user, err := getUserByUsername(getHost(token))
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Username not found", "data": err})
	}

	// Update room record
	type Attendees struct {
		Name []string `json:"name"`
	}
	var attendeesList Attendees

	json.Unmarshal([]byte(room.Attendees), &attendeesList)
	attendeesList.Name = append(attendeesList.Name, user.Username)
	room.AttendeesCount += 1
	room.Attendees, err = json.Marshal(attendeesList)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Failed to join room", "data": err})
	}

	// Update user record
	type AttendingRooms struct {
		Name []string `json:"name"`
	}
	var attendingRoomsList AttendingRooms

	json.Unmarshal([]byte(user.AttendingRooms), &attendingRoomsList)
	attendingRoomsList.Name = append(attendingRoomsList.Name, room.Name)
	user.AttendingRooms, err = json.Marshal(attendingRoomsList)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Failed to join room", "data": err})
	}

	roomsDB.Save(&room)
	usersDB.Save(&room)

	fmt.Println("User " + user.Username + " joined room " + room.Name + " successfully.")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Joined room", "data": room})
}
