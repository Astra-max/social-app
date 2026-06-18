package services

import (
	"time"

	"social-network/backend/internal/models"
	"social-network/backend/internal/repositories/interfaces"

	"github.com/google/uuid"
)

type SessionService struct {
	repo interfaces.SessionRepository
}

func NewSessionService(repo interfaces.SessionRepository) *SessionService {
	return &SessionService{repo: repo}
}

func (s *SessionService) CreateSession(userID string) (*models.Session, error) {
	session := &models.Session{
		ID:        uuid.New().String(),
		UserID:    userID,
		ExpiresAt: time.Now().Add(24 * time.Hour),
	}

	err := s.repo.CreateSession(session)
	return session, err
}

func (s *SessionService) GetSession(id string) (*models.Session, error) {
	return s.repo.GetSessionByID(id)
}

func (s *SessionService) DeleteSession(id string) error {
	return s.repo.DeleteSession(id)
}