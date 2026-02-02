import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/layout/Header";
import { Calendar, CheckCircle2, WashingMachine, Wind } from "lucide-react";
import { useHistory } from "@/context/HistoryContext";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
});

const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});

export default function History() {
  const { history } = useHistory();

  const sorted = [...history].sort(
    (a, b) => new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime(),
  );

  return (
    <MobileLayout>
      <Header title="Historique" showBack />

      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Vos derniers lavages</span>
        </div>

        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-4">
            Aucun lavage enregistré pour le moment. Réservez une machine pour voir
            l&apos;historique ici.
          </p>
        ) : (
          <div className="space-y-3">
            {sorted.map((item) => {
              const date = new Date(item.finishedAt);
              const Icon = item.type === "seche-linge" ? Wind : WashingMachine;

              return (
                <div
                  key={item.id}
                  className="bg-card rounded-2xl p-4 border border-border"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.machineName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.program}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {dateFormatter.format(date)} à {timeFormatter.format(date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">
                        {item.price.toFixed(2)} €
                      </span>
                      <div className="flex items-center gap-1 text-success mt-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs">Terminé</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
