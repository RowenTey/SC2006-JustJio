package handlers

import (
	"errors"
	"log"

	"sc2006-JustJio/model"
	"sc2006-JustJio/model/request"
	"sc2006-JustJio/model/response"
	"sc2006-JustJio/services"
	"sc2006-JustJio/util"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// SignUp godoc
// @Summary      Signs up a user
// @Description  Create an account for a user
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        newUser   body      model.User  true  "New User"
// @Success      201  {object}  model.AuthResponse
// @Failure      400  {object}  nil
// @Failure      500  {object}  nil
// @Router       /auth/signup [post]
func SignUp(c *fiber.Ctx) error {
	var user model.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"data":    err,
		})
	}

	userPtr, err := services.AuthService{}.SignUp(&user)
	if err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status":  "error",
				"message": "Username or email already exists",
				"data":    err,
			})
		}
		log.Println("Error occurred in server:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Error occurred in server",
			"data":    err,
		})
	}

	newUser := response.AuthResponse{
		Email:    userPtr.Email,
		Username: userPtr.Username,
		UID:      userPtr.ID,
	}

	log.Println("User " + newUser.Username + " signed up successfully.")
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":  "success",
		"message": "User signed up successfully",
		"data":    newUser,
	})
}

// Login godoc
// @Summary      Log a user into the application
// @Description  Authenticates the user
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        LoginRequest   body      model.LoginRequest  true  "Login Credentials"
// @Success      200  {object}   model.AuthResponse
// @Failure      400  {object}  nil
// @Failure      401  {object}  nil
// @Failure      404  {object}  nil
// @Failure      500  {object}  nil
// @Router       /auth [post]
func Login(c *fiber.Ctx) error {
	var input request.LoginRequest
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"data":    err,
		})
	}

	username := input.Username
	user, err := services.UserService{}.GetUserByUsername(username)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status":  "error",
				"message": "User not found",
				"data":    err,
			})
		}
		log.Println("Error occurred in server:", err)
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "Error occurred in server",
			"data":    err,
		})
	}

	password := input.Password
	if !util.CheckPasswordHash(password, user.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid password",
			"data":    "Password does not match the user's password",
		})
	}

	token, err := services.AuthService{}.CreateToken(user)
	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't create token",
			"data":    err,
		})
	}

	response := response.AuthResponse{
		Username: user.Username,
		Email:    user.Email,
		UID:      user.ID,
	}
	log.Println("User " + response.Username + " logged in successfully.")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Login successfully",
		"data":    response,
		"token":   token,
	})
}
