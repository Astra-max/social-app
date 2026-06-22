package ws

import (
	"errors"
	"sync"
	"time"
	
	"social-network/backend/internal/models"
	"social-network/backend/internal/services"
)

var (
	ErrSendChannelFull = errors.New("send channel is full")
	ErrUserOffline     = errors.New("user is offline")
)

type Hub struct {
	clients        map[string]*Client
	Register       chan *Client
	Unregister     chan *Client
	Broadcast      chan *BroadcastMessage
	chatService    *services.ChatService
	messageService *services.MessageService
	mu             sync.RWMutex
}

type BroadcastMessage struct {
	ChatID  string
	Message interface{}
	Sender  string
}

func NewHub(
	chatService *services.ChatService,
	messageService *services.MessageService,
) *Hub {
	return &Hub{
		clients:        make(map[string]*Client),
		Register:       make(chan *Client),
		Unregister:     make(chan *Client),
		Broadcast:      make(chan *BroadcastMessage, 256),
		chatService:    chatService,
		messageService: messageService,
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			h.registerClient(client)
		case client := <-h.Unregister:
			h.unregisterClient(client)
		case broadcast := <-h.Broadcast:
			h.broadcastMessage(broadcast)
		}
	}
}

func (h *Hub) registerClient(client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()
	
	if oldClient, exists := h.clients[client.UserID]; exists {
		oldClient.Close()
	}
	
	h.clients[client.UserID] = client
	go h.notifyUserStatus(client.UserID, true)
	
	chats, err := h.chatService.GetUserChats(client.UserID)
	if err == nil {
		for _, chat := range chats {
			client.JoinChat(chat.ID)
		}
	}
}

func (h *Hub) unregisterClient(client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()
	
	if _, ok := h.clients[client.UserID]; ok {
		delete(h.clients, client.UserID)
		client.Close()
	}
	
	go h.notifyUserStatus(client.UserID, false)
}

func (h *Hub) broadcastMessage(broadcast *BroadcastMessage) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	
	for _, client := range h.clients {
		if client.IsInChat(broadcast.ChatID) && client.UserID != broadcast.Sender {
			client.SendMessage(broadcast.Message)
		}
	}
}

func (h *Hub) GetClient(userID string) (*Client, bool) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	client, exists := h.clients[userID]
	return client, exists
}

func (h *Hub) SendToUser(userID string, message interface{}) error {
	client, exists := h.GetClient(userID)
	if !exists {
		return ErrUserOffline
	}
	return client.SendMessage(message)
}

func (h *Hub) SendToChat(chatID, senderID string, message interface{}) {
	h.Broadcast <- &BroadcastMessage{
		ChatID:  chatID,
		Message: message,
		Sender:  senderID,
	}
}

func (h *Hub) notifyUserStatus(userID string, online bool) {
	statusMsg := models.WebSocketMessage{
		Type: "user_status",
		Data: map[string]interface{}{
			"user_id":   userID,
			"online":    online,
			"timestamp": time.Now(),
		},
		Timestamp: time.Now(),
	}
	
	h.mu.RLock()
	clients := make([]*Client, 0, len(h.clients))
	for _, client := range h.clients {
		clients = append(clients, client)
	}
	h.mu.RUnlock()
	
	for _, client := range clients {
		client.SendMessage(statusMsg)
	}
}

func (h *Hub) GetOnlineUsers() []string {
	h.mu.RLock()
	defer h.mu.RUnlock()
	
	users := make([]string, 0, len(h.clients))
	for userID := range h.clients {
		users = append(users, userID)
	}
	return users
}