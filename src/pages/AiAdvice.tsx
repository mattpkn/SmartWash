import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Bot, ChevronRight, Sparkles, Shirt, BedDouble, CloudSun } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestions = [
  { id: "1", label: "Vêtements Délicats", icon: Shirt },
  { id: "2", label: "Serviettes / Draps", icon: BedDouble },
  { id: "3", label: "Grosse Couette", icon: CloudSun },
];

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
}

export default function AiAdvice() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Quel type de linge souhaitez-vous laver ?",
    },
  ]);

  const handleSuggestionClick = (label: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: label,
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: `Pour ${label.toLowerCase()}, je vous recommande le programme Délicat à 30°C. Durée estimée : 45 minutes. Voulez-vous réserver une machine ?`,
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
  };

  return (
    <MobileLayout>
      <Header title="Conseils IA" showBack />

      <div className="px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Bonjour Claire,</h2>
          <p className="text-muted-foreground">
            Besoin d'aide pour votre linge ?
          </p>
        </div>

        {/* SmartBot Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <Bot className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
              <Sparkles className="w-3 h-3 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-card px-3 py-1 rounded-full border border-border shadow-sm">
              <span className="text-xs font-medium">SmartBot</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="space-y-3 min-h-[100px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "chat-bubble",
                message.type === "bot" ? "chat-bubble-bot" : "chat-bubble-user"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <div className="space-y-2">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <Button
                key={suggestion.id}
                variant="secondary"
                className="w-full justify-between h-14 px-4"
                onClick={() => handleSuggestionClick(suggestion.label)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <span>{suggestion.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Button>
            );
          })}
        </div>

        {/* Tip */}
        <div className="bg-accent/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Astuce :</span> Lavez vos serviettes à 60°C pour une hygiène optimale!
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
