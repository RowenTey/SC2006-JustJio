package database

import (
	"fmt"
	"log"

	"sc2006-JustJio/config"
	"sc2006-JustJio/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ConnectDB() {
	// define error here to prevent overshadowing the global DB
	var err error

	dsn := config.Config("DSN")
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		fmt.Println("Failed to connect to database")
		log.Fatal(err)
	}
	fmt.Println("Connection opened to Database")

	err = DB.AutoMigrate(&model.User{}, &model.Room{}, &model.RoomUser{})
	if err != nil {
		fmt.Println("Migration failed")
		fmt.Println(err.Error())
	} else {
		fmt.Println("Database migrated")
	}

	seedDB(DB)
	fmt.Println("Database seeded")
}

func seedDB(db *gorm.DB) {
	users := []model.User{
		{Username: "test123", Password: "test123", Email: "test@test.com"},
		{Username: "test1234", Password: "test1234", Email: "test4@test.com"},
		{Username: "test1235", Password: "test1235", Email: "test5@test.com"},
	}
	for _, u := range users {
		db.Create(&u)
	}

	rooms := []model.Room{
		{Name: "ks birthday", Time: "5pm", Venue: "ntu hall 9", Host: "test123"},
		{Name: "ww birthday", Time: "10pm", Venue: "ss2", Host: "test123"},
		{Name: "steven birthday", Time: "9am", Venue: "elmina", Host: "test123"},
	}
	for _, r := range rooms {
		db.Create(&r)
	}

	userDB := db.Table("users")
	var test123 model.User
	userDB.First(&test123, "Username = ?", "test123")

	roomDB := db.Table("rooms")
	var allRooms []model.Room
	roomDB.Find(&allRooms, "Host = ?", "test123")

	room_users := []model.RoomUser{
		{UserID: test123.ID, RoomID: allRooms[0].ID, IsHost: true},
		{UserID: test123.ID, RoomID: allRooms[1].ID, IsHost: true},
		{UserID: test123.ID, RoomID: allRooms[2].ID, IsHost: true},
	}

	for _, r_u := range room_users {
		db.Create(&r_u)
	}

	roomUserDB := db.Table("room_users")
	var test_rooms []string
	roomUserDB.Distinct("room_id").Find(&test_rooms, "user_id = ?", test123.ID)
	for _, t := range test_rooms {
		fmt.Println(" RoomID: ", t)
	}
}
