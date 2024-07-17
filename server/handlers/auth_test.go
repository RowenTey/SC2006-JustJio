package handlers

import (
	"io"
	"net/http"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLogin(t *testing.T) {
	tests := []struct {
		description   string
		route         string // input route
		method        string // input method
		body          io.Reader
		expectedError bool
		expectedCode  int
	}{
		{
			description:   "Login successfully",
			route:         "https://justjio-server-o44bmvzlsa-as.a.run.app/auth",
			method:        "POST",
			body:          strings.NewReader("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"username\"\r\n\r\nks123\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"password\"\r\n\r\nks123\r\n-----011000010111000001101001--\r\n"),
			expectedError: false,
			expectedCode:  200,
		},
		{
			description:   "Invalid user",
			route:         "https://justjio-server-o44bmvzlsa-as.a.run.app/auth",
			method:        "POST",
			body:          strings.NewReader("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"username\"\r\n\r\njoe\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"password\"\r\n\r\nks123\r\n-----011000010111000001101001--\r\n"),
			expectedError: true,
			expectedCode:  401,
		},
		{
			description:   "Invalid password",
			route:         "https://justjio-server-o44bmvzlsa-as.a.run.app/auth",
			method:        "POST",
			body:          strings.NewReader("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"username\"\r\n\r\nks123\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"password\"\r\n\r\ntest\r\n-----011000010111000001101001--\r\n"),
			expectedError: true,
			expectedCode:  401,
		},
	}

	// Iterate through test single test cases
	for _, test := range tests {
		// Create a new http request with the route from the test case
		req, _ := http.NewRequest(test.method, test.route, test.body)
		req.Header.Add("content-type", "multipart/form-data; boundary=---011000010111000001101001")
		res, _ := http.DefaultClient.Do(req)

		// Verify, if the status code is as expected.
		assert.Equalf(t, test.expectedCode, res.StatusCode, test.description)

		defer res.Body.Close()
	}
}

func TestSignUp(t *testing.T) {
	tests := []struct {
		description   string
		route         string // input route
		method        string // input method
		body          io.Reader
		expectedError bool
		expectedCode  int
	}{
		{
			description:   "Username already in use",
			route:         "https://justjio-server-o44bmvzlsa-as.a.run.app/auth/signup",
			method:        "POST",
			body:          strings.NewReader("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"email\"\r\n\r\njospeh@gmail.com\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"username\"\r\n\r\nks123\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"password\"\r\n\r\nbrad123\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"phoneNum\"\r\n\r\n99947033\r\n-----011000010111000001101001--\r\n"),
			expectedError: true,
			expectedCode:  400,
		},
		{
			description:   "Email already in use",
			route:         "https://justjio-server-o44bmvzlsa-as.a.run.app/auth/signup",
			method:        "POST",
			body:          strings.NewReader("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"email\"\r\n\r\nks123@test.com\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"username\"\r\n\r\nbond\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"password\"\r\n\r\nbrad123\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"phoneNum\"\r\n\r\n99947033\r\n-----011000010111000001101001--\r\n"),
			expectedError: true,
			expectedCode:  400,
		},
	}

	// Iterate through test single test cases
	for _, test := range tests {
		// Create a new http request with the route from the test case
		req, _ := http.NewRequest(test.method, test.route, test.body)
		req.Header.Add("content-type", "multipart/form-data; boundary=---011000010111000001101001")
		res, _ := http.DefaultClient.Do(req)

		// Verify, if the status code is as expected.
		assert.Equalf(t, test.expectedCode, res.StatusCode, test.description)

		defer res.Body.Close()
	}
}
