package handlers

import (
	"encoding/json"
	"errors"
	"log"
	"strconv"

	"sc2006-JustJio/database"
	"sc2006-JustJio/model/request"
	"sc2006-JustJio/model/response"
	"sc2006-JustJio/services"
	"sc2006-JustJio/util"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

func GetRoom(c *fiber.Ctx) error {
	roomId := c.Params("roomId")

	room, err := (&services.RoomService{DB: database.DB}).GetRoomById(roomId)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.HandleError(c, fiber.StatusNotFound, "Room not found", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	return util.HandleSuccess(c, "Retrieved room successfully", room)
}

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

	pageStr := c.Query("page", "1")
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		page = 1
	}

	roomService := &services.RoomService{DB: database.DB}

	rooms, err := roomService.GetRooms(userId, page)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.HandleError(c, fiber.StatusNotFound, "No rooms found", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	return util.HandleSuccess(c, "Retrieved rooms successfully", rooms)
}

// GetRoomInvitations godoc
// @Summary      Get all invitations for a user
// @Description  Get invitations by user's username
// @Tags         invites
// @Accept       json
// @Produce      json
// @Success      200  {array}   model.Room
// @Failure      500  {object}  nil
// @Router       /rooms/invites/ [get]
func GetRoomInvitations(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")

	roomService := &services.RoomService{DB: database.DB}

	invites, err := roomService.GetRoomInvites(userId)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.HandleError(c, fiber.StatusNotFound, "No room invitations found", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	return util.HandleSuccess(c, "Retrieved room invitations successfully", invites)
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
	roomId := c.Params("roomId")

	roomService := &services.RoomService{DB: database.DB}

	attendees, err := roomService.GetRoomAttendees(roomId)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.HandleError(c, fiber.StatusNotFound, "No attendees found", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	return util.HandleSuccess(c, "Retrieved room attendees successfully", attendees)
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
		return util.HandleInvalidInputError(c, err)
	}

	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")

	var inviteesIds []string
	json.Unmarshal([]byte(request.InviteesId), &inviteesIds)

	tx := database.DB.Begin()

	userService := &services.UserService{DB: tx}
	roomService := &services.RoomService{DB: tx}

	user, err := userService.GetUserByID(userId)
	if err != nil {
		tx.Rollback()
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.HandleError(c, fiber.StatusNotFound, "User not found", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	invitees, err := userService.ValidateUsers(inviteesIds)
	if err != nil {
		tx.Rollback()
		return util.HandleError(c, fiber.StatusNotFound, "User doesn't exist", err)
	}

	room, err := roomService.CreateRoom(&request.Room, user)
	if err != nil {
		tx.Rollback()
		return util.HandleInternalServerError(c, err)
	}

	roomIdStr := strconv.FormatUint(uint64(room.ID), 10)
	invites, err := roomService.InviteUserToRoom(
		roomIdStr, user, invitees, request.Message)
	if err != nil {
		tx.Rollback()
		return util.HandleInternalServerError(c, err)
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return util.HandleInternalServerError(c, err)
	}

	response := response.CreateRoomResponse{
		Room:    *room,
		Invites: *invites,
	}

	log.Println("Room " + room.Name + " created successfully.")
	return util.HandleSuccess(c, "Created room successfully", response)
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
	roomId := c.Params("roomId")
	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")

	err := (&services.RoomService{DB: database.DB}).CloseRoom(roomId, userId)
	if err != nil {
		if err.Error() == "User is not the host of the room" {
			return util.HandleError(
				c, fiber.StatusUnauthorized, "Only hosts are allowed to close rooms", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	return util.HandleSuccess(c, "Closed room successfully", nil)
}

// RespondToRoomInvite godoc
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
		return util.HandleInvalidInputError(c, err)
	}

	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")
	roomId := c.Params("roomId")

	roomService := &services.RoomService{DB: database.DB}

	status := "accepted"
	if !request.Accept {
		status = "rejected"
	}

	err := roomService.UpdateRoomInviteStatus(roomId, userId, status)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.HandleError(c, fiber.StatusNotFound, "Room not found", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	if status == "rejected" {
		return util.HandleSuccess(c, "Rejected room invitation successfully", nil)
	}

	room, err := roomService.GetRoomById(roomId)
	if err != nil {
		return util.HandleInternalServerError(c, err)
	}

	attendees, err := roomService.GetRoomAttendees(roomId)
	if err != nil {
		return util.HandleInternalServerError(c, err)
	}

	roomResponse := response.JoinRoomResponse{
		Room:     *room,
		Attendes: *attendees,
	}

	log.Println(
		"User " + util.GetUserInfoFromToken(token, "username") + " joined Room " + roomId + " successfully.")
	return util.HandleSuccess(c, "Joined room successfully", roomResponse)
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
		return util.HandleInvalidInputError(c, err)
	}

	// TODO: Check if user is host of room

	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")
	roomId := c.Params("roomId")

	var inviteesIds []string
	json.Unmarshal([]byte(request.InviteesId), &inviteesIds)

	tx := database.DB.Begin()
	userService := &services.UserService{DB: tx}

	user, err := userService.GetUserByID(userId)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.HandleError(c, fiber.StatusNotFound, "User not found", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	invitees, err := userService.ValidateUsers(inviteesIds)
	if err != nil {
		return util.HandleError(c, fiber.StatusNotFound, "User doesn't exist", err)
	}

	roomInvites, err := (&services.RoomService{DB: tx}).InviteUserToRoom(
		roomId, user, invitees, "You have been invited to join this room")
	if err != nil {
		tx.Rollback()
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.HandleError(c, fiber.StatusNotFound, "Room / User not found", err)
		} else if err.Error() == "User is not the host of the room" {
			return util.HandleError(c, fiber.StatusUnauthorized, "Only hosts are allowed to invite users", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return util.HandleInternalServerError(c, err)
	}

	return util.HandleSuccess(c, "Invited users successfully", roomInvites)
}

func LeaveRoom(c *fiber.Ctx) error {
	var err error
	token := c.Locals("user").(*jwt.Token)
	userId := util.GetUserInfoFromToken(token, "user_id")
	roomId := c.Params("roomId")

	tx := database.DB.Begin()
	err = (&services.RoomService{DB: tx}).RemoveUserFromRoom(roomId, userId)
	if err != nil {
		tx.Rollback()
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.HandleError(c, fiber.StatusNotFound, "Room not found", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return util.HandleInternalServerError(c, err)
	}

	return util.HandleSuccess(c, "Left room successfully", nil)
}

// TODO: Implement endpoint for host to remove user from room
