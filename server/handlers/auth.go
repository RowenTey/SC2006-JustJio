package handlers

import (
	"errors"
	"fmt"
	"time"

	"sc2006-JustJio/config"
	"sc2006-JustJio/database"
	"sc2006-JustJio/model"
	"sc2006-JustJio/util"

	"gorm.io/gorm"

	"github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

func getUserByEmail(email string) (*model.User, error) {
	db := database.DB.Table("users")
	var user model.User
	if err := db.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
	}
	return &user, nil
}

func getUserByUsername(username string) (*model.User, error) {
	db := database.DB.Table("users")
	var user model.User
	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
	}
	return &user, nil
}

// SignUp -> new user
func SignUp(c *fiber.Ctx) error {
	type NewUser struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		UID      uint   `json:"id"`
	}

	db := database.DB.Table("users")
	user := new(model.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	hash, err := util.HashPassword(user.Password)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't hash password", "data": err})
	}
	user.Password = hash

	var mysqlErr *mysql.MySQLError
	if err := db.Create(&user).Error; err != nil {
		if errors.As(err, &mysqlErr) && mysqlErr.Number == 1062 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "User already exists", "data": err})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couldn't create user", "data": err})
	}

	newUser := NewUser{
		Email:    user.Email,
		Username: user.Username,
		UID:      user.ID,
	}

	fmt.Println("User " + newUser.Username + " signed up successfully.")
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "message": "Created user", "data": newUser})
}

// Login get user and password
func Login(c *fiber.Ctx) error {
	type LoginInput struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	type UserData struct {
		UID      uint   `json:"uid"`
		Username string `json:"username"`
		Email    string `json:"email"`
	}

	var input LoginInput
	var userData UserData

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Error on login request", "data": err})
	}

	username := input.Username
	pass := input.Password

	user, err := getUserByUsername(username)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "User not found", "data": err})
	}

	userData = UserData{
		UID:      user.ID,
		Username: user.Username,
		Email:    user.Email,
	}

	if !util.CheckPasswordHash(pass, user.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Invalid password", "data": nil})
	}

	token := jwt.New(jwt.SigningMethodHS256)

	/*
		Create JWT token
		expires in 3 days
	*/
	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = userData.Username
	claims["user_id"] = userData.UID
	claims["user_email"] = userData.Email
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err := token.SignedString([]byte(config.Config("JWT_SECRET")))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Failed to create token", "data": nil})
	}

	fmt.Println("User " + userData.Username + " logged in successfully.")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Login successfully", "data": userData, "token": t})
}
