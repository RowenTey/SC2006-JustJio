package router

import (
	"sc2006-JustJio/handlers"
	"sc2006-JustJio/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
	"github.com/gofiber/websocket/v2"
)

func Initalize(router *fiber.App) {
	router.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("Hello, World!")
	})

	v1 := router.Group("/v1")
	v1.Get("/swagger/*", swagger.HandlerDefault)

	auth := v1.Group("/auth")
	auth.Post("/", handlers.Login)
	auth.Post("/signup", handlers.SignUp)

	users := v1.Group("/users")
	users.Get("/:id", handlers.GetUser)
	users.Delete("/:id", middleware.Authenticated(), handlers.DeleteUser)
	users.Patch("/:id", middleware.Authenticated(), handlers.UpdateUser)

	rooms := v1.Group("/rooms")
	rooms.Get("/", middleware.Authenticated(), handlers.GetRooms)
	rooms.Get("/invites", middleware.Authenticated(), handlers.GetRoomInvitations)
	rooms.Get("/attendees/:id", middleware.Authenticated(), handlers.GetRoomAttendees)
	rooms.Post("/", middleware.Authenticated(), handlers.CreateRoom)
	rooms.Post("/:id", middleware.Authenticated(), handlers.InviteUser)
	rooms.Patch("/:id", middleware.Authenticated(), handlers.RespondToRoomInvite)
	rooms.Patch("/close/:id", middleware.Authenticated(), handlers.CloseRoom)
	rooms.Patch("/leave/:id", middleware.Authenticated(), handlers.LeaveRoom)

	handlers.InitChatHub()
	// router.Get("/ws/:roomId", middleware.Authenticated(), websocket.New(handlers.RegisterChatWS))
	router.Get("/ws/:roomId", websocket.New(handlers.RegisterChatWS))

	bills := v1.Group("/bills")
	bills.Get("/", middleware.Authenticated(), handlers.GetTransactions)
	bills.Post("/:id", middleware.Authenticated(), handlers.GenerateTransactions)
	bills.Patch("/pay", middleware.Authenticated(), handlers.PayBill)

	router.Use(func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{
			"code":    404,
			"message": "404: Not Found",
		})
	})
}
