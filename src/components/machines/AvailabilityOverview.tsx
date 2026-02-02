import { WashingMachine, Wind } from "lucide-react";

interface AvailabilityOverviewProps {
  laveLinge: { libre: number; occupe: number };
  secheLinge: { libre: number; occupe: number };
}

export function AvailabilityOverview({ laveLinge, secheLinge }: AvailabilityOverviewProps) {
  return (
    <div className="bg-card rounded-2xl p-4 border border-border">
      <h2 className="text-sm font-medium text-muted-foreground mb-3">
        Disponibilité des machines
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <WashingMachine className="w-5 h-5 text-primary" />
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-success">{laveLinge.libre}</span>
              <span className="text-xs text-muted-foreground">Lave-linges</span>
            </div>
          </div>
          <div className="text-muted-foreground text-sm">
            <span className="font-semibold text-warning">{laveLinge.occupe}</span> Occupés
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-primary" />
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-success">{secheLinge.libre}</span>
              <span className="text-xs text-muted-foreground">Sèche</span>
            </div>
          </div>
          <div className="text-muted-foreground text-sm">
            <span className="font-semibold text-warning">{secheLinge.occupe}</span> Occ
          </div>
        </div>
      </div>
    </div>
  );
}
