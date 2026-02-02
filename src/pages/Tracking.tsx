import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useMachines } from "@/context/MachinesContext";
import { scheduleWashFinishedNotification } from "@/lib/notifications";
import { toast } from "@/components/ui/use-toast";

export default function Tracking() {
  const { machineId } = useParams<{ machineId: string }>();
  const { machines, selectedMachine } = useMachines();

  const machine =
    selectedMachine ?? machines.find((m) => m.id === machineId);

  const totalDurationMinutes = machine?.duration ?? 30;
  const initialRemainingSeconds = (machine?.timeRemaining ?? 12) * 60 + 15;

  const [timeRemaining, setTimeRemaining] = useState(initialRemainingSeconds);

  useEffect(() => {
    setTimeRemaining(initialRemainingSeconds);
  }, [initialRemainingSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const totalSeconds = totalDurationMinutes * 60;
  const progress =
    totalSeconds > 0
      ? ((totalSeconds - timeRemaining) / totalSeconds) * 100
      : 0;

  const handleAlertClick = async () => {
    if (timeRemaining <= 0) return;
    
    try {
      await scheduleWashFinishedNotification(
        timeRemaining,
        machine?.name ?? undefined,
      );
      toast({
        title: "Alerte programmée",
        description: `Vous recevrez une notification dans ${Math.floor(timeRemaining / 60)} min ${timeRemaining % 60} s.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de programmer l'alerte. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <MobileLayout>
      <Header title="Suivi de Lavage" showBack />

      <div className="px-4 py-6 space-y-8">
        <div className="bg-card rounded-2xl p-4 border border-border space-y-2">
          <h2 className="text-lg font-semibold">Suivi de votre lavage</h2>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Machine :</span>
            <span className="font-medium">
              {machine ? machine.name : "Machine inconnue"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Programme :</span>
            <span className="font-medium">
              {machine ? machine.program : "—"}
            </span>
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

        <Button
          variant="default"
          className="w-full h-14 text-lg"
          onClick={handleAlertClick}
          disabled={timeRemaining <= 0}
        >
          Recevoir une alerte
        </Button>
      </div>
    </MobileLayout>
  );
}
