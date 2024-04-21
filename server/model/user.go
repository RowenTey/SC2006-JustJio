package model

import (
	"time"
)

type User struct {
	ID           uint      `gorm:"primaryKey"`
	Username     string    `gorm:"unique; not null" json:"username"`
	Email        string    `gorm:"unique; not null" json:"email"`
	Password     string    `gorm:"not null" json:"password"`
	Name         string    `json:"name"`
	PhoneNum     string    `gorm:"default:null" json:"phone_num"`
	Rooms        []Room    `gorm:"many2many:room_users"`
	RegisteredAt time.Time `gorm:"autoCreateTime" json:"registered_at"`
	UpdatedAt    time.Time `gorm:"autoUpdateTime" json:"-"`
}
