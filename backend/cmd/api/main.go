package main

import (
	"log"
	"social-network/backend/pkg/db/sqlite"
)

func main() {
	_ = sqlite.NewDB()
	log.Println("Server started & DB initialized")
}