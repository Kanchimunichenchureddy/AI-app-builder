import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, X } from "lucide-react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatMessage, ChatUser } from "../types";
import { useToast } from "@/hooks/use-toast";

interface ChatWidgetProps {
  roomId?: string;
  roomName?: string;
  currentUser?: { id: string; name: string; avatar?: string };
  onClose?: () => void;
  className?: string;
}

export function ChatWidget({ 
  roomId = "general", 
  roomName = "General Chat",
  currentUser,
  onClose,
  className 
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<ChatUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demo - replace with Supabase real-time subscriptions
  useEffect(() => {
    // Demo messages
    const demoMessages: ChatMessage[] = [
      {
        id: "1",
        content: "Welcome to the chat!",
        user_id: "demo1",
        user_name: "Alice",
        user_avatar: "",
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        room_id: roomId,
      },
      {
        id: "2",
        content: "Hello everyone! 👋",
        user_id: "demo2", 
        user_name: "Bob",
        user_avatar: "",
        created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        room_id: roomId,
      },
    ];
    setMessages(demoMessages);

    // Demo online users
    const demoUsers: ChatUser[] = [
      { id: "demo1", name: "Alice", status: "online" },
      { id: "demo2", name: "Bob", status: "online" },
      { id: "demo3", name: "Charlie", status: "away" },
    ];
    setOnlineUsers(demoUsers);
  }, [roomId]);

  const handleSendMessage = async (content: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to send messages",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create new message
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        user_id: currentUser.id,
        user_name: currentUser.name,
        user_avatar: currentUser.avatar,
        created_at: new Date().toISOString(),
        room_id: roomId,
      };

      // Add to local state (in real app, this would be handled by Supabase real-time)
      setMessages(prev => [...prev, newMessage]);
      
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`h-[500px] flex flex-col ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <CardTitle className="text-lg">{roomName}</CardTitle>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <Badge variant="secondary" className="text-xs">
              {onlineUsers.length} online
            </Badge>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 p-0">
        <MessageList 
          messages={messages} 
          currentUserId={currentUser?.id}
        />
        
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={isLoading || !currentUser}
          placeholder={currentUser ? "Type a message..." : "Please log in to chat"}
        />
      </CardContent>
    </Card>
  );
}