package model

import (
	"time"

	"gorm.io/datatypes"
)

type User struct {
	ID             uint           `gorm:"primaryKey"`
	Username       string         `gorm:"unique; not null" json:"username"`
	Email          string         `gorm:"unique; not null" json:"email"`
	Password       string         `gorm:"not null" json:"password"`
	Name           string         `json:"name"`
	Phone_Num      int            `gorm:"default:null" json:"phoneNum"`
	RegisteredAt   time.Time      `gorm:"autoCreateTime" json:"registeredAt"`
	UpdatedAt      time.Time      `gorm:"autoUpdateTime" json:"-"`
	AttendingRooms datatypes.JSON `json:"attendingRooms"`
	HostRooms      datatypes.JSON `json:"hostRooms"`
}
