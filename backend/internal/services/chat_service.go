package services

import (
	"errors"
	"sync"
	"time"
	
	"github.com/google/uuid"
	"social-network/backend/internal/models"
)

type ChatService struct {
	mu    sync.RWMutex
	chats map[string]*models.Chat
}

func NewChatService() *ChatService {
	return &ChatService{
		chats: make(map[string]*models.Chat),
	}
}

func (s *ChatService) CreateDirectChat(user1ID, user2ID string) (*models.Chat, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	
	// Check if direct chat already exists
	for _, chat := range s.chats {
		if chat.Type == "direct" {
			hasUser1 := false
			hasUser2 := false
			for _, p := range chat.Participants {
				if p == user1ID {
					hasUser1 = true
				}
				if p == user2ID {
					hasUser2 = true
				}
			}
			if hasUser1 && hasUser2 && len(chat.Participants) == 2 {
				return chat, nil
			}
		}
	}
	
	chat := &models.Chat{
		ID:           uuid.New().String(),
		Type:         "direct",
		CreatedBy:    user1ID,
		CreatedAt:    time.Now(),
		Participants: []string{user1ID, user2ID},
		IsActive:     true,
	}
	
	s.chats[chat.ID] = chat
	return chat, nil
}

func (s *ChatService) CreateGroupChat(name, creatorID string, participantIDs []string) (*models.Chat, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	
	// Ensure creator is in participants
	participants := []string{creatorID}
	for _, p := range participantIDs {
		if p != creatorID {
			participants = append(participants, p)
		}
	}
	
	chat := &models.Chat{
		ID:           uuid.New().String(),
		Name:         name,
		Type:         "group",
		CreatedBy:    creatorID,
		CreatedAt:    time.Now(),
		Participants: participants,
		IsActive:     true,
	}
	
	s.chats[chat.ID] = chat
	return chat, nil
}

func (s *ChatService) GetChat(chatID string) (*models.Chat, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	
	chat, exists := s.chats[chatID]
	if !exists {
		return nil, errors.New("chat not found")
	}
	return chat, nil
}

func (s *ChatService) GetUserChats(userID string) ([]*models.Chat, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	
	var userChats []*models.Chat
	for _, chat := range s.chats {
		for _, participant := range chat.Participants {
			if participant == userID {
				userChats = append(userChats, chat)
				break
			}
		}
	}
	return userChats, nil
}

func (s *ChatService) AddParticipant(chatID, userID string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	
	chat, exists := s.chats[chatID]
	if !exists {
		return errors.New("chat not found")
	}
	
	if chat.Type != "group" {
		return errors.New("only group chats can have participants added")
	}
	
	// Check if already participant
	for _, p := range chat.Participants {
		if p == userID {
			return nil
		}
	}
	
	chat.Participants = append(chat.Participants, userID)
	return nil
}

func (s *ChatService) RemoveParticipant(chatID, userID string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	
	chat, exists := s.chats[chatID]
	if !exists {
		return errors.New("chat not found")
	}
	
	if chat.Type != "group" {
		return errors.New("only group chats can have participants removed")
	}
	
	var participants []string
	for _, p := range chat.Participants {
		if p != userID {
			participants = append(participants, p)
		}
	}
	chat.Participants = participants
	return nil
}