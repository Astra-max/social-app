package handlers

import (
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
