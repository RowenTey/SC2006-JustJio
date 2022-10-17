package util

import (
	"fmt"

	"github.com/golang-jwt/jwt/v4"
)

// get user info from auth token
func GetUser(t *jwt.Token, field string) string {
	claims := t.Claims.(jwt.MapClaims)
	if field == "user_id" {
		return fmt.Sprint(claims["user_id"].(float64))
	}
	return claims[field].(string)
}
