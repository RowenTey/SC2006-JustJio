package services

import (
	"errors"
	"time"

	"sc2006-JustJio/database"
	"sc2006-JustJio/model"
)

type UserService struct{}

func (s UserService) GetUserByID(userId string) (*model.User, error) {
	db := database.DB.Table("users")
	var user model.User

	if err := db.Find(&user, userId).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (s UserService) GetUserByUsername(username string) (*model.User, error) {
	db := database.DB.Table("users")
	var user model.User

	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (s UserService) GetUserByEmail(email string) (*model.User, error) {
	db := database.DB.Table("users")
	var user model.User

	if err := db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (s UserService) UpdateUserField(userid string, field string, value interface{}) error {
	db := database.DB.Table("users")
	var user model.User

	if err := db.First(&user, userid).Error; err != nil {
		return err
	}

	switch field {
	case "name":
		user.Name = value.(string)
	case "phoneNum":
		user.PhoneNum = value.(string)
	default:
		return errors.New("User field " + field + " not supported for update")
	}
	user.UpdatedAt = time.Now()

	if err := db.Save(&user).Error; err != nil {
		return err
	}

	return nil
}

func (s UserService) CreateUser(user *model.User) (*model.User, error) {
	db := database.DB.Table("users")
	user.RegisteredAt = time.Now()
	if err := db.Create(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (s UserService) DeleteUser(userId string) error {
	db := database.DB.Table("users")
	var user model.User

	if err := db.First(&user, userId).Error; err != nil {
		return err
	}

	if err := db.Delete(&user).Error; err != nil {
		return err
	}

	return nil
}

func (s UserService) ValidateUsers(userIds []string) error {
	db := database.DB.Table("users")
	var user model.User

	for _, userId := range userIds {
		if err := db.First(&user, userId).Error; err != nil {
			return err
		}
	}

	return nil
}
