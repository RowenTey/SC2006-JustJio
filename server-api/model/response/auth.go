package response

type AuthResponse struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	UID      uint   `json:"id"`
}
