package middleware

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/websocket/v2"
)

func Fiber(a *fiber.App) {
	a.Use(
		// CORS setting
		cors.New(cors.Config{
			AllowOrigins: "*",
			AllowHeaders: "Origin, Content-Type, Accept",
		}),

		// Rate limiting
		limiter.New(limiter.Config{
			Next: func(c *fiber.Ctx) bool {
				return c.IP() == "127.0.0.1" // Don't limit from localhost
			},
			Max:        20,
			Expiration: 30 * time.Second,
			LimitReached: func(c *fiber.Ctx) error {
				return c.Status(fiber.StatusTooManyRequests).SendString("Rate Limit Exceeded! Please wait 30s before making a request again...")
			},
		}),

		// Logging
		logger.New(logger.Config{
			Format: "[${ip}:${port}] ${status} - ${method} ${path}\n",
		}),

		// Accept application/json
		func(c *fiber.Ctx) error {
			c.Accepts("application/json")
			return c.Next()
		},
	)

	// Websocket upgrade
	a.Use("/ws", func(c *fiber.Ctx) error {
		// IsWebSocketUpgrade returns true if the client
		// requested upgrade to the WebSocket protocol.
		if websocket.IsWebSocketUpgrade(c) {
			log.Println("Upgrading to WebSocket")
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})
}
