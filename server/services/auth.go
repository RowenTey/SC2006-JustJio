package services

import (
	"sc2006-JustJio/config"
	"sc2006-JustJio/model"
	"sc2006-JustJio/util"
	"time"

	"github.com/golang-jwt/jwt"
)

type AuthService struct{}

const TOKEN_EXPIRY = time.Hour * 72 // 3 days

func (s AuthService) SignUp(newUser *model.User) (*model.User, error) {
	var err error

	newUser.Password, err = util.HashPassword(newUser.Password)
	if err != nil {
		return nil, err
	}

	return UserService{}.CreateUser(newUser)
}

func (s AuthService) CreateToken(user *model.User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = user.Username
	claims["user_id"] = user.ID
	claims["user_email"] = user.Email
	claims["exp"] = time.Now().Add(TOKEN_EXPIRY).Unix()

	t, err := token.SignedString([]byte(config.Config("JWT_SECRET")))
	if err != nil {
		return "", err
	}
	return t, nil
}
