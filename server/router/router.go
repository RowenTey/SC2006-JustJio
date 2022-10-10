package router

import (
	"sc2006-JustJio/handlers"
	"sc2006-JustJio/middleware"

	"github.com/gofiber/fiber/v2"
)

func Initalize(router *fiber.App) {

	// router.Use(middleware.Security)

	router.Use(middleware.Json)

	router.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("Hello, World!")
	})

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
	rooms.Post("/", middleware.Authenticated(), handlers.CreateRoom)
	rooms.Patch("/join/:id", middleware.Authenticated(), handlers.JoinRoom)

	bills := router.Group("/bills")
	bills.Post("/:id", middleware.Authenticated(), handlers.GenerateTransactions)

	router.Use(func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{
			"code":    404,
			"message": "404: Not Found",
		})
	})

}
