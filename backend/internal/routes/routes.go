package routes

import (
	"net/http"
	"social-network/backend/internal/handlers"
	"social-network/backend/internal/middleware"
	"social-network/backend/internal/services"
)

func Register(
	mux *http.ServeMux,
	authHandler *handlers.AuthHandler,
	followerHandler *handlers.FollowerHandler,
	postHandler *handlers.PostHandler,
	notificationHandler *handlers.NotificationHandler,
	sessionService *services.SessionService,
) {
	auth := middleware.NewAuthMiddleware(sessionService)

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
	mux.Handle("/api/auth/me", auth.Authenticate(http.HandlerFunc(authHandler.Me)))
	mux.Handle("/api/profile/{id}", auth.Authenticate(http.HandlerFunc(authHandler.GetProfile)))
	mux.Handle("/api/profile", auth.Authenticate(http.HandlerFunc(authHandler.UpdateProfile)))
	mux.Handle("/api/profile/privacy", auth.Authenticate(http.HandlerFunc(authHandler.UpdatePrivacy)))
	mux.Handle("/api/profile/avatar", auth.Authenticate(http.HandlerFunc(authHandler.UploadAvatar)))

	// Private Follower Routes
	mux.Handle("/api/follow/requests", auth.Authenticate(http.HandlerFunc(followerHandler.SendFollowRequest)))
	mux.Handle("/api/follow/requests/{request_id}/accept", auth.Authenticate(http.HandlerFunc(followerHandler.AcceptFollowRequest)))
	mux.Handle("/api/follow/requests/{request_id}/decline", auth.Authenticate(http.HandlerFunc(followerHandler.DeclineFollowRequest)))
	mux.Handle("/api/follow/{user_id}", auth.Authenticate(http.HandlerFunc(followerHandler.Unfollow)))
	mux.Handle("/api/followers", auth.Authenticate(http.HandlerFunc(followerHandler.GetFollowers)))
	mux.Handle("/api/following", auth.Authenticate(http.HandlerFunc(followerHandler.GetFollowing)))

	// Private Post Routes
	mux.Handle("/api/posts", auth.Authenticate(http.HandlerFunc(postHandler.CreatePost)))
	mux.Handle("/api/posts/feed", auth.Authenticate(http.HandlerFunc(postHandler.GetFeed)))
	mux.Handle("/api/posts/{post_id}", auth.Authenticate(http.HandlerFunc(postHandler.GetPostByID)))
	mux.Handle("/api/posts/{post_id}/update", auth.Authenticate(http.HandlerFunc(postHandler.UpdatePost)))
	mux.Handle("/api/posts/{post_id}/delete", auth.Authenticate(http.HandlerFunc(postHandler.DeletePost)))
	mux.Handle("/api/users/{user_id}/posts", auth.Authenticate(http.HandlerFunc(postHandler.GetPostsByUserID)))
	mux.Handle("/api/posts/{post_id}/comments", auth.Authenticate(http.HandlerFunc(postHandler.CreateComment)))
	mux.Handle("/api/posts/{post_id}/comments/all", auth.Authenticate(http.HandlerFunc(postHandler.GetCommentsByPostID)))

	// Private Notification Routes
	mux.Handle("/api/notifications", auth.Authenticate(http.HandlerFunc(notificationHandler.GetNotifications)))
	mux.Handle("/api/notifications/{notification_id}/read", auth.Authenticate(http.HandlerFunc(notificationHandler.MarkAsRead)))
}