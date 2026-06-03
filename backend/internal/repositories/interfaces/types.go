package interfaces

import "social-network/backend/internal/models"

type UserRepository interface {
    CreateUser(user *models.User) error
    GetUserByEmail(email string) (*models.User, error)
    GetUserByID(id string) (*models.User, error)
}

type SessionRepository interface {
    CreateSession(session *models.Session) error
    GetSessionByID(id string) (*models.Session, error)
    DeleteSession(id string) error
}
