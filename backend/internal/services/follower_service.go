package services

import (
	"errors"
	"social-network/backend/internal/models"
	"social-network/backend/internal/repositories/interfaces"
	"time"

	"github.com/google/uuid"
)

type FollowerService struct {
	followerRepo     interfaces.FollowerRepository
	userRepo         interfaces.UserRepository
	notificationRepo interfaces.NotificationRepository
}

func NewFollowerService(
	followerRepo interfaces.FollowerRepository,
	userRepo interfaces.UserRepository,
	notificationRepo interfaces.NotificationRepository,
) *FollowerService {
	return &FollowerService{
		followerRepo:     followerRepo,
		userRepo:         userRepo,
		notificationRepo: notificationRepo,
	}
}

func (s *FollowerService) SendFollowRequest(senderID, receiverID string) error {
	// Rule 1 — does the receiver exist?
	_, err := s.userRepo.GetUserByID(receiverID)
	if err != nil {
		return errors.New("receiver not found")
	}

	// Rule 2 — is sender trying to follow themselves?
	if senderID == receiverID {
		return errors.New("cannot follow yourself")
	}

	// Rule 3 — is there already a pending request?
	existing, _ := s.followerRepo.GetFollowRequest(senderID, receiverID)
	if existing != nil && existing.Status == models.StatusPending {
		return errors.New("follow request already sent")
	}

	// Rule 4 — is sender already following receiver?
	already, err := s.followerRepo.IsFollowing(senderID, receiverID)
	if err != nil {
		return errors.New("could not check follow status")
	}
	if already {
		return errors.New("already following this user")
	}

	// All rules passed — create the follow request
	req := &models.FollowRequest{
		ID:         uuid.New().String(),
		SenderID:   senderID,
		ReceiverID: receiverID,
		Status:     models.StatusPending,
		CreatedAt:  time.Now(),
	}
	if err := s.followerRepo.CreateFollowRequest(req); err != nil {
		return errors.New("could not send follow request")
	}

	// Create notification for receiver
	notification := &models.Notification{
		ID:          uuid.New().String(),
		UserID:      receiverID,
		ActorID:     senderID,
		Type:        "follow_request",
		ReferenceID: req.ID,
		IsRead:      false,
		CreatedAt:   time.Now(),
	}
	if err := s.notificationRepo.CreateNotification(notification); err != nil {
		return errors.New("could not create notification")
	}

	return nil
}
