package services

import (
	"errors"
	"sync"
	"time"
	
	"github.com/google/uuid"
	"social-network/backend/internal/models"
)

type MessageService struct {
	mu       sync.RWMutex
	messages map[string]*models.ChatMessage
	chatSvc  *ChatService
}

func NewMessageService(chatSvc *ChatService) *MessageService {
	return &MessageService{
		messages: make(map[string]*models.ChatMessage),
		chatSvc:  chatSvc,
	}
}

func (s *MessageService) SendMessage(chatID, senderID, content, msgType string) (*models.ChatMessage, error) {
	// Verify chat exists and user is a participant
	chat, err := s.chatSvc.GetChat(chatID)
	if err != nil {
		return nil, err
	}
	
	isParticipant := false
	for _, p := range chat.Participants {
		if p == senderID {
			isParticipant = true
			break
		}
	}
	if !isParticipant {
		return nil, errors.New("user is not a participant in this chat")
	}
	
	s.mu.Lock()
	defer s.mu.Unlock()
	
	msg := &models.ChatMessage{
		ID:        uuid.New().String(),
		ChatID:    chatID,
		SenderID:  senderID,
		Content:   content,
		Type:      msgType,
		CreatedAt: time.Now(),
		IsRead:    false,
	}
	
	s.messages[msg.ID] = msg
	return msg, nil
}

func (s *MessageService) GetChatMessages(chatID string, limit, offset int) ([]*models.ChatMessage, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	
	var chatMessages []*models.ChatMessage
	for _, msg := range s.messages {
		if msg.ChatID == chatID {
			chatMessages = append(chatMessages, msg)
		}
	}
	
	// Simple pagination (in production, use proper sorting/pagination)
	if limit > 0 && offset >= 0 {
		start := offset
		end := offset + limit
		if start < len(chatMessages) {
			if end > len(chatMessages) {
				end = len(chatMessages)
			}
			return chatMessages[start:end], nil
		}
		return []*models.ChatMessage{}, nil
	}
	
	return chatMessages, nil
}

func (s *MessageService) MarkMessageAsRead(messageID, userID string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	
	msg, exists := s.messages[messageID]
	if !exists {
		return errors.New("message not found")
	}
	
	msg.IsRead = true
	return nil
}

func (s *MessageService) GetMessage(messageID string) (*models.ChatMessage, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	
	msg, exists := s.messages[messageID]
	if !exists {
		return nil, errors.New("message not found")
	}
	return msg, nil
}