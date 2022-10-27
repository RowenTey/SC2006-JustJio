package handlers

import (
	"testing"

	"github.com/gofiber/fiber/v2"
)

func TestGetRooms(t *testing.T) {
	type args struct {
		c *fiber.Ctx
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := GetRooms(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("GetRooms() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestGetRoomInvitations(t *testing.T) {
	type args struct {
		c *fiber.Ctx
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := GetRoomInvitations(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("GetRoomInvitations() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestGetRoomAttendees(t *testing.T) {
	type args struct {
		c *fiber.Ctx
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := GetRoomAttendees(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("GetRoomAttendees() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestCreateRoom(t *testing.T) {
	type args struct {
		c *fiber.Ctx
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := CreateRoom(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("CreateRoom() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestCloseRoom(t *testing.T) {
	type args struct {
		c *fiber.Ctx
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := CloseRoom(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("CloseRoom() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestJoinRoom(t *testing.T) {
	type args struct {
		c *fiber.Ctx
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := JoinRoom(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("JoinRoom() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestDeclineRoom(t *testing.T) {
	type args struct {
		c *fiber.Ctx
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := DeclineRoom(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("DeclineRoom() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
