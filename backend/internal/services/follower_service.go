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
func (s *FollowerService) AcceptFollowRequest(requestID, receiverID string) error {
	// Rule 1 — fetch the request, does it exist?
	req, err := s.followerRepo.GetFollowRequestByID(requestID)
	if err != nil {
		return errors.New("follow request not found")
	}

	// Rule 2 — is the status still pending?
	if req.Status != models.StatusPending {
		return errors.New("follow request is no longer pending")
	}

	// Rule 3 — is the person accepting it the actual receiver?
	if req.ReceiverID != receiverID {
		return errors.New("unauthorized to accept this request")
	}

	// Action 1 — update status to accepted
	if err := s.followerRepo.UpdateFollowRequest(requestID, models.StatusAccepted); err != nil {
		return errors.New("could not update follow request status")
	}

	// Action 2 — create follower relationship
	if err := s.followerRepo.CreateFollower(req.SenderID, req.ReceiverID); err != nil {
		return errors.New("could not create follower relationship")
	}

	// Action 3 — create notification for sender
	notification := &models.Notification{
		ID:          uuid.New().String(),
		UserID:      req.SenderID,
		ActorID:     receiverID,
		Type:        "follow_accepted",
		ReferenceID: req.ID,
		IsRead:      false,
		CreatedAt:   time.Now(),
	}
	if err := s.notificationRepo.CreateNotification(notification); err != nil {
		return errors.New("could not create notification")
	}

	return nil
}
func (s *FollowerService) DeclineFollowRequest(requestID, receiverID string) error {
	// Rule 1 — fetch the request, does it exist?
	req, err := s.followerRepo.GetFollowRequestByID(requestID)
	if err != nil {
		return errors.New("follow request not found")
	}

	// Rule 2 — is the status still pending?
	if req.Status != models.StatusPending {
		return errors.New("follow request is no longer pending")
	}

	// Rule 3 — is the person declining it the actual receiver?
	if req.ReceiverID != receiverID {
		return errors.New("unauthorized to accept this request")
	}

	// Action 1 — update status to declined
	if err := s.followerRepo.UpdateFollowRequest(requestID, models.StatusDeclined); err != nil {
		return errors.New("could not update follow request status")
	}

	// Action 2— create notification for sender
	notification := &models.Notification{
		ID:          uuid.New().String(),
		UserID:      req.SenderID,
		ActorID:     receiverID,
		Type:        "follow_declined",
		ReferenceID: req.ID,
		IsRead:      false,
		CreatedAt:   time.Now(),
	}
	if err := s.notificationRepo.CreateNotification(notification); err != nil {
		return errors.New("could not create notification")
	}

	return nil
}

func (s *FollowerService) Unfollow(followerID, followingID string) error {
	// Rule 1 — is the sender actually following the receiver?
	already, err := s.followerRepo.IsFollowing(followerID, followingID)
	if err != nil {
		return errors.New("could not check follow status")
	}
	if !already {
		return errors.New("you are not following this user")
	}

	// Action 1 — delete the follower relationship
	if err := s.followerRepo.DeleteFollower(followerID, followingID); err != nil {
		return errors.New("could not unfollow user")
	}

	return nil
}
func (s *FollowerService) GetFollowers(userID string) ([]*models.Follower, error) {
	followers, err := s.followerRepo.GetFollowers(userID)
	if err != nil {
		return nil, errors.New("could not get followers")
	}
	return followers, nil
}
func (s *FollowerService) GetFollowing(userID string) ([]*models.Follower, error) {
	following, err := s.followerRepo.GetFollowing(userID)
	if err != nil {
		return nil, errors.New("could not get following")
	}
	return following, nil
}
