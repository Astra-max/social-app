package app

import (
	"log"
	"net/http"
	"os"
	"social-network/backend/internal/handlers"
	repoSqlite "social-network/backend/internal/repositories/sqlite"
	"social-network/backend/internal/routes"
	"social-network/backend/internal/services"
	"social-network/backend/internal/middleware"
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
	followerRepo := repoSqlite.NewFollowerRepository(db)
	notificationRepo := repoSqlite.NewNotificationRepository(db)
	postRepo := repoSqlite.NewPostRepository(db)

	// 3. services
	userService := services.NewUserService(userRepo, followerRepo)
	sessionService := services.NewSessionService(sessionRepo)
	followerService := services.NewFollowerService(followerRepo, userRepo, notificationRepo)
	postService := services.NewPostService(postRepo, followerRepo, notificationRepo, userRepo)
	notificationService := services.NewNotificationService(notificationRepo)
	// 4. handlers
	authHandler := handlers.NewAuthHandler(userService, sessionService)
	followerHandler := handlers.NewFollowerHandler(followerService)
	postHandler := handlers.NewPostHandler(postService)
	notificationHandler := handlers.NewNotificationHandler(notificationService)

	// 5. routes
	mux := http.NewServeMux()
	
	routes.Register(mux, authHandler, followerHandler, postHandler, notificationHandler, sessionService)
	log.Println("app initialised")

	return &App{Router: mux}, nil
}


func (a *App) ChainMiddlewares() http.Handler {
	nextMiddleware := middleware.ChainMiddlewares(
		a.Router,
		middleware.CORSMiddleware,
	)
	return nextMiddleware
}