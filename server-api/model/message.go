package model

import (
	"time"
)

type Message struct {
	ID       uint      `gorm:"primaryKey" json:"id"`
	RoomID   uint      `gorm:"primaryKey; autoIncrement:false" json:"room_id"`
	Room     Room      `gorm:"not null" json:"room"`
	SenderID uint      `gorm:"not null" json:"sender_id"`
	Sender   User      `gorm:"not null" json:"sender"`
	Content  string    `gorm:"not null" json:"content"`
	SentAt   time.Time `gorm:"autoCreateTime" json:"sent_at"`
	// ReadBy  []User    `gorm:"many2many:message_read_by;"`
}
