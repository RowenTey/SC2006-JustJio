package model

import (
	"time"

	"gorm.io/datatypes"
)

type Room struct {
	ID             uint           `gorm:"primaryKey"`
	Name           string         `gorm:"not null" json:"name"`
	Time           string         `gorm:"not null" json:"time"`
	Venue          string         `gorm:"not null" json:"venue"`
	Host           string         `gorm:"not null" json:"host"`
	AttendeesCount int            `gorm:"default:1" json:"attendeesCount"`
	URL            string         `json:"url"`
	CreatedAt      time.Time      `gorm:"autoCreateTime" json:"CreatedAt"`
	UpdatedAt      time.Time      `gorm:"autoUpdateTime" json:"-"`
	PartyItems     datatypes.JSON `json:"partyItems"`
	// Date           datatypes.Date `json:"date"`
}

// juntion table to model user & room relationships
type RoomUser struct {
	ID         uint `gorm:"primaryKey"`
	UserID     uint `gorm:"not null" json:"userID"`
	RoomID     uint `gorm:"not null" json:"RoomID"`
	IsHost     bool `gorm:"default:false" json:"isHost"`
	IsAttendee bool `gorm:"default:false" json:"IsAttendee"`
}
