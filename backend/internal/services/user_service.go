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
		NickName:    req.NickName,
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

func (s *UserService) GetProfile(viewerID, profileID string) (*models.User, error) {
	user, err := s.repo.GetUserByID(profileID)
	if err != nil {
		return nil, errors.New("user not found")
	}

	// own profile — always visible
	if viewerID == profileID {
		return user, nil
	}

	// public profile — visible to everyone
	if user.IsPublic {
		return user, nil
	}

	// private profile — only visible to followers
	// we pass this check to the handler layer using a sentinel error
	// so the handler knows to check followers table
	return user, errors.New("private")
}

func (s *UserService) UpdateProfile(userID string, req *models.UpdateProfileRequest) (*models.User, error) {
	user, err := s.repo.GetUserByID(userID)
	if err != nil {
		return nil, errors.New("user not found")
	}

	// only update fields that were sent
	if req.FirstName != "" {
		user.FirstName = req.FirstName
	}
	if req.LastName != "" {
		user.LastName = req.LastName
	}
	if req.DateOfBirth != "" {
		user.DateOfBirth = req.DateOfBirth
	}
	if req.Nickname != "" {
		user.NickName = req.Nickname
	}
	if req.AboutMe != "" {
		user.AboutMe = req.AboutMe
	}

	if err := s.repo.UpdateUser(user); err != nil {
		return nil, errors.New("failed to update profile")
	}

	return user, nil
}

func (s *UserService) UpdatePrivacy(userID string, isPublic bool) error {
	return s.repo.UpdatePrivacy(userID, isPublic)
}

func (s *UserService) UpdateAvatar(userID, avatarPath string) error {
	return s.repo.UpdateAvatar(userID, avatarPath)
}
