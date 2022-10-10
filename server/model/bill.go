package model

type Bill struct {
	ID     uint   `gorm:"primaryKey"`
	Name   string `gorm:"not null" json:"name"`
	Amount int    `gorm:"not null" json:"amount"`
	Date   string `gorm:"not null" json:"date"`
	RoomID uint   `gorm:"not null" json:"roomID"`
}

type Transaction struct {
	ID     uint   `gorm:"primaryKey"`
	BillID uint   `gorm:"not null" json:"billID"`
	Payer  string `gorm:"not null" json:"payer"`
	Payee  string `gorm:"not null" json:"payee"`
	IsPaid bool   `gorm:"default:false" json:"isPaid"`
}
