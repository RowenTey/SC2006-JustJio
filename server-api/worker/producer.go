package worker

import (
	"fmt"
	"log"
	"sc2006-JustJio/services"
	"time"

	"github.com/go-co-op/gocron"
)

func ProduceMessages() {
	kafkaService, err := services.NewKafkaService("localhost:9092")
	if err != nil {
		log.Fatal(err)
	}

	s := gocron.NewScheduler(time.UTC)

	s.Every(10).Seconds().Do(func() {
		message := fmt.Sprintf("Hi, %v! It's %v", "Tey", time.Now().String())
		fmt.Println(message)
		kafkaService.PublishMessage("user-5", message)
	})

	s.StartBlocking()
}
