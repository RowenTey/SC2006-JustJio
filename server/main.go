package main

import (
	"log"
	"math/rand"
	"strconv"
	"time"

	"sc2006-JustJio/config"
	"sc2006-JustJio/middleware"
	"sc2006-JustJio/model"
	"sc2006-JustJio/router"
	"sc2006-JustJio/services"
	"sc2006-JustJio/util"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/gorm"

	_ "sc2006-JustJio/docs"
)

func seedDB(db *gorm.DB) error {
	var count int64
	db.Model(&model.User{}).Count(&count)
	if count > 0 {
		log.Println("Database already seeded")
		return nil
	}

	users := []model.User{
		{Username: "harish", Password: "Harish12345!", Email: "harish123@test.com"},
		{Username: "amabel", Password: "Amabel12345!", Email: "amabel123@test.com"},
		{Username: "zhiheng", Password: "Zh12345!", Email: "zh123@test.com"},
		{Username: "eldrick", Password: "Eldrick123!", Email: "eldrick123@test.com"},
		{Username: "kaiseong", Password: "Ks12345!", Email: "ks123@test.com"},
		{Username: "aloysius", Password: "Aloysius12345!", Email: "aloysius123@test.com"},
	}
	for i, u := range users {
		hashedPassword, err := util.HashPassword(u.Password)
		if err != nil {
			return err
		}
		u.Password = hashedPassword

		createdUser, err := services.UserService{}.CreateUser(&u)
		if err != nil {
			return err
		}
		users[i] = *createdUser
		log.Println("User created: ", users[i])
	}

	rooms := []model.Room{
		{Name: "ks birthday", Date: time.Date(2022, time.September, 4, 0, 0, 0, 0, time.UTC), Time: "5:00pm", Venue: "ntu hall 9"},
		{Name: "harish birthday", Date: time.Date(2022, time.October, 4, 0, 0, 0, 0, time.UTC), Time: "6:00pm", Venue: "clementi mall"},
		{Name: "amabel birthday", Date: time.Date(2022, time.November, 4, 0, 0, 0, 0, time.UTC), Time: "9:00am", Venue: "marina bay sand"},
	}
	for i, r := range rooms {
		host := users[rand.Intn(len(users))]
		log.Println("User selected as host: ", host)
		createdRoom, err := services.RoomService{}.CreateRoom(&r, strconv.Itoa(int(host.ID)))
		if err != nil {
			return err
		}
		rooms[i] = *createdRoom
		log.Println("Room created: ", rooms[i])

		// Invite users to room
		var inviteesId = []string{}

		for _, u := range users {
			if u.ID == host.ID {
				continue
			}
			inviteesId = append(inviteesId, strconv.Itoa(int(u.ID)))
		}

		invites, err := services.RoomService{}.InviteUserToRoom(strconv.Itoa(int(rooms[i].ID)), strconv.Itoa(int(host.ID)), inviteesId, "Join my party!")
		if err != nil {
			return err
		}

		log.Println("Invites created: ", invites)
	}

	return nil
}

// @title           JustJio API
// @version         1.0
// @description     This is a server for NTU SC2006's project - JustJio.
// @termsOfService  http://swagger.io/terms/
// @contact.name   Kai Seong
// @contact.email  kaiseong02@gmail.com
// @license.name  MIT
// @license.url  https://opensource.org/licenses/MIT
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

	// go worker.RunCronJobs()

	// database.ConnectDB()
	// seedDB(database.DB)

	middleware.Fiber(app)
	router.Initalize(app)
	log.Fatal(app.Listen(":" + config.Config("PORT")))
}
