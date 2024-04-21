package model

import (
	"time"
)

type Room struct {
	ID             uint      `gorm:"primaryKey"`
	Name           string    `gorm:"not null" json:"name"`
	Time           string    `gorm:"not null" json:"time"`
	Venue          string    `gorm:"not null" json:"venue"`
	Date           time.Time `gorm:"not null" json:"date"`
	HostID         string    `gorm:"not null" json:"host_id"`
	AttendeesCount int       `gorm:"default:1" json:"attendees_count"`
	URL            string    `json:"url"`
	CreatedAt      time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime" json:"updated_at"`
	IsClosed       bool      `gorm:"default:false" json:"is_closed"`
	Users          []User    `gorm:"many2many:room_users"`
}

type RoomInvite struct {
	ID        uint      `gorm:"primaryKey"`
	RoomID    uint      `gorm:"not null"`                                 // Foreign key to Room table
	UserID    uint      `gorm:"not null"`                                 // Foreign key to User table
	InviterID uint      `gorm:"not null"`                                 // Foreign key to User table (who sent the invite)
	Status    string    `gorm:"not null default:'pending'" json:"status"` // Invite status (pending, accepted, rejected)
	Message   string    `json:"message"`                                  // Optional message from the inviter
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_At"`
}
