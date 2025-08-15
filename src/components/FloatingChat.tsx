import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Minimize2 } from "lucide-react";
import { ChatWidget } from "@/modules/chat/components/ChatWidget";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; avatar?: string } | undefined>();

  useEffect(() => {
    // Get current user from localStorage (replace with your auth system)
    const raw = localStorage.getItem("app_user");
    if (raw) {
      const user = JSON.parse(raw);
      setCurrentUser({
        id: user.id || "anonymous",
        name: user.name || user.email?.split("@")[0] || "Anonymous",
        avatar: user.avatar,
      });
    } else {
      // Demo user for when not logged in
      setCurrentUser({
        id: "demo-user",
        name: "Demo User",
      });
    }
  }, []);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-80 sm:w-96 shadow-2xl rounded-lg overflow-hidden bg-background border">
        {isMinimized ? (
          <div className="p-4 border-b bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">Support Chat</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(false)}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <ChatWidget
            roomId="support"
            roomName="Support Chat"
            currentUser={currentUser}
            onClose={() => setIsOpen(false)}
            className="border-0 shadow-none"
          />
        )}
      </div>
    </div>
  );
}