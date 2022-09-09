package model

import (
	"gorm.io/gorm"
)

type User struct {
	// ID        guuid.UUID `gorm:"primaryKey" json:"-"`
	gorm.Model
	Username  string `gorm:"unique_index;not null" json:"username"`
	Email     string `gorm:"unique_index;not null" json:"email"`
	Password  string `gorm:"not null" json:"password"`
	CreatedAt int64  `gorm:"autoCreateTime" json:"-" `
	UpdatedAt int64  `gorm:"autoUpdateTime:milli" json:"-"`
}
