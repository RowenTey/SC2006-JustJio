package handlers

import (
	chat_services "sc2006-JustJio/services/chat"

	"github.com/gofiber/websocket/v2"
)

// Create a new hub for chat handler
var ChatHub *chat_services.Hub

func InitChatHub() {
	ChatHub = chat_services.NewHub()
	go ChatHub.Run()
}

// Higher order function that returns a function that handles websocket connections
func RegisterChatWS(c *websocket.Conn) {
	roomId := c.Params("roomId")
	client := &chat_services.ChatClient{
		IP:     c.RemoteAddr().String(),
		Conn:   c,
		Send:   make(chan []byte, 256),
		RoomId: roomId,
	}
	ChatHub.Register <- client

	go client.WritePump(ChatHub)
	client.ReadPump(ChatHub)
}
