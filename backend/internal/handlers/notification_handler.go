package handlers

import (
	"encoding/json"
	"net/http"
	"social-network/backend/internal/middleware"
	"social-network/backend/internal/services"
)

type NotificationHandler struct {
	notificationService *services.NotificationService
}

func NewNotificationHandler(notificationService *services.NotificationService) *NotificationHandler {
	return &NotificationHandler{notificationService: notificationService}
}

func (h *NotificationHandler) GetNotifications(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	userID := middleware.GetUserID(r)
	if userID == "" {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	notifications, err := h.notificationService.GetNotifications(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(notifications)
}

func (h *NotificationHandler) MarkAsRead(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	userID := middleware.GetUserID(r)
	if userID == "" {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	notificationID := r.PathValue("notification_id")
	if notificationID == "" {
		http.Error(w, "notification_id is required", http.StatusBadRequest)
		return
	}
	if err := h.notificationService.MarkAsRead(notificationID, userID); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "notification marked as read"})
}