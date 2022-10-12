package model

import (
	"time"
)

type Room struct {
	ID             uint      `gorm:"primaryKey"`
	Name           string    `gorm:"not null" json:"name"`
	Time           string    `gorm:"not null" json:"time"`
	Venue          string    `gorm:"not null" json:"venue"`
	Date           string    `gorm:"not null" json:"date"`
	Host           string    `gorm:"not null" json:"host"`
	AttendeesCount int       `gorm:"default:1" json:"attendeesCount"`
	URL            string    `json:"url"`
	CreatedAt      time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime" json:"-"`
	// Invitees       datatypes.JSON `json:"invitees"`
}

// juntion table to model user & room relationships
type RoomUser struct {
	ID         uint   `gorm:"primaryKey"`
	User       string `gorm:"not null" json:"user"`
	RoomID     uint   `gorm:"not null" json:"roomID"`
	IsHost     bool   `gorm:"default:false" json:"isHost"`
	IsAttendee bool   `gorm:"default:false" json:"isAttendee"`
	Accepted   bool   `gorm:"default:false" json:"accepted"`
}
