package main

import (
	"log"
	"os"

	"sc2006-JustJio/database"
	"sc2006-JustJio/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	_ "sc2006-JustJio/docs"

	"github.com/joho/godotenv"
)

func getenv(key, fallback string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return fallback
	}
	return value
}

// @title           JustJio API
// @version         1.0
// @description     This is a server for NTU SC2006's project - JustJio.
// @termsOfService  http://swagger.io/terms/
// @contact.name   Kai Seong
// @contact.email  kaiseong02@gmail.com
// @license.name  MIT
// @host      localhost:8080
// @BasePath  /
// @securityDefinitions.basic  BasicAuth
// @securityDefinitions.apikey  ApiKeyAuth
// @in                          header
// @name                        Authorization
// @description									authorise authenticated users
func main() {
	godotenv.Load()
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // comma string format e.g. "localhost, nikschaefer.tech"
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	database.ConnectDB()
	router.Initalize(app)
	log.Fatal(app.Listen(":" + getenv("PORT", "8080")))
}
