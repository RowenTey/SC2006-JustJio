package handlers

// import (
// 	"encoding/json"
// 	"fmt"
// 	"strconv"

// 	"sc2006-JustJio/database"
// 	"sc2006-JustJio/model"
// 	"sc2006-JustJio/util"

// 	"github.com/gofiber/fiber/v2"
// 	"github.com/golang-jwt/jwt/v4"
// )

// func createBill(billName string, amount float32, date string, roomID_str string) (model.Bill, error) {
// 	db := database.DB.Table("bills")

// 	roomID_uint32, err := strconv.ParseUint(roomID_str, 10, 32)
// 	if err != nil {
// 		return model.Bill{}, err
// 	}

// 	roomID := uint(roomID_uint32)
// 	bill := model.Bill{
// 		Name:   billName,
// 		Amount: amount,
// 		Date:   date,
// 		RoomID: roomID,
// 	}
// 	if err := db.Create(&bill).Error; err != nil {
// 		return model.Bill{}, err
// 	}
// 	return bill, nil
// }

// func createTransactions(payer []string, payee string, billID uint) ([]model.Transaction, error) {
// 	db := database.DB.Table("transactions")

// 	var output []model.Transaction
// 	for _, user := range payer {
// 		transaction := model.Transaction{
// 			BillID: billID,
// 			Payee:  payee,
// 			Payer:  user,
// 		}
// 		if err := db.Create(&transaction).Error; err != nil {
// 			return nil, err
// 		}
// 		output = append(output, transaction)
// 	}

// 	return output, nil
// }

// // GenerateTransactions godoc
// // @Summary      Generate transactions for a bill in a specific room
// // @Description  Generate transactions after splitting a bill
// // @Tags         transactions
// // @Accept       json
// // @Produce      json
// // @Param        billRequest   body      model.GenerateTransactionInput  true  "Bill Details"
// // @Success      200  {object}   model.GenerateTransactionResponse
// // @Failure      400  {object}  nil
// // @Failure      500  {object}  nil
// // @Router       /bills/{roomId} [post]
// func GenerateTransactions(c *fiber.Ctx) error {
// 	var bills model.GenerateTransactionInput
// 	if err := c.BodyParser(&bills); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "Review your input",
// 			"data":    err,
// 		})
// 	}

// 	bills.RoomID = c.Params("billId")
// 	var payers []string
// 	json.Unmarshal([]byte(bills.Payers), &payers)

// 	// create bill & transactions
// 	bill, err := createBill(bills.Name, bills.AmountToPay, bills.Date, bills.RoomID)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"message": "Couldn't generate transaction - error in creating bill",
// 			"data":    err,
// 		})
// 	}
// 	transactions, err := createTransactions(payers, bills.ShouldPay, bill.ID)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"message": "Couldn't generate transaction - error in creating transactions",
// 			"data":    err,
// 		})
// 	}

// 	response := model.GenerateTransactionResponse{
// 		Transactions: transactions,
// 		Bill:         bill,
// 	}

// 	fmt.Println("Transaction generated for roomID " + bills.RoomID + ", everyone should pay $" + fmt.Sprintf("%f", bills.AmountToPay) + " to " + bills.ShouldPay)
// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"message": "Transactions generated succesfully",
// 		"data":    response,
// 	})
// }

// // GetTransactions godoc
// // @Summary      Get all transactions for a user
// // @Description  Get transactions by user's username
// // @Tags         transactions
// // @Accept       json
// // @Produce      json
// // @Success      200  {array}   []model.GetTransactionResponse
// // @Failure      500  {object}  nil
// // @Router       /bills [get]
// func GetTransactions(c *fiber.Ctx) error {
// 	db := database.DB

// 	token := c.Locals("user").(*jwt.Token)
// 	username := util.GetUserInfoFromToken(token, "username")

// 	var transactions []model.Transaction
// 	if err := db.Table("transactions").Find(&transactions, "payer = ? OR payee = ?", username, username).Error; err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"message": "Couldn't get transactions - error in transactions table",
// 			"data":    err,
// 		})
// 	}

// 	var response []model.GetTransactionResponse
// 	for _, transaction := range transactions {
// 		var temp model.GetTransactionResponse
// 		temp.Transaction = transaction
// 		billID := transaction.BillID
// 		if err := db.Table("bills").Find(&temp.Bill, "id = ?", billID).Error; err != nil {
// 			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 				"message": "Couldn't get transactions - error in bills table",
// 				"data":    err,
// 			})
// 		}
// 		response = append(response, temp)
// 	}

// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"message": "Retrived response successfully",
// 		"data":    response,
// 	})
// }

// // PayBill godoc
// // @Summary      Pay a bill
// // @Description  User pays an unsettled bill
// // @Tags         transactions
// // @Accept       json
// // @Produce      json
// // @Param        payBillRequest   body      model.PayBillInput  true  "Pay Bill Details"
// // @Success      200  {object}  nil
// // @Failure      400  {object}  nil
// // @Failure      500  {object}  nil
// // @Router       /bills/pay [patch]
// func PayBill(c *fiber.Ctx) error {
// 	db := database.DB.Table("transactions")

// 	var payBillInput model.PayBillInput
// 	if err := c.BodyParser(&payBillInput); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "Review your input",
// 			"data":    err,
// 		})
// 	}

// 	// update isPaid -> true & paidOn
// 	if err := db.Where("payer = ? AND payee = ? AND bill_id = ?", payBillInput.Payer, payBillInput.Payee, payBillInput.BillID).Updates(map[string]interface{}{"is_paid": true, "paid_on": payBillInput.PaidOn}).Error; err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"message": "Couldn't pay bill - error in room_users table",
// 			"data":    err,
// 		})
// 	}

// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"message": "Paid bill successfully",
// 		"data":    nil,
// 	})
// }
