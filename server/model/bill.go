package model

import "gorm.io/datatypes"

type Bill struct {
	ID     uint    `gorm:"primaryKey"`
	Name   string  `gorm:"not null" json:"name"`
	Amount float32 `gorm:"not null" json:"amount"`
	Date   string  `gorm:"not null" json:"date"`
	RoomID uint    `gorm:"not null" json:"roomID"`
}

type Transaction struct {
	ID     uint   `gorm:"primaryKey"`
	BillID uint   `gorm:"not null" json:"billID"`
	Payer  string `gorm:"not null" json:"payer"`
	Payee  string `gorm:"not null" json:"payee"`
	IsPaid bool   `gorm:"default:false" json:"isPaid"`
	PaidOn string `gorm:"default:null" json:"paidOn"`
}

type GenerateTransactionInput struct {
	Name        string         `json:"name"`
	ShouldPay   string         `json:"shouldPay"`
	Payers      datatypes.JSON `json:"payers" swaggertype:"array,string"`
	AmountToPay float32        `json:"amountToPay"`
	Date        string         `json:"date"`
	RoomID      string         `json:"roomId"`
}

type GenerateTransactionResponse struct {
	Transactions []Transaction `json:"transactions"`
	Bill         Bill          `json:"bill"`
}

type GetTransactionResponse struct {
	Transaction Transaction `json:"transaction"`
	Bill        Bill        `json:"bill"`
}

type PayBillInput struct {
	BillID string `json:"billId"`
	Payer  string `json:"payer"`
	Payee  string `json:"payee"`
	PaidOn string `json:"paidOn"`
}
