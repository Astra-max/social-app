package repositories

import "social-network/backend/pkg/models"

type SessionRepository interface {
	Create(session *models.Session) error
	GetByID(id string) (*models.Session, error)
	Delete(id string) error
}
