package handlers

import (
	"errors"
	"log"
	"sc2006-JustJio/model/request"
	"sc2006-JustJio/services"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// GetUser godoc
// @Summary      Get a specific user
// @Description  Get user by ID
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "User ID"
// @Success      200  {object}  model.User
// @Failure      404  {object}  nil
// @Failure      500  {object}  nil
// @Router       /users/{id} [get]
func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	user, err := services.UserService{}.GetUserByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "No user found with ID" + id, "data": err})
		}
		log.Println("Error occurred in server:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Error occured in server", "data": err})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "User found", "data": user})
}

// UpdateUser godoc
// @Summary      Update user attribute
// @Description  Update user attribute with new value
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
	var request request.UpdateUserRequest
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	id := c.Params("id")

	err := services.UserService{}.UpdateUserField(id, request.Field, request.Value)
	if err != nil {
		if err.Error() == "User field "+request.Field+" not supported for update" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "User field " + request.Field + " not supported for update", "data": err})
		}
		log.Println("Error occurred in server:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Error occured in server", "data": err})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "User successfully updated", "data": request})
}

// DeleteUser godoc
// @Summary      Delete a user
// @Description  Delete a user account
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        password   body      handlers.DeleteUser.PasswordInput  true  "User Password"
// @Success      200  {object}  nil
// @Failure      400  {object}  nil
// @Failure      401  {object}  nil
// @Router       /users/{id} [delete]
func DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")

	err := services.UserService{}.DeleteUser(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "No user found with ID" + id, "data": err})
		}
		log.Println("Error occurred in server:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Error occured in server", "data": err})
	}

	return c.Status(fiber.StatusNoContent).JSON(fiber.Map{"status": "success", "message": "User successfully deleted", "data": nil})
}
