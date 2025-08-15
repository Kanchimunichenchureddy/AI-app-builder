import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "../types";
import { formatDistanceToNow } from "date-fns";

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId?: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
      <div className="space-y-4">
        {messages.map((message) => {
          const isOwn = message.user_id === currentUserId;
          
          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.user_avatar} />
                <AvatarFallback>
                  {message.user_name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className={`flex flex-col max-w-[70%] ${isOwn ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    {message.user_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                  </span>
                </div>
                
                <div
                  className={`rounded-lg p-3 max-w-full break-words ${
                    isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}