package ws

import (
	"encoding/json"
	"time"
	
	"social-network/backend/internal/models"
)

func (h *Hub) HandleMessage(client *Client, msg map[string]interface{}) {
	msgType, ok := msg["type"].(string)
	if !ok {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "invalid_message",
				Message: "Message type is required",
			},
			Timestamp: time.Now(),
		})
		return
	}

	switch msgType {
	case "send_message":
		h.handleSendMessage(client, msg)
	case "mark_read":
		h.handleMarkRead(client, msg)
	case "join_chat":
		h.handleJoinChat(client, msg)
	case "leave_chat":
		h.handleLeaveChat(client, msg)
	case "typing":
		h.handleTyping(client, msg)
	case "stop_typing":
		h.handleStopTyping(client, msg)
	case "create_direct_chat":
		h.handleCreateDirectChat(client, msg)
	case "create_group_chat":
		h.handleCreateGroupChat(client, msg)
	case "get_chat_history":
		h.handleGetChatHistory(client, msg)
	case "ping":
		h.handlePing(client)
	default:
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "unknown_type",
				Message: "Unknown message type: " + msgType,
			},
			Timestamp: time.Now(),
		})
	}
}

func (h *Hub) handleSendMessage(client *Client, msg map[string]interface{}) {
	chatID, ok1 := msg["chat_id"].(string)
	content, ok2 := msg["content"].(string)
	if !ok1 || !ok2 {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "invalid_message",
				Message: "chat_id and content are required",
			},
			Timestamp: time.Now(),
		})
		return
	}

	message, err := h.messageService.SendMessage(chatID, client.UserID, content, "text")
	if err != nil {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "send_failed",
				Message: err.Error(),
			},
			Timestamp: time.Now(),
		})
		return
	}

	h.SendToChat(chatID, client.UserID, models.WebSocketMessage{
		Type:      "new_message",
		Data:      message,
		Timestamp: time.Now(),
	})

	client.SendMessage(models.WebSocketMessage{
		Type:      "message_sent",
		Data:      message,
		Timestamp: time.Now(),
	})
}

func (h *Hub) handleMarkRead(client *Client, msg map[string]interface{}) {
	messageID, ok := msg["message_id"].(string)
	if !ok {
		return
	}

	err := h.messageService.MarkMessageAsRead(messageID, client.UserID)
	if err != nil {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "mark_read_failed",
				Message: err.Error(),
			},
			Timestamp: time.Now(),
		})
	}
}

func (h *Hub) handleJoinChat(client *Client, msg map[string]interface{}) {
	chatID, ok := msg["chat_id"].(string)
	if !ok {
		return
	}

	chat, err := h.chatService.GetChat(chatID)
	if err != nil {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "chat_not_found",
				Message: "Chat not found",
			},
			Timestamp: time.Now(),
		})
		return
	}

	isParticipant := false
	for _, p := range chat.Participants {
		if p == client.UserID {
			isParticipant = true
			break
		}
	}
	if !isParticipant {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "not_participant",
				Message: "You are not a participant in this chat",
			},
			Timestamp: time.Now(),
		})
		return
	}

	client.JoinChat(chatID)
	client.SendMessage(models.WebSocketMessage{
		Type: "chat_joined",
		Data: map[string]interface{}{
			"chat_id":   chatID,
			"joined_at": time.Now(),
		},
		Timestamp: time.Now(),
	})
}

func (h *Hub) handleLeaveChat(client *Client, msg map[string]interface{}) {
	chatID, ok := msg["chat_id"].(string)
	if !ok {
		return
	}

	client.LeaveChat(chatID)
	client.SendMessage(models.WebSocketMessage{
		Type: "chat_left",
		Data: map[string]interface{}{
			"chat_id": chatID,
			"left_at": time.Now(),
		},
		Timestamp: time.Now(),
	})
}

func (h *Hub) handleTyping(client *Client, msg map[string]interface{}) {
	chatID, ok := msg["chat_id"].(string)
	if !ok {
		return
	}

	h.SendToChat(chatID, client.UserID, models.WebSocketMessage{
		Type: "typing",
		Data: models.TypingIndicator{
			ChatID:   chatID,
			UserID:   client.UserID,
			IsTyping: true,
		},
		Timestamp: time.Now(),
	})
}

func (h *Hub) handleStopTyping(client *Client, msg map[string]interface{}) {
	chatID, ok := msg["chat_id"].(string)
	if !ok {
		return
	}

	h.SendToChat(chatID, client.UserID, models.WebSocketMessage{
		Type: "typing",
		Data: models.TypingIndicator{
			ChatID:   chatID,
			UserID:   client.UserID,
			IsTyping: false,
		},
		Timestamp: time.Now(),
	})
}

func (h *Hub) handleCreateDirectChat(client *Client, msg map[string]interface{}) {
	userID, ok := msg["user_id"].(string)
	if !ok {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "invalid_request",
				Message: "user_id is required",
			},
			Timestamp: time.Now(),
		})
		return
	}

	chat, err := h.chatService.CreateDirectChat(client.UserID, userID)
	if err != nil {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "create_failed",
				Message: err.Error(),
			},
			Timestamp: time.Now(),
		})
		return
	}

	client.SendMessage(models.WebSocketMessage{
		Type:      "chat_created",
		Data:      chat,
		Timestamp: time.Now(),
	})

	if otherClient, exists := h.GetClient(userID); exists {
		otherClient.SendMessage(models.WebSocketMessage{
			Type:      "chat_created",
			Data:      chat,
			Timestamp: time.Now(),
		})
	}
}

func (h *Hub) handleCreateGroupChat(client *Client, msg map[string]interface{}) {
	var req models.GroupChatRequest
	data, err := json.Marshal(msg["data"])
	if err != nil {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "invalid_request",
				Message: "Invalid request data",
			},
			Timestamp: time.Now(),
		})
		return
	}
	if err := json.Unmarshal(data, &req); err != nil {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "invalid_request",
				Message: "Invalid request format",
			},
			Timestamp: time.Now(),
		})
		return
	}

	chat, err := h.chatService.CreateGroupChat(req.Name, client.UserID, req.Participants)
	if err != nil {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "create_failed",
				Message: err.Error(),
			},
			Timestamp: time.Now(),
		})
		return
	}

	for _, participantID := range chat.Participants {
		if participantClient, exists := h.GetClient(participantID); exists {
			participantClient.SendMessage(models.WebSocketMessage{
				Type:      "chat_created",
				Data:      chat,
				Timestamp: time.Now(),
			})
			participantClient.JoinChat(chat.ID)
		}
	}
}

func (h *Hub) handleGetChatHistory(client *Client, msg map[string]interface{}) {
	chatID, ok1 := msg["chat_id"].(string)
	limit := 50
	offset := 0
	
	if l, ok := msg["limit"].(float64); ok {
		limit = int(l)
	}
	if o, ok := msg["offset"].(float64); ok {
		offset = int(o)
	}
	
	if !ok1 {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "invalid_request",
				Message: "chat_id is required",
			},
			Timestamp: time.Now(),
		})
		return
	}

	messages, err := h.messageService.GetChatMessages(chatID, limit, offset)
	if err != nil {
		client.SendMessage(models.WebSocketMessage{
			Type: "error",
			Data: models.ErrorResponse{
				Code:    "get_failed",
				Message: err.Error(),
			},
			Timestamp: time.Now(),
		})
		return
	}

	client.SendMessage(models.WebSocketMessage{
		Type: "chat_history",
		Data: map[string]interface{}{
			"chat_id":  chatID,
			"messages": messages,
			"limit":    limit,
			"offset":   offset,
		},
		Timestamp: time.Now(),
	})
}

func (h *Hub) handlePing(client *Client) {
	client.SendMessage(models.WebSocketMessage{
		Type: "pong",
		Data: map[string]interface{}{
			"timestamp": time.Now(),
		},
		Timestamp: time.Now(),
	})
}