package database

import (
	"fmt"
	"log"

	"sc2006-JustJio/config"
	"sc2006-JustJio/model"
	"sc2006-JustJio/util"

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

	err = DB.AutoMigrate(&model.User{}, &model.Room{}, &model.RoomUser{}, &model.Bill{}, &model.Transaction{})
	if err != nil {
		fmt.Println("Migration failed")
		fmt.Println(err.Error())
	} else {
		fmt.Println("Database migrated")
	}

	var userCount int64
	if DB.Table("users").Count(&userCount); userCount == 0 {
		fmt.Println("User count", userCount)
		err = seedDB(DB)
		if err != nil {
			fmt.Println("Failed to seed database")
		} else {
			fmt.Println("Database seeded")
		}
	}
}

func seedDB(db *gorm.DB) error {
	users := []model.User{
		{Username: "harish", Password: "Harish12345!", Email: "harish123@test.com"},
		{Username: "amabel", Password: "Amabel12345!", Email: "amabel123@test.com"},
		{Username: "zhiheng", Password: "Zh12345!", Email: "zh123@test.com"},
		{Username: "eldrick", Password: "Eldrick123!", Email: "eldrick123@test.com"},
		{Username: "kaiseong", Password: "Ks12345!", Email: "ks123@test.com"},
		{Username: "aloysius", Password: "Aloysius12345!", Email: "aloysius123@test.com"},
	}
	for _, u := range users {
		hash, err := util.HashPassword(u.Password)
		if err != nil {
			return err
		}
		u.Password = hash
		db.Create(&u)
	}

	rooms := []model.Room{
		{Name: "ks birthday", Date: "04/09/2022", Time: "5:00pm", Venue: "ntu hall 9", Host: "kaiseong"},
		{Name: "harish birthday", Date: "04/10/2022", Time: "6:00pm", Venue: "clementi mall", Host: "harish"},
		{Name: "amabel birthday", Date: "04/11/2022", Time: "9:00am", Venue: "marina bay sand", Host: "amabel"},
	}
	for _, r := range rooms {
		db.Create(&r)
		fmt.Println(" room: ", r)
	}

	userDB := db.Table("users")
	var allUsers []model.User
	userDB.Not("Username = ?", "kaiseong").Find(&allUsers)

	for _, u := range allUsers {
		fmt.Println(" user: ", u)
	}

	roomDB := db.Table("rooms")
	var allRooms []model.Room
	roomDB.Find(&allRooms, "Host = ?", "kaiseong")

	room_users := []model.RoomUser{
		{User: allUsers[0].Username, RoomID: allRooms[0].ID, IsAttendee: true, Accepted: false},
		{User: allUsers[1].Username, RoomID: allRooms[0].ID, IsAttendee: true, Accepted: false},
		{User: allUsers[2].Username, RoomID: allRooms[0].ID, IsAttendee: true, Accepted: false},
		{User: "kaiseong", RoomID: 1, IsHost: true, Accepted: true},
		{User: "harish", RoomID: 2, IsHost: true, Accepted: true},
		{User: "amabel", RoomID: 3, IsHost: true, Accepted: true},
	}

	for _, r_u := range room_users {
		db.Create(&r_u)
	}

	roomUserDB := db.Table("room_users")
	var test_rooms []string
	roomUserDB.Distinct("room_id").Find(&test_rooms, "user = ?", allUsers[0].Username)
	for _, t := range test_rooms {
		fmt.Println(" RoomID: ", t)
	}

	return nil
}
