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

	err = DB.AutoMigrate(&model.User{}, &model.Room{})
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
		{Name: "ww birthday", Time: "10pm", Venue: "ss2", Host: "test1233"},
		{Name: "steven birthday", Time: "9am", Venue: "elmina", Host: "test1235"},
	}
	for _, r := range rooms {
		db.Create(&r)
	}
}
