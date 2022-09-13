package model

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Username  string `gorm:"unique; not null" json:"username"`
	Email     string `gorm:"unique; not null" json:"email"`
	Password  string `gorm:"not null" json:"password"`
	Name      string `gorm:"not null" json:"name"`
	CreatedAt int64  `gorm:"autoCreateTime" json:"-"`
	UpdatedAt int64  `gorm:"autoUpdateTime:milli" json:"-"`
}
