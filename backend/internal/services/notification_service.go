package services

import (
	"errors"
	"social-network/backend/internal/models"
	"social-network/backend/internal/repositories/interfaces"
)

type NotificationService struct {
	notificationRepo interfaces.NotificationRepository
}

func NewNotificationService(notificationRepo interfaces.NotificationRepository) *NotificationService {
	return &NotificationService{notificationRepo: notificationRepo}
}

func (s *NotificationService) GetNotifications(userID string) ([]*models.Notification, error) {
	notifications, err := s.notificationRepo.GetNotificationsByUserID(userID)
	if err != nil {
		return nil, errors.New("could not get notifications")
	}
	return notifications, nil
}

func (s *NotificationService) MarkAsRead(notificationID, userID string) error {
	if notificationID == "" {
		return errors.New("notification_id is required")
	}
	if err := s.notificationRepo.MarkNotificationAsRead(notificationID, userID); err != nil {
		return errors.New("could not mark notification as read")
	}
	return nil
}