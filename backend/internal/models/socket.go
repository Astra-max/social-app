package models

import (
	"time"
)

// WebSocketMessage represents the base message structure
type WebSocketMessage struct {
	Type      string      `json:"type"`
	Data      interface{} `json:"data"`
	Timestamp time.Time   `json:"timestamp"`
}

// ChatMessage represents a chat message
type ChatMessage struct {
	ID        string    `json:"id"`
	ChatID    string    `json:"chat_id"`
	SenderID  string    `json:"sender_id"`
	Content   string    `json:"content"`
	Type      string    `json:"type"` // text, image, file
	CreatedAt time.Time `json:"created_at"`
	IsRead    bool      `json:"is_read"`
}

// Chat represents a chat room
type Chat struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Type         string    `json:"type"` // direct, group
	CreatedBy    string    `json:"created_by"`
	CreatedAt    time.Time `json:"created_at"`
	Participants []string  `json:"participants"`
	IsActive     bool      `json:"is_active"`
}

// DirectChatRequest for creating direct chat
type DirectChatRequest struct {
	UserID string `json:"user_id"`
}

// GroupChatRequest for creating group chat
type GroupChatRequest struct {
	Name         string   `json:"name"`
	Participants []string `json:"participants"`
}

// TypingIndicator represents typing status
type TypingIndicator struct {
	ChatID   string `json:"chat_id"`
	UserID   string `json:"user_id"`
	IsTyping bool   `json:"is_typing"`
}

// ErrorResponse for WebSocket errors
type ErrorResponse struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}