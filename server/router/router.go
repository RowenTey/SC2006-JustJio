package router

import (
	"sc2006-JustJio/handlers"
	"sc2006-JustJio/middleware"

	"github.com/gofiber/fiber/v2"
)

func Initalize(router *fiber.App) {

	// router.Use(middleware.Security)

	router.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("Hello, World!")
	})

	router.Use(middleware.Json)

	users := router.Group("/users")
	users.Post("/", handlers.SignUp)
	users.Post("/login", handlers.Login)
	users.Get("/:id", handlers.GetUser)
	users.Delete("/:id", middleware.Authenticated(), handlers.DeleteUser)
	users.Patch("/:id", middleware.Authenticated(), handlers.UpdateUser)

	router.Use(func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{
			"code":    404,
			"message": "404: Not Found",
		})
	})

}
