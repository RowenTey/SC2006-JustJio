package handlers

import (
	"fmt"
	"sc2006-JustJio/database"
	"sc2006-JustJio/model"
	"sc2006-JustJio/util"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

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
	if !util.CheckPasswordHash(password, user.Password) {
		return false
	}
	return true
}

// GetUser godoc
// @Summary      Get a specific user
// @Description  get user by ID
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "User ID"
// @Success      200  {object}  model.User
// @Failure      404  {object}  nil
// @Router       /users/{id} [get]
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

// UpdateUser godoc
// @Summary      Update user attribute
// @Description  update user attribute with new value
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        field   body      string  true  "Field"
// @Param        value   body      string  true  "Value"
// @Success      200  {object}  handlers.UpdateUser.UpdateUserInput
// @Failure      400  {object}  nil
// @Failure      401  {object}  nil
// @Failure      404  {object}  nil
// @Router       /users/{id} [patch]
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

// DeleteUser godoc
// @Summary      Delete a user
// @Description  delete a user account
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        password   body      handlers.DeleteUser.PasswordInput  true  "User Password"
// @Success      200  {object}  nil
// @Failure      400  {object}  nil
// @Failure      401  {object}  nil
// @Router       /users/{id} [delete]
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
