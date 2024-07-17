package chat_service

// import (
// 	"log"
// 	"sc2006-JustJio/services"

// 	"github.com/gofiber/websocket/v2"
// )

// type ChatClient struct {
// 	IP     string
// 	Conn   *websocket.Conn
// 	Send   chan []byte
// 	UserId string
// 	RoomId string
// }

// type ChatRoom struct {
// 	RoomId    string
// 	Clients   map[*ChatClient]bool
// 	Broadcast chan []byte
// }

// type ChatHub struct {
// 	Rooms      map[string]*ChatRoom
// 	Register   chan *ChatClient
// 	Unregister chan *ChatClient
// }

// func NewHub() *ChatHub {
// 	return &ChatHub{
// 		Rooms:      make(map[string]*ChatRoom),
// 		Register:   make(chan *ChatClient),
// 		Unregister: make(chan *ChatClient),
// 	}
// }

// func (h *ChatHub) Run() {
// 	for {
// 		select {
// 		case client := <-h.Register:
// 			if _, ok := h.Rooms[client.RoomId]; !ok {
// 				h.Rooms[client.RoomId] = &ChatRoom{
// 					RoomId:    client.RoomId,
// 					Clients:   make(map[*ChatClient]bool),
// 					Broadcast: make(chan []byte),
// 				}
// 				go h.Rooms[client.RoomId].broadcastMessages()
// 			}

// 			log.Println("Client connected to room:", client.RoomId)
// 			services.UserService{}.MarkOnline(client.UserId)
// 			h.Rooms[client.RoomId].Clients[client] = true
// 			h.Rooms[client.RoomId].Broadcast <- []byte(client.IP + " has connected")
// 		case client := <-h.Unregister:
// 			if _, ok := h.Rooms[client.RoomId]; ok {
// 				services.UserService{}.MarkOffline(client.UserId)

// 				// Remove client from room
// 				if _, ok := h.Rooms[client.RoomId].Clients[client]; ok {
// 					delete(h.Rooms[client.RoomId].Clients, client)
// 					close(client.Send)
// 				}

// 				// Close room if no clients are left
// 				if len(h.Rooms[client.RoomId].Clients) == 0 {
// 					delete(h.Rooms, client.RoomId)
// 				}
// 			}
// 		}
// 	}
// }

// func (c *ChatClient) ReadPump(h *ChatHub) {
// 	defer func() {
// 		h.Unregister <- c
// 		c.Conn.Close()

// 		// Notify other clients in the room that this client has disconnected
// 		disconnectMessage := []byte(c.IP + ": Disconnected")
// 		h.Rooms[c.RoomId].Broadcast <- disconnectMessage
// 	}()

// 	log.Println("Reading messages for client:", c.IP)

// 	for {
// 		_, message, err := c.Conn.ReadMessage()
// 		if err != nil {
// 			if websocket.IsCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
// 				log.Println("Client disconnected:", c.IP)
// 			}
// 			break
// 		}
// 		ChatService{}.SaveChat(c.RoomId, c.UserId, string(message))
// 		h.Rooms[c.RoomId].Broadcast <- []byte(c.IP + ": " + string(message))
// 	}

// 	log.Println("Connection", c.Conn)
// }

// func (c *ChatClient) WritePump(_ *ChatHub) {
// 	defer func() {
// 		c.Conn.Close()
// 	}()

// 	for message := range c.Send {
// 		if err := c.Conn.WriteMessage(websocket.TextMessage, message); err != nil {
// 			log.Println("Error writing message: ", err.Error())
// 			break
// 		}
// 	}
// }

// func (r *ChatRoom) broadcastMessages() {
// 	for {
// 		// Read a message from the broadcast channel
// 		message, ok := <-r.Broadcast
// 		if !ok {
// 			break
// 		}

// 		log.Printf("[Room %s] %s\n", r.RoomId, message)

// 		// Send the message to all clients in the room
// 		for client := range r.Clients {
// 			client.Send <- message
// 		}
// 	}
// }
