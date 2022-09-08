package database

import (
	"fmt"
	"log"

	"sc2006-JustJio/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ConnectDB() {
	// define error here to prevent overshadowing the global DB
	var err error

	dsn := config.Config("DATABASE_URL")
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("Failed to connect database")
		log.Fatal(err)
	}
	fmt.Println("Connection opened to Database")

	// err = DB.AutoMigrate(&model.User{})
	// if err != nil {
	// 	fmt.Println("Migration failed")
	// 	log.Fatal(err)
	// }
	// fmt.Println("Database Migrated")
}
