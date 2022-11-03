package handlers

import (
	"io"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetRooms(t *testing.T) {
	tests := []struct {
		description   string
		route         string
		method        string
		body          io.Reader
		stringToken   string
		expectedError bool
		expectedCode  int
	}{
		{
			description:   "Fetch rooms for authenticated user",
			route:         "https://justjio-server-o44bmvzlsa-as.a.run.app/rooms",
			method:        "GET",
			body:          nil,
			stringToken:   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc2NTk0NDgsInVzZXJfZW1haWwiOiJrczEyM0B0ZXN0LmNvbSIsInVzZXJfaWQiOjUsInVzZXJuYW1lIjoia3MxMjMifQ.wIO4ErYQm_2zmeUgwe3YxvV0X2mHJ3-xCFTXrKMs0rs",
			expectedError: false,
			expectedCode:  200,
		},
		{
			description:   "Fetch rooms for unauthenticated user - missing token",
			route:         "https://justjio-server-o44bmvzlsa-as.a.run.app/rooms",
			method:        "GET",
			body:          nil,
			stringToken:   "",
			expectedError: true,
			expectedCode:  400,
		},
		{
			description:   "Fetch rooms for unauthenticated user - expired token",
			route:         "https://justjio-server-o44bmvzlsa-as.a.run.app/rooms",
			method:        "GET",
			body:          nil,
			stringToken:   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjcwMTcwMzIsInVzZXJfZW1haWwiOiJhbWFiZWwxMjNAdGVzdC5jb20iLCJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFtYWJlbDEyMyJ9.hrx4oHGYEIUffouXhg98euDwuhKvwS3YhSZ2jw9R5ck",
			expectedError: true,
			expectedCode:  401,
		},
	}

	// Iterate through test single test cases
	for _, test := range tests {
		// Create a new http request with the route from the test case
		req, _ := http.NewRequest(test.method, test.route, test.body)
		req.Header.Add("content-type", "multipart/form-data; boundary=---011000010111000001101001")
		req.Header.Set("Authorization", test.stringToken)
		res, _ := http.DefaultClient.Do(req)

		// Verify, if the status code is as expected.
		assert.Equalf(t, test.expectedCode, res.StatusCode, test.description)

		defer res.Body.Close()
	}
}

func TestGetRoomAttendees(t *testing.T) {
	tests := []struct {
		description   string
		route         string
		method        string
		body          io.Reader
		stringToken   string
		expectedError bool
		expectedCode  int
	}{
		{
			description:   "Fetch attendees for a room",
			route:         "https://justjio-server-o44bmvzlsa-as.a.run.app/rooms/attendees/2",
			method:        "GET",
			body:          nil,
			stringToken:   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc2NTk0NDgsInVzZXJfZW1haWwiOiJrczEyM0B0ZXN0LmNvbSIsInVzZXJfaWQiOjUsInVzZXJuYW1lIjoia3MxMjMifQ.wIO4ErYQm_2zmeUgwe3YxvV0X2mHJ3-xCFTXrKMs0rs",
			expectedError: false,
			expectedCode:  200,
		},
	}

	// Iterate through test single test cases
	for _, test := range tests {
		// Create a new http request with the route from the test case
		req, _ := http.NewRequest(test.method, test.route, test.body)
		req.Header.Add("content-type", "multipart/form-data; boundary=---011000010111000001101001")
		req.Header.Set("Authorization", test.stringToken)
		res, _ := http.DefaultClient.Do(req)

		// Verify, if the status code is as expected.
		assert.Equalf(t, test.expectedCode, res.StatusCode, test.description)

		defer res.Body.Close()
	}
}
