import { SEO } from "@/components/SEO";
import { ChatWidget } from "@/modules/chat/components/ChatWidget";

export default function ChatDemo() {
  // Demo current user - replace with actual authentication
  const currentUser = {
    id: "current-user",
    name: "You",
    avatar: "",
  };

  return (
    <main className="container mx-auto py-10 max-w-4xl">
      <SEO 
        title="Chat Demo – AI App Builder" 
        description="Real-time chat widget demo with message history and online users" 
        canonical="/chat-demo" 
      />
      
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Chat Module Demo</h1>
        <p className="text-muted-foreground">
          A self-contained chat widget with real-time messaging, user avatars, and online status.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChatWidget
          roomId="general"
          roomName="General Chat"
          currentUser={currentUser}
        />
        
        <ChatWidget
          roomId="support"
          roomName="Customer Support"
          currentUser={currentUser}
        />
      </div>

      <section className="mt-8 p-6 bg-muted rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Integration Features</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Real-time messaging with Supabase subscriptions</li>
          <li>• User authentication and avatars</li>
          <li>• Multiple chat rooms support</li>
          <li>• Message history and timestamps</li>
          <li>• Online user indicators</li>
          <li>• Responsive design for all screen sizes</li>
          <li>• Accessible keyboard navigation</li>
        </ul>
      </section>
    </main>
  );
}