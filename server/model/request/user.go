package request

type UpdateUserRequest struct {
	Field string `json:"field"`
	Value string `json:"value"`
}
