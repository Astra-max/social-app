package routes

import (
	"net/http"
	"social-network/backend/internal/handlers"
)

func Register(mux *http.ServeMux, authHandler *handlers.AuthHandler) {
	// health check
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	// auth — public, no middleware needed
	mux.HandleFunc("/api/auth/register", authHandler.Register)
	mux.HandleFunc("/api/auth/login", authHandler.Login)
	mux.HandleFunc("/api/auth/logout", authHandler.Logout)

}