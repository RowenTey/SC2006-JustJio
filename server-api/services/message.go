package services

import (
	"math"
	"sc2006-JustJio/database"
	"sc2006-JustJio/model"
	"time"

	"gorm.io/gorm"
)

type MessageService struct {
	DB *gorm.DB
}

const (
	MESSAGE_PAGE_SIZE = 10
)

func (c *MessageService) SaveMessage(room *model.Room, sender *model.User, content string) error {
	db := c.DB.Table("messages")

	msg := model.Message{
		Room:     *room,
		SenderID: sender.ID,
		Sender:   *sender,
		Content:  content,
		SentAt:   time.Now(),
	}

	if err := db.Create(&msg).Error; err != nil {
		return err
	}

	return nil
}

func (c *MessageService) GetMessageById(msgId, roomId string) (model.Message, error) {
	db := c.DB.Table("messages")
	var message model.Message

	if err := db.Where("id = ? AND room_id = ?", msgId, roomId).First(&message).Error; err != nil {
		return model.Message{}, err
	}

	return message, nil
}

func (c *MessageService) DeleteMessage(msgId, roomId string) error {
	db := c.DB.Table("messages")

	if err := db.Where("id = ? AND room_id = ?", msgId, roomId).Delete(&model.Message{}).Error; err != nil {
		return err
	}

	return nil
}

func (c *MessageService) DeleteRoomMessages(roomId string) error {
	db := c.DB.Table("messages")

	if err := db.Where("room_id = ?", roomId).Delete(&model.Message{}).Error; err != nil {
		return err
	}

	return nil
}

func (c *MessageService) CountNumMessagesPages(roomId string) (int, error) {
	db := c.DB.Table("messages")

	var count int64
	err := db.Where("room_id = ?", roomId).Count(&count).Error
	if err != nil {
		return 0, err
	}
	return int(math.Ceil(float64(count) / float64(MESSAGE_PAGE_SIZE))), nil
}

func (c *MessageService) GetMessagesByRoomId(roomId string, page int, asc bool) (*[]model.Message, error) {
	db := c.DB.Table("messages")
	var message []model.Message

	// sorted by
	order := "sent_at ASC"
	if !asc {
		order = "sent_at DESC"
	}

	if err := db.
		Where("room_id = ?", roomId).
		Order(order).
		Scopes(database.Paginate(page, MESSAGE_PAGE_SIZE)).
		Find(&message).Error; err != nil {
		return nil, err
	}

	return &message, nil
}
