package model

import (
	"time"

	"github.com/oklog/ulid/v2"
)

type Message struct {
	ID       uint      `gorm:"primaryKey" json:"id"`
	RoomID   ulid.ULID `gorm:"primaryKey; autoIncrement:false; type:varbinary(255)" json:"room_id"`
	Room     Room      `gorm:"not null" json:"room"`
	SenderID uint      `gorm:"not null" json:"sender_id"`
	Sender   User      `gorm:"not null" json:"sender"`
	Content  string    `gorm:"not null" json:"content"`
	SentAt   time.Time `gorm:"autoCreateTime" json:"sent_at"`
	// ReadBy  []User    `gorm:"many2many:message_read_by;"`
}
