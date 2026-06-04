package routes

import (
	"net/http"
	"social-network/backend/internal/handlers"
	"social-network/backend/internal/services" 
	"social-network/backend/internal/middleware"
)

func Register(mux *http.ServeMux, authHandler *handlers.AuthHandler, sessionService *services.SessionService) {
	authWithSession := middleware.AuthMiddleware(sessionService)

	// Health check
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	// Public Auth Routes
	mux.HandleFunc("/api/auth/register", authHandler.Register)
	mux.HandleFunc("/api/auth/login", authHandler.Login)
	mux.HandleFunc("/api/auth/logout", authHandler.Logout)

	// Private Routes
	mux.Handle("/api/auth/me", authWithSession(http.HandlerFunc(authHandler.Me)))
	mux.Handle("/api/profile/{id}", authWithSession(http.HandlerFunc(authHandler.GetProfile)))
	mux.Handle("/api/profile", authWithSession(http.HandlerFunc(authHandler.UpdateProfile)))
	mux.Handle("/api/profile/privacy", authWithSession(http.HandlerFunc(authHandler.UpdatePrivacy)))
	mux.Handle("/api/profile/avatar", authWithSession(http.HandlerFunc(authHandler.UploadAvatar)))
}
