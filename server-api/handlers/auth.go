package handlers

import (
	"errors"
	"fmt"
	"log"
	"net/smtp"

	"sc2006-JustJio/config"
	"sc2006-JustJio/database"
	"sc2006-JustJio/model"
	"sc2006-JustJio/model/request"
	"sc2006-JustJio/model/response"
	"sc2006-JustJio/services"
	"sc2006-JustJio/util"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// Global variable to access the ClientOTP map
// Store OTP with email as key
var ClientOTP = make(map[string]string)

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
		return util.HandleInvalidInputError(c, err)
	}

	authService := &services.AuthService{
		HashFunc:  util.HashPassword,
		LoginAuth: util.NewLoginAuth,
		SendMail:  smtp.SendMail,
	}
	userService := &services.UserService{DB: database.DB}

	hashedPasswordUser, err := authService.SignUp(&user)
	if err != nil {
		return util.HandleInternalServerError(c, err)
	}

	createdUser, err := userService.CreateOrUpdateUser(hashedPasswordUser, true)
	if err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return util.HandleError(
				c, fiber.StatusConflict, "Username or email already exists", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	if err := authService.SendOTPEmail(&ClientOTP, user.Email); err != nil {
		log.Println("Error sending OTP email:", err)
		delete(ClientOTP, user.Email)
	}

	response := response.AuthResponse{
		Email:    createdUser.Email,
		Username: createdUser.Username,
		UID:      createdUser.ID,
	}

	log.Println("User " + response.Username + " signed up successfully.")
	return util.HandleSuccess(c, "User signed up successfully", response)
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
		return util.HandleInvalidInputError(c, err)
	}

	username := input.Username
	user, err := (&services.UserService{DB: database.DB}).GetUserByUsername(username)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.HandleError(c, fiber.StatusNotFound, "User not found", err)
		}
		return util.HandleInternalServerError(c, err)
	}

	if !util.CheckPasswordHash(input.Password, user.Password) {
		return util.HandleError(c, fiber.StatusUnauthorized, "Invalid password", errors.New("Password does not match the user's password"))
	}

	authService := &services.AuthService{JwtSecret: config.Config("JWT_SECRET")}
	token, err := authService.CreateToken(user)
	if err != nil {
		return util.HandleInternalServerError(c, err)
	}

	// create user channel when login
	go func() {
		channel := fmt.Sprintf("user-%d", user.ID)
		kafkaService, err := services.NewKafkaService("kafka:29092")
		if err != nil {
			log.Fatal(err)
		}
		defer kafkaService.Close()
		if err := kafkaService.CreateTopic(channel); err != nil {
			log.Println("Error creating topic", err)
		}
	}()

	response := response.AuthResponse{
		Username: user.Username,
		Email:    user.Email,
		UID:      user.ID,
	}
	log.Println("User " + response.Username + " logged in successfully.")
	return util.HandleLoginSuccess(c, "Login successfully", token, response)
}

func VerifyOTP(c *fiber.Ctx) error {
	var request request.VerifyOTPRequest
	if err := c.BodyParser(&request); err != nil {
		return util.HandleInvalidInputError(c, err)
	}

	authService := &services.AuthService{}
	userService := &services.UserService{DB: database.DB}

	user, err := userService.GetUserByEmail(request.Email)
	if err != nil {
		return util.HandleError(c, fiber.StatusNotFound, "Invalid email address", err)
	}

	user.IsEmailValid = true
	_, err = userService.CreateOrUpdateUser(user, false)
	if err != nil {
		return util.HandleInternalServerError(c, err)
	}

	err = authService.VerifyOTP(&ClientOTP, request.Email, request.OTP)
	if err != nil {
		return util.HandleError(c, fiber.StatusBadRequest, "Invalid OTP", err)
	}

	log.Println("OTP verified successfully for email", request.Email)
	return util.HandleSuccess(c, "OTP verified successfully", nil)
}
