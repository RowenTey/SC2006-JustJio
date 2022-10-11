package handlers

import (
	"encoding/json"
	"fmt"
	"strconv"

	"sc2006-JustJio/database"
	"sc2006-JustJio/model"
	"sc2006-JustJio/util"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/datatypes"
)

func createBill(billName string, amount int, date string, roomID_str string) (*model.Bill, error) {
	db := database.DB

	roomID_uint32, err := strconv.ParseUint(roomID_str, 10, 32)
	if err != nil {
		return nil, err
	}
	roomID := uint(roomID_uint32)

	bill := model.Bill{
		Name:   billName,
		Amount: amount,
		Date:   date,
		RoomID: roomID,
	}
	if err := db.Table("bills").Create(&bill).Error; err != nil {
		return nil, err
	}

	return &bill, nil
}

func createTransactions(payer []string, payee string, billID uint) (*[]model.Transaction, error) {
	db := database.DB

	var toReturn []model.Transaction
	for _, user := range payer {
		transaction := model.Transaction{
			BillID: billID,
			Payee:  payee,
			Payer:  user,
		}
		if err := db.Table("transactions").Create(&transaction).Error; err != nil {
			return nil, err
		}
		toReturn = append(toReturn, transaction)
	}

	return &toReturn, nil
}

func GenerateTransactions(c *fiber.Ctx) error {
	type BillReq struct {
		Name        string         `json:"name"`
		ShouldPay   string         `json:"shouldPay"`
		Payers      datatypes.JSON `json:"payers"`
		AmountToPay int            `json:"amountToPay"`
		Date        string         `json:"date"`
		RoomID      string         `json:"roomId"`
	}
	var bills BillReq

	if err := c.BodyParser(&bills); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}
	bills.RoomID = c.Params("id")
	var payers []string
	json.Unmarshal([]byte(bills.Payers), &payers)

	// create bill & transaction
	bill, err := createBill(bills.Name, bills.AmountToPay, bills.Date, bills.RoomID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't generate transaction - error in creating bill", "data": err})
	}
	transactions, err := createTransactions(payers, bills.ShouldPay, bill.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't generate transaction - error in creating transactions", "data": err})
	}

	type TransactionResponse struct {
		Transactions []model.Transaction `json:"transactions"`
		Bill         model.Bill          `json:"bill"`
	}
	transactionResponse := TransactionResponse{
		Transactions: *transactions,
		Bill:         *bill,
	}

	fmt.Println("Transaction generated for roomID " + bills.RoomID + " , everyone should pay $" + strconv.Itoa(bills.AmountToPay) + " to " + bills.ShouldPay)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Transactions generated succesfully", "data": transactionResponse})
}

// Get Transactions for a user
func GetTransactions(c *fiber.Ctx) error {
	db := database.DB

	token := c.Locals("user").(*jwt.Token)
	username := util.GetUser(token, "username")

	var transactions []model.Transaction
	if err := db.Table("transactions").Find(&transactions, "payer = ? OR payee = ?", username, username).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't get transactions - error in transactions table", "data": err})
	}

	type TransactionResponse struct {
		Transaction model.Transaction `json:"transaction"`
		Bill        model.Bill        `json:"bill"`
	}

	var transactionResponse []TransactionResponse
	for _, transaction := range transactions {
		var transactionResponseElement TransactionResponse
		transactionResponseElement.Transaction = transaction
		billID := transaction.BillID
		if err := db.Table("bills").Find(&transactionResponseElement.Bill, "id = ?", billID).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't get transactions - error in bills table", "data": err})
		}
		transactionResponse = append(transactionResponse, transactionResponseElement)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Transactions found", "data": transactionResponse})
}
