package model

import (
	"gorm.io/datatypes"
)

type Room struct {
	ID             uint           `gorm:"primaryKey"`
	Name           string         `gorm:"not null" json:"name"`
	Time           string         `gorm:"not null" json:"time"`
	Venue          string         `gorm:"not null" json:"venue"`
	Date           datatypes.Date `json:"date"`
	Host           string         `gorm:"not null" json:"host"`
	AttendeesCount int            `gorm:"default:1" json:"attendeesCount"`
	URL            string         `json:"url"`
	CreatedAt      int64          `gorm:"autoCreateTime" json:"-"`
	UpdatedAt      int64          `gorm:"autoUpdateTime:milli" json:"-"`
	Attendees      datatypes.JSON `json:"attendees"`
	PartyItems     datatypes.JSON `json:"partyItems"`
}
