package routes

import (
	"net/http"
	"social-network/backend/internal/handlers"
	"social-network/backend/internal/middleware"
	"social-network/backend/internal/services"
)

func Register(mux *http.ServeMux, authHandler *handlers.AuthHandler, followerHandler *handlers.FollowerHandler, sessionService *services.SessionService) {
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

	// Private Profile Routes
	mux.Handle("/api/auth/me", authWithSession(http.HandlerFunc(authHandler.Me)))
	mux.Handle("/api/profile/{id}", authWithSession(http.HandlerFunc(authHandler.GetProfile)))
	mux.Handle("/api/profile", authWithSession(http.HandlerFunc(authHandler.UpdateProfile)))
	mux.Handle("/api/profile/privacy", authWithSession(http.HandlerFunc(authHandler.UpdatePrivacy)))
	mux.Handle("/api/profile/avatar", authWithSession(http.HandlerFunc(authHandler.UploadAvatar)))

	// Private Follower Routes
	mux.Handle("/api/follow/requests", authWithSession(http.HandlerFunc(followerHandler.SendFollowRequest)))
	mux.Handle("/api/follow/requests/{request_id}/accept", authWithSession(http.HandlerFunc(followerHandler.AcceptFollowRequest)))
	mux.Handle("/api/follow/requests/{request_id}/decline", authWithSession(http.HandlerFunc(followerHandler.DeclineFollowRequest)))
	mux.Handle("/api/follow/{user_id}", authWithSession(http.HandlerFunc(followerHandler.Unfollow)))
	mux.Handle("/api/followers", authWithSession(http.HandlerFunc(followerHandler.GetFollowers)))
	mux.Handle("/api/following", authWithSession(http.HandlerFunc(followerHandler.GetFollowing)))
}
