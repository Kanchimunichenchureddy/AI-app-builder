export interface ChatMessage {
  id: string;
  content: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  created_at: string;
  room_id?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  last_message?: ChatMessage;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  last_seen?: string;
}