package handlers

import (
	"fmt"
	"sc2006-JustJio/database"
	"sc2006-JustJio/model"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func validToken(token *jwt.Token, id string) bool {
	n, err := strconv.Atoi(id)
	if err != nil {
		return false
	}

	claims := token.Claims.(jwt.MapClaims)
	user_id := int(claims["user_id"].(float64))

	if user_id != n {
		return false
	}

	return true
}

func validUser(id string, password string) bool {
	db := database.DB.Table("users")
	var user model.User
	db.First(&user, id)
	if user.Username == "" {
		return false
	}
	if !CheckPasswordHash(password, user.Password) {
		return false
	}
	return true
}

// GetUser -> get a user
func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB.Table("users")
	var user model.User

	db.Find(&user, id)
	if user.Username == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "No user found with ID", "data": nil})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "User found", "data": user})
}

func GetUsers(c *fiber.Ctx) error {
	db := database.DB.Table("users")
	user := new([]model.User)

	db.Find(&user)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Users found", "data": user})
}

// UpdateUser -> update user
func UpdateUser(c *fiber.Ctx) error {
	type UpdateUserInput struct {
		Field string `json:"field"`
		Value string `json:"value"`
	}

	var updatedUserInput UpdateUserInput
	if err := c.BodyParser(&updatedUserInput); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)

	if !validToken(token, id) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Invalid token id", "data": nil})
	}

	db := database.DB.Table("users")
	var user model.User

	db.First(&user, id)
	switch updatedUserInput.Field {
	case "name":
		user.Name = updatedUserInput.Value
		break
	case "phoneNum":
		user.Phone_Num = updatedUserInput.Value
		break
	default:
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Invalid data", "data": updatedUserInput.Field})
	}
	db.Save(&user)

	fmt.Println("User " + user.Username + " has updated " + updatedUserInput.Field + " successfully.")
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "message": "User successfully updated", "data": updatedUserInput})
}

// DeleteUser -> delete user
func DeleteUser(c *fiber.Ctx) error {
	type PasswordInput struct {
		Password string `json:"password"`
	}

	var passwordInput PasswordInput
	if err := c.BodyParser(&passwordInput); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)

	if !validToken(token, id) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Invalid token id", "data": nil})
	}

	if !validUser(id, passwordInput.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Invalid user", "data": nil})
	}

	db := database.DB.Table("users")
	var user model.User

	db.First(&user, id)
	db.Delete(&user)

	fmt.Println("User " + user.Username + " has been deleted.")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "User successfully deleted", "data": nil})
}
