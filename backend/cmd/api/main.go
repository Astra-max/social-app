package main

import (
	"log"
	"net/http"
	"social-network/backend/internal/app"
)

func main() {
	application, err := app.New()
	if err != nil {
		log.Fatal("failed to start app: ", err)
	}

	log.Println("server listening on :8080")
	if err := http.ListenAndServe(":8080", application.Router); err != nil {
		log.Fatal(err)
	}
}