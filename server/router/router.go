package router

import (
	"sc2006-JustJio/handlers"
	"sc2006-JustJio/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
)

func Initalize(router *fiber.App) {

	router.Use(middleware.Json)
	router.Use(middleware.Security)
	router.Use(logger.New())

	router.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("Hello, World!")
	})

	router.Get("/swagger/*", swagger.HandlerDefault)

	auth := router.Group("/auth")
	auth.Post("/signup", handlers.SignUp)
	auth.Post("/", handlers.Login)

	users := router.Group("/users")
	users.Get("/:id", handlers.GetUser)
	users.Delete("/:id", middleware.Authenticated(), handlers.DeleteUser)
	users.Patch("/:id", middleware.Authenticated(), handlers.UpdateUser)

	rooms := router.Group("/rooms")
	rooms.Get("/", middleware.Authenticated(), handlers.GetRooms)
	rooms.Get("/invites", middleware.Authenticated(), handlers.GetRoomInvitations)
	rooms.Get("/attendees/:id", middleware.Authenticated(), handlers.GetRoomAttendees)
	rooms.Post("/", middleware.Authenticated(), handlers.CreateRoom)
	rooms.Patch("/join/:id", middleware.Authenticated(), handlers.JoinRoom)
	rooms.Delete("/:id", middleware.Authenticated(), handlers.CloseRoom)
	rooms.Delete("/decline/:id", middleware.Authenticated(), handlers.DeclineRoom)

	bills := router.Group("/bills")
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
