package model

import (
	"time"
)

type User struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Username     string    `gorm:"unique; not null" json:"username"`
	Email        string    `gorm:"unique; not null" json:"email"`
	Password     string    `gorm:"not null" json:"password"`
	Name         string    `json:"name"`
	PhoneNum     string    `gorm:"default:null" json:"phone_num"`
	Rooms        []Room    `gorm:"many2many:room_users" json:"rooms"`
	Friends      []User    `gorm:"many2many:user_friends" json:"friends"`
	IsEmailValid bool      `gorm:"default:false" json:"is_email_valid"`
	IsOnline     bool      `gorm:"default:false" json:"is_online"`
	LastSeen     time.Time `json:"last_seen"`
	RegisteredAt time.Time `gorm:"autoCreateTime" json:"registered_at"`
	UpdatedAt    time.Time `gorm:"autoUpdateTime" json:"-"`
}
