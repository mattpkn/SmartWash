import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WashingMachine, Wind } from "lucide-react";

export type MachineStatus = "libre" | "occupe" | "en-cours";

interface MachineCardProps {
  id: string;
  name: string;
  type: "lave-linge" | "seche-linge";
  status: MachineStatus;
  timeRemaining?: number;
  onReserve?: () => void;
  onTrack?: () => void;
}

export function MachineCard({
  name,
  type,
  status,
  timeRemaining,
  onReserve,
  onTrack,
}: MachineCardProps) {
  const isLaveLinge = type === "lave-linge";
  const Icon = isLaveLinge ? WashingMachine : Wind;

  const statusConfig = {
    libre: {
      label: "Libre",
      className: "status-libre",
      buttonLabel: "Réserver",
      buttonAction: onReserve,
    },
    occupe: {
      label: "Occupé",
      className: "status-occupe",
      buttonLabel: null,
      buttonAction: undefined,
    },
    "en-cours": {
      label: "En cours",
      className: "status-occupe",
      buttonLabel: "Suivi",
      buttonAction: onTrack,
    },
  };

  const config = statusConfig[status];

  return (
    <div className="machine-card">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-foreground">{name}</h3>
          </div>
          <div className="flex items-center gap-3">
            {timeRemaining !== undefined && (
              <span className="text-2xl font-bold text-foreground">
                {timeRemaining} <span className="text-base font-normal text-muted-foreground">min</span>
              </span>
            )}
            <span className={cn("status-badge", config.className)}>
              {config.label}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-secondary/50 flex items-center justify-center overflow-hidden">
            <div className="w-16 h-16 rounded-xl bg-card border-4 border-muted flex items-center justify-center">
              <Icon className="w-8 h-8 text-primary" />
            </div>
          </div>
          {status === "en-cours" && (
            <div className="absolute -top-1 -right-1 flex gap-0.5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse delay-100" />
            </div>
          )}
        </div>
      </div>

      {config.buttonLabel && (
        <Button
          onClick={config.buttonAction}
          className="w-full mt-4"
          variant={status === "libre" ? "default" : "secondary"}
        >
          {config.buttonLabel}
        </Button>
      )}
    </div>
  );
}
