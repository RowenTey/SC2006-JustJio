package handlers

import (
	"testing"

	"github.com/gofiber/fiber/v2"
)

func TestGenerateTransactions(t *testing.T) {
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
			if err := GenerateTransactions(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("GenerateTransactions() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestGetTransactions(t *testing.T) {
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
			if err := GetTransactions(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("GetTransactions() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestPayBill(t *testing.T) {
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
			if err := PayBill(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("PayBill() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
