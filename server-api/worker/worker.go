package worker

import (
	"fmt"
	"time"

	"github.com/go-co-op/gocron"
)

func RunCronJobs() {
	s := gocron.NewScheduler(time.UTC)

	s.Every(5).Seconds().Do(func() {
		message := fmt.Sprintf("Hi, %v", "Tey")
		fmt.Println(message)
	})

	s.StartBlocking()
}
