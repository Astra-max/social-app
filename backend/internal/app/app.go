package app

import (
	"log"
	"net/http"

	"social-network/backend/internal/handlers"
	repoSqlite "social-network/backend/internal/repositories/sqlite"
	"social-network/backend/internal/routes"
	"social-network/backend/internal/services"
	dbSqlite "social-network/backend/pkg/db/sqlite"
)

// App holds the shared dependencies of the application
type App struct {
	Router *http.ServeMux
}

func New() (*App, error) {
	// 1. connect to DB + run migrations
	db := dbSqlite.NewDB()

	// 2. repos
	userRepo    := repoSqlite.NewUserRepository(db)
	sessionRepo := repoSqlite.NewSessionRepository(db)

	// 3. services
	userService    := services.NewUserService(userRepo)
	sessionService := services.NewSessionService(sessionRepo)

	// 4. handlers
	authHandler := handlers.NewAuthHandler(userService, sessionService)

	// 5. routes
	mux := http.NewServeMux()
	routes.Register(mux, authHandler)

	log.Println("app initialised")
	return &App{Router: mux}, nil
}