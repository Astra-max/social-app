package services

import (
	"errors"
	"social-network/backend/internal/models"
	"social-network/backend/internal/repositories/interfaces"
	"social-network/backend/internal/utils"

	"github.com/google/uuid"
)

type UserService struct {
	repo interfaces.UserRepository
}

func NewUserService(repo interfaces.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) Register(req *models.RegisterRequest) (*models.User, error) {
	// check if email already exists
	existing, _ := s.repo.GetUserByEmail(req.Email)
	if existing != nil {
		return nil, errors.New("email already registered")
	}

	hashed, err := utils.HashPassword(req.Password)
	if err != nil {
		return nil, errors.New("failed to hash password")
	}

	user := &models.User{
		ID:          uuid.New().String(),
		Email:       req.Email,
		Password:    hashed,
		FirstName:   req.FirstName,
		LastName:    req.LastName,
		DateOfBirth: req.DateOfBirth,
		Avatar:      req.Avatar,
		NickName:    req.Nickname,
		AboutMe:     req.AboutMe,
		IsPublic:    true,
	}

	if err := s.repo.CreateUser(user); err != nil {
		return nil, errors.New("failed to create user")
	}

	return user, nil
}

func (s *UserService) Login(req *models.LoginRequest) (*models.User, error) {
	user, err := s.repo.GetUserByEmail(req.Email)
	if err != nil {
		// don't reveal whether email exists or password is wrong
		return nil, errors.New("invalid email or password")
	}

	if !utils.CheckPassword(user.Password, req.Password) {
		return nil, errors.New("invalid email or password")
	}

	return user, nil
}