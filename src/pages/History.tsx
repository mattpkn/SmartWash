import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/layout/Header";
import { Calendar, CheckCircle2, WashingMachine } from "lucide-react";

const mockHistory = [
  { id: "1", date: "Aujourd'hui", time: "14:30", machine: "Lave-linge 1", program: "Eco 30°C", price: "4,50 €", status: "completed" },
  { id: "2", date: "Hier", time: "10:15", machine: "Sèche-linge 2", program: "Séchage rapide", price: "3,00 €", status: "completed" },
  { id: "3", date: "28 Jan", time: "16:45", machine: "Lave-linge 3", program: "Coton 40°C", price: "5,00 €", status: "completed" },
  { id: "4", date: "25 Jan", time: "09:00", machine: "Lave-linge 1", program: "Délicat", price: "4,50 €", status: "completed" },
];

export default function History() {
  return (
    <MobileLayout>
      <Header title="Historique" showBack />

      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Vos derniers lavages</span>
        </div>

        <div className="space-y-3">
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl p-4 border border-border"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <WashingMachine className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.machine}</h3>
                    <p className="text-sm text-muted-foreground">{item.program}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.date} à {item.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold">{item.price}</span>
                  <div className="flex items-center gap-1 text-success mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs">Terminé</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
