package model

import "time"

type Message struct {
	ID      uint      `gorm:"primaryKey"`
	RoomID  uint      `gorm:"not null"`
	UserID  uint      `gorm:"not null"`
	Content string    `gorm:"not null"`
	SentAt  time.Time `gorm:"autoCreateTime" json:"sent_at"`
}
