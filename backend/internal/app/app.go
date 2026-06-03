package app

import (
	"log"
	"net/http"
	"os" // Added to handle avatar directory creation

	"social-network/backend/internal/handlers"
	repoSqlite "social-network/backend/internal/repositories/sqlite"
	"social-network/backend/internal/routes"
	"social-network/backend/internal/services"
	dbSqlite "social-network/backend/pkg/db/sqlite"
)

type App struct {
	Router *http.ServeMux
}

func New() (*App, error) {
	// 1. connect to DB + run migrations
	db := dbSqlite.NewDB()

	// Ensure upload directory exists for avatars before server starts
	if err := os.MkdirAll("uploads/avatars", 0755); err != nil {
		return nil, err
	}

	// 2. repos
	userRepo := repoSqlite.NewUserRepository(db)
	sessionRepo := repoSqlite.NewSessionRepository(db)

	// 3. services
	userService := services.NewUserService(userRepo)
	sessionService := services.NewSessionService(sessionRepo)

	// 4. handlers
	authHandler := handlers.NewAuthHandler(userService, sessionService)

	// 5. routes
	mux := http.NewServeMux()

	// Pass sessionService as the third parameter here
	routes.Register(mux, authHandler, sessionService)

	log.Println("app initialised")
	return &App{Router: mux}, nil
}
