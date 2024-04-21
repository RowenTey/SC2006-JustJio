package services

import (
	"errors"
	"sc2006-JustJio/database"
	"sc2006-JustJio/model"
	"strconv"
	"time"
)

type RoomService struct{}

func (rs RoomService) CreateRoom(room *model.Room, hostID string) (*model.Room, error) {
	roomsDB := database.DB.Table("rooms")
	usersDB := database.DB.Table("users")

	var user model.User
	if err := usersDB.First(&user, hostID).Error; err != nil {
		return nil, err
	}

	// Add user to room
	room.HostID = hostID
	room.Users = append(room.Users, user)
	if err := roomsDB.Create(&room).Error; err != nil {
		return nil, err
	}

	if err := usersDB.Where("id = ?", hostID).Association("Rooms").Append(room); err != nil {
		return nil, err
	}

	return room, nil
}

func (rs RoomService) GetRooms(userId string) (*[]model.Room, error) {
	usersDB := database.DB.Table("users")
	var user model.User

	if err := usersDB.Preload("Rooms").First(&user, userId).Error; err != nil {
		return nil, err
	}
	return &user.Rooms, nil
}

func (rs RoomService) GetRoomById(roomId string) (*model.Room, error) {
	db := database.DB.Table("rooms")
	var room model.Room

	if err := db.First(&room, roomId).Error; err != nil {
		return nil, err
	}
	return &room, nil
}

func (rs RoomService) GetRoomInvites(userId string) (*[]model.RoomInvite, error) {
	db := database.DB.Table("room_invites")
	var invites []model.RoomInvite

	if err := db.Where("user_id = ?", userId).Find(&invites).Error; err != nil {
		return nil, err
	}
	return &invites, nil
}

func (rs RoomService) GetRoomAttendees(roomId string) (*[]model.User, error) {
	db := database.DB.Table("rooms")
	var room model.Room

	if err := db.Preload("Users").First(&room, roomId).Error; err != nil {
		return nil, err
	}
	return &room.Users, nil
}

func (rs RoomService) CloseRoom(roomId string) error {
	db := database.DB.Table("rooms")
	var room model.Room

	if err := db.Where("id = ?", roomId).First(&room).Error; err != nil {
		return err
	}

	room.IsClosed = true
	room.UpdatedAt = time.Now()
	if err := db.Save(&room).Error; err != nil {
		return err
	}

	return nil
}

func (rs RoomService) UpdateRoomInviteStatus(roomId string, userId string, status string) error {
	if status != "accepted" && status != "rejected" {
		return errors.New("Invalid status")
	}

	roomsDB := database.DB.Table("rooms")
	roomInvitesDB := database.DB.Table("room_invites")
	usersDB := database.DB.Table("users")
	var invite model.RoomInvite
	var room model.Room

	if err := roomInvitesDB.Where("room_id = ? AND user_id = ?", roomId, userId).First(&invite).Error; err != nil {
		return err
	}

	invite.Status = status
	if err := roomInvitesDB.Save(&invite).Error; err != nil {
		return err
	}

	if err := roomsDB.Preload("Users").First(&room, roomId).Error; err != nil {
		return err
	}

	if status == "accepted" {
		var user model.User
		if err := usersDB.First(&user, userId).Error; err != nil {
			return err
		}

		// Update room attendees count
		room.AttendeesCount++
		room.Users = append(room.Users, user)
		room.UpdatedAt = time.Now()

		// Add user to room
		user.Rooms = append(user.Rooms, room)
		user.UpdatedAt = time.Now()
		if err := usersDB.Save(&user).Error; err != nil {
			return err
		}
	}

	if err := roomsDB.Save(&room).Error; err != nil {
		return err
	}

	return nil
}

func (rs RoomService) InviteUserToRoom(roomId string, inviterId string, userId []string, message string) (*[]model.RoomInvite, error) {
	roomInvitesDB := database.DB.Table("room_invites")
	usersDB := database.DB.Table("users")
	roomsDB := database.DB.Table("rooms")
	var room model.Room
	var roomInvites []model.RoomInvite

	if err := roomsDB.First(&room, roomId).Error; err != nil {
		return nil, err
	}

	inviterID, err := strconv.ParseUint(inviterId, 10, 64)
	if err != nil {
		return nil, err
	}

	var users []model.User
	if err := usersDB.Find(&users, userId).Error; err != nil {
		return nil, err
	}

	for _, user := range users {
		roomInvite := model.RoomInvite{
			RoomID:    room.ID,
			UserID:    user.ID,
			InviterID: uint(inviterID),
			Message:   message,
			CreatedAt: time.Now(),
			Status:    "pending",
		}
		roomInvites = append(roomInvites, roomInvite)
	}

	if err := roomInvitesDB.Create(roomInvites).Error; err != nil {
		return nil, err
	}

	return &roomInvites, nil
}

func (rs RoomService) LeaveRoom(roomId string, userId string) error {
	roomsDB := database.DB.Table("rooms")
	usersDB := database.DB.Table("users")
	var room model.Room
	var user model.User

	// Retrieve the room
	if err := roomsDB.Preload("Users").First(&room, roomId).Error; err != nil {
		return err
	}

	// Retrieve the user
	if err := usersDB.Preload("Rooms").First(&user, userId).Error; err != nil {
		return err
	}

	// Remove the user from the room
	for i, u := range room.Users {
		if u.ID == user.ID {
			room.Users = append(room.Users[:i], room.Users[i+1:]...)
			break
		}
	}

	// Remove the room from the user
	for i, r := range user.Rooms {
		if r.ID == room.ID {
			user.Rooms = append(user.Rooms[:i], user.Rooms[i+1:]...)
			break
		}
	}

	// Update the room and user in the database
	if err := roomsDB.Save(&room).Error; err != nil {
		return err
	}
	if err := usersDB.Save(&user).Error; err != nil {
		return err
	}

	return nil
}
