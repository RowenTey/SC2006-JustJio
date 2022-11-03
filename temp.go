package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func main() {

	url := "https://justjio-server-o44bmvzlsa-as.a.run.app/rooms"

	payload := strings.NewReader(`
	"room": {
    "name": "test for yes error 21",
    "time": "3:00pm",
    "venue": "ntu tama",
    "date": "29/12/2022"
  },
  "invitees": [
    "fred",
    "zh123"
  ]
	`)

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc3MDE1OTcsInVzZXJfZW1haWwiOiJrczEyM0B0ZXN0LmNvbSIsInVzZXJfaWQiOjUsInVzZXJuYW1lIjoia3MxMjMifQ.2BHdBvabLa3lMX8yL2RDyzoKzvNJkOfVaTkW--c91S4")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))
}
