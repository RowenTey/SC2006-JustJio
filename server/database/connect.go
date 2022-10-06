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

	err = DB.AutoMigrate(&model.User{}, &model.Room{}, &model.RoomUser{})
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
		{Username: "harish123", Password: "harish123", Email: "harish123@test.com"},
		{Username: "amabel123", Password: "amabel123", Email: "amabel123@test.com"},
		{Username: "zh123", Password: "zh123", Email: "zh123@test.com"},
		{Username: "eldrick123", Password: "eldrick123", Email: "eldrick123@test.com"},
		{Username: "ks123", Password: "ks123", Email: "ks123@test.com"},
		{Username: "aloysius123", Password: "aloysius123", Email: "aloysius123@test.com"},
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
		{Name: "ks birthday", Time: "5:00pm-10:00pm", Venue: "ntu hall 9", Host: "ks123"},
		{Name: "harish birthday", Time: "6:00pm-10:00pm", Venue: "clementi mall", Host: "harish123"},
		{Name: "amabel birthday", Time: "9:00am-11:00am", Venue: "marina bay sand", Host: "amabel123"},
	}
	for _, r := range rooms {
		db.Create(&r)
	}

	userDB := db.Table("users")
	var harish123 model.User
	userDB.First(&harish123, "Username = ?", "harish123")

	roomDB := db.Table("rooms")
	var allRooms []model.Room
	roomDB.Find(&allRooms, "Host = ?", "ks123")

	room_users := []model.RoomUser{
		{User: harish123.Username, RoomID: allRooms[0].ID, IsAttendee: true, Accepted: true},
		{User: harish123.Username, RoomID: allRooms[0].ID, IsAttendee: true, Accepted: true},
		{User: harish123.Username, RoomID: allRooms[0].ID, IsAttendee: true, Accepted: true},
	}

	for _, r_u := range room_users {
		db.Create(&r_u)
	}

	roomUserDB := db.Table("room_users")
	var test_rooms []string
	roomUserDB.Distinct("room_id").Find(&test_rooms, "user = ?", harish123.Username)
	for _, t := range test_rooms {
		fmt.Println(" RoomID: ", t)
	}

	return nil
}
