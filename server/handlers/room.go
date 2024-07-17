package handlers

import (
	"encoding/json"
	"errors"
	"log"
	"strconv"

	"sc2006-JustJio/model/request"
	"sc2006-JustJio/model/response"
	"sc2006-JustJio/services"
	"sc2006-JustJio/util"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

// GetRooms godoc
// @Summary      Get all rooms for a user
// @Description  Get rooms by user's username
// @Tags         rooms
// @Accept       json
// @Produce      json
// @Success      200  {array}   model.Room
// @Failure      500  {object}  nil
// @Router       /rooms [get]
func GetRooms(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")

	rooms, err := services.RoomService{}.GetRooms(userId)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status":  "error",
				"message": "No rooms found",
				"data":    err,
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't get rooms",
			"data":    err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Retrieved rooms successfully",
		"data":    rooms,
	})
}

// GetRoomInvitations godoc
// @Summary      Get all invitations for a user
// @Description  Get invitations by user's username
// @Tags         invites
// @Accept       json
// @Produce      json
// @Success      200  {array}   model.Room
// @Failure      500  {object}  nil
// @Router       /rooms/invites/{roomId} [get]
func GetRoomInvitations(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")

	invites, err := services.RoomService{}.GetRoomInvites(userId)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status":  "error",
				"message": "No room invitations found",
				"data":    err,
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't get room invitations",
			"data":    err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Retrieved room invitations successfully",
		"data":    invites,
	})
}

// GetRoomAttendees godoc
// @Summary      Get all attendees for a room
// @Description  Get attendees by roomID
// @Tags         rooms
// @Accept       json
// @Produce      json
// @Param        roomID   path      int  true  "Room ID"
// @Success      200  {array}   string
// @Failure      500  {object}  nil
// @Router       /rooms/attendees/ [get]
func GetRoomAttendees(c *fiber.Ctx) error {
	roomId := c.Params("id")

	attendees, err := services.RoomService{}.GetRoomAttendees(roomId)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status":  "error",
				"message": "No attendees found",
				"data":    err,
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't get room attendees",
			"data":    err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Retrived room attendees successfully",
		"data":    attendees,
	})
}

// CreateRoom godoc
// @Summary      Create a room
// @Description  Create a room in database
// @Tags         rooms
// @Accept       json
// @Produce      json
// @Param        room   body      model.CreateRoomInput   true  "Room"
// @Param        invites   body      model.CreateRoomInput  true  "Invites"
// @Success      200  {object}   model.Room
// @Failure      400  {object}  nil
// @Failure      404  {object}  nil
// @Failure      500  {object}  nil
// @Router       /rooms [post]
func CreateRoom(c *fiber.Ctx) error {
	var request request.CreateRoomRequest
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")

	var inviteesIds []string
	json.Unmarshal([]byte(request.InviteesId), &inviteesIds)

	err := services.UserService{}.ValidateUsers(inviteesIds)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "User doesn't exist", "data": err})
	}

	room, err := services.RoomService{}.CreateRoom(&request.Room, userId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't create room",
			"data":    err,
		})
	}

	roomIdStr := strconv.FormatUint(uint64(room.ID), 10)
	invites, err := services.RoomService{}.InviteUserToRoom(roomIdStr, userId, inviteesIds, "You have been invited to join this room")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't create room",
			"data":    err,
		})
	}

	response := response.CreateRoomResponse{
		Room:    *room,
		Invites: *invites,
	}

	log.Println("Room " + room.Name + " created successfully.")
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":  "success",
		"message": "Created room successfully",
		"data":    response,
	})
}

// CloseRoom godoc
// @Summary      Close a room
// @Description  Set a room to closed
// @Tags         rooms
// @Accept       json
// @Produce      json
// @Param        roomID   path      int  true  "Room ID"
// @Success      200  {object}  nil
// @Failure      500  {object}  nil
// @Router       /rooms/{roomId} [delete]
func CloseRoom(c *fiber.Ctx) error {
	roomId := c.Params("id")

	err := services.RoomService{}.CloseRoom(roomId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't close room",
			"data":    err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Closed room successfully",
		"data":    nil,
	})
}

// JoinRoom godoc
// @Summary      Join a room
// @Description  Set accepted to true in invitation database
// @Tags         invites
// @Accept       json
// @Produce      json
// @Param        roomID   path      int  true  "Room ID"
// @Success      200  {object}    model.JoinRoomResponse
// @Failure      500  {object}  nil
// @Router       /rooms/join/{roomId} [patch]
func RespondToRoomInvite(c *fiber.Ctx) error {
	var request request.RespondToRoomInviteRequest
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")
	roomId := c.Params("id")

	roomService := services.RoomService{}

	status := "accepted"
	if !request.Accept {
		status = "rejected"
	}

	err := roomService.UpdateRoomInviteStatus(roomId, userId, status)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Room not found", "data": err})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room", "data": err})
	}

	room, err := roomService.GetRoomById(roomId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room", "data": err})
	}

	attendees, err := roomService.GetRoomAttendees(roomId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't join room", "data": err})
	}

	roomResponse := response.JoinRoomResponse{
		Room:     *room,
		Attendes: *attendees,
	}

	log.Println("User " + util.GetUserInfoFromToken(token, "username") + " joined Room " + roomId + " successfully.")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Joined room successfully",
		"data":    roomResponse,
	})
}

// InviteUser godoc
// @Summary      Create new invitations
// @Description  Invite additional users to a specific room
// @Tags         invites
// @Accept       json
// @Produce      json
// @Param        users   body      handlers.AddUser.AddUserInput  true  "Users to invite"
// @Success      200  {object}  nil
// @Failure      400  {object}  nil
// @Failure      404  {object}  nil
// @Failure      500  {object}  nil
// @Router       /rooms/{roomId} [post]
func InviteUser(c *fiber.Ctx) error {
	var request request.InviteUserRequest
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")
	roomId := c.Params("id")

	var inviteesIds []string
	json.Unmarshal([]byte(request.InviteesId), &inviteesIds)

	roomInvites, err := services.RoomService{}.InviteUserToRoom(roomId, userId, inviteesIds, "You have been invited to join this room")
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Room / User not found", "data": err})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't invite users",
			"data":    err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Invited users successfully", "data": roomInvites})
}

func LeaveRoom(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")
	roomId := c.Params("id")

	err := services.RoomService{}.LeaveRoom(roomId, userId)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Room not found", "data": err})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't leave room", "data": err})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Left room successfully", "data": nil})
}
