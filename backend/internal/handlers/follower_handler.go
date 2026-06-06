package handlers

import (
	"encoding/json"
	"net/http"
	"social-network/backend/internal/middleware"
	"social-network/backend/internal/services"
)

type FollowerHandler struct {
	followerService *services.FollowerService
}

func NewFollowerHandler(followerService *services.FollowerService) *FollowerHandler {
	return &FollowerHandler{
		followerService: followerService,
	}
}
func (h *FollowerHandler) SendFollowRequest(w http.ResponseWriter, r *http.Request) {

	//step 1 only allow POST

	if r.Method != http.MethodPost {

		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// step 2 - get logged in user ID from session

	senderID := middleware.GetUserID(r)

	if senderID == "" {

		http.Error(w, "unauthorized", http.StatusUnauthorized)

		return
	}

	//step 3 - Decode request body

	var req struct {
		ReceiverID string `json:"receiver_id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}
	if req.ReceiverID == "" {
		http.Error(w, "receiver_id is required", http.StatusBadRequest)
		return
	}

	// Step 4 — call the service
	if err := h.followerService.SendFollowRequest(senderID, req.ReceiverID); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Step 5 — send success response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "follow request sent",
	})
}

func (h *FollowerHandler) AcceptFollowRequest(w http.ResponseWriter, r *http.Request) {

	//step 1 Check method is POST
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return

	}
	//step 2. Get logged in user ID from session

	receiverID := middleware.GetUserID(r)

	if receiverID == "" {

		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	//step 3 get request_id from URL

	requestID := r.PathValue("request_id")

	if requestID == "" {

		http.Error(w, "request_id is required", http.StatusBadRequest)
		return
	}

	//step 4 Call the service
	if err := h.followerService.AcceptFollowRequest(requestID, receiverID); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Step 5 — send success response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "follow request accepted",
	})

}

func (h *FollowerHandler) DeclineFollowRequest(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {

		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	receiverID := middleware.GetUserID(r)

	if receiverID == "" {

		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	//step 3 get request_id from URL

	requestID := r.PathValue("request_id")

	if requestID == "" {

		http.Error(w, "request_id is required", http.StatusBadRequest)
		return
	}

	//step 4 Call the service
	if err := h.followerService.DeclineFollowRequest(requestID, receiverID); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Step 5 — send success response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "follow request declined",
	})

}
