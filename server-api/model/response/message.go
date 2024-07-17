package response

import "sc2006-JustJio/model"

type GetMessagesResponse struct {
	Messages  []model.Message `json:"messages"`
	Page      int             `json:"page"`
	PageCount int             `json:"page_count"`
}
