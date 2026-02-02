import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function Tracking() {
  const [timeRemaining, setTimeRemaining] = useState(12 * 60 + 15); // 12:15 in seconds
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const progress = ((30 * 60 - timeRemaining) / (30 * 60)) * 100;

  return (
    <MobileLayout>
      <Header title="Suivi de Lavage" showBack />

      <div className="px-4 py-6 space-y-8">
        <div className="bg-card rounded-2xl p-4 border border-border space-y-2">
          <h2 className="text-lg font-semibold">Suivi de votre lavage</h2>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Machine :</span>
            <span className="font-medium">Lave-linge 1</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Programme :</span>
            <span className="font-medium">Eco 30°C</span>
          </div>
        </div>

        <div className="flex flex-col items-center py-8">
          <div className="relative w-48 h-48">
            {/* Background circle */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83} 283`}
                className="transition-all duration-1000"
              />
            </svg>
            
            {/* Timer text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-foreground">
                {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
              </span>
              <span className="text-muted-foreground mt-1">Restant</span>
            </div>
          </div>

          <p className="text-lg font-medium text-primary mt-6">
            Lavage en cours...
          </p>
        </div>

        <div className="bg-secondary/50 rounded-2xl p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm">
                <span className="font-semibold">Notification :</span>{" "}
                Nous vous préviendrons à la fin du cycle.
              </p>
            </div>
          </div>
        </div>

        <Button variant="default" className="w-full h-14 text-lg">
          Recevoir une alerte
        </Button>
      </div>
    </MobileLayout>
  );
}
