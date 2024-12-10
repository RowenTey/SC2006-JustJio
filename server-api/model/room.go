package model

import (
	"time"

	"github.com/oklog/ulid/v2"
	"gorm.io/gorm"
)

type Room struct {
	ID             ulid.ULID `gorm:"primaryKey;type:varbinary(255)" json:"id"`
	Name           string    `gorm:"not null" json:"name"`
	Time           string    `gorm:"not null" json:"time"`
	Venue          string    `gorm:"not null" json:"venue"`
	Date           time.Time `gorm:"not null" json:"date"`
	HostID         uint      `gorm:"not null" json:"host_id"`
	Host           User      `gorm:"not null; foreignKey:host_id" json:"host"`
	AttendeesCount int       `gorm:"default:1" json:"attendees_count"`
	CreatedAt      time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime" json:"updated_at"`
	IsClosed       bool      `gorm:"default:false" json:"is_closed"`
	Users          []User    `gorm:"many2many:room_users" json:"users"`
}

type RoomInvite struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	RoomID    ulid.ULID `gorm:"not null;type:varbinary(255)" json:"room_id"`    // Foreign key to Room table
	Room      Room      `gorm:"not null" json:"room"`                           // gorm feature -> not actually stored in DB
	UserID    uint      `gorm:"not null" json:"user_id"`                        // Foreign key to User table
	User      User      `gorm:"not null" json:"user"`                           // gorm feature -> not actually stored in DB
	InviterID uint      `gorm:"not null" json:"inviter_id"`                     // Foreign key to User table (who sent the invite)
	Inviter   User      `gorm:"not null; foreignKey:inviter_id" json:"inviter"` // gorm feature -> not actually stored in DB
	Status    string    `gorm:"not null; default:'pending'" json:"status"`      // Invite status (pending, accepted, rejected)
	Message   string    `json:"message"`                                        // Optional message from the inviter
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
}

func (room *Room) BeforeCreate(tx *gorm.DB) error {
	room.ID = ulid.Make()
	return nil
}
