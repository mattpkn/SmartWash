import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMachines } from "@/context/MachinesContext";
import { useHistory } from "@/context/HistoryContext";

type PaymentMethod = "visa" | "apple" | "paypal" | "wallet";

const paymentMethods = [
  { id: "visa" as PaymentMethod, label: "VISA •••• 1234", icon: CreditCard },
  { id: "apple" as PaymentMethod, label: "Pay", icon: () => <span className="font-semibold">🍎</span>, prefix: true },
  { id: "paypal" as PaymentMethod, label: "PayPal", icon: () => <span className="font-bold text-sm text-primary">P</span> },
  { id: "wallet" as PaymentMethod, label: "Portefeuille SmartWash", icon: Wallet, balance: "15,20 €" },
];

export default function Payment() {
  const { machineId } = useParams<{ machineId: string }>();
  const navigate = useNavigate();
  const { machines, selectedMachine } = useMachines();
  const { addFromMachine } = useHistory();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("visa");

  const machine =
    selectedMachine ?? machines.find((m) => m.id === machineId);

  const handleConfirm = () => {
    if (!machine) {
      navigate("/");
      return;
    }

    // Ajoute une entrée dans l'historique à partir de la machine sélectionnée
    addFromMachine(machine);

    navigate(`/suivi/${machine.id}`);
  };

  return (
    <MobileLayout>
      <Header title="Paiement" showBack />

      <div className="px-4 py-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Paiement de votre lavage</h2>

          <div className="bg-card rounded-2xl p-4 border border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Machine sélectionnée :</span>
              <span className="font-medium">
                {machine ? machine.name : "Machine inconnue"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Durée :</span>
              <span className="font-medium">
                {machine ? `${machine.duration} min` : "—"}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="text-muted-foreground">Total :</span>
              <span className="font-bold text-lg">
                {machine ? `${machine.price.toFixed(2)} €` : "—"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-muted-foreground/30"
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-medium">{method.label}</span>
                  {method.balance && (
                    <span className="ml-2 text-sm text-muted-foreground">{method.balance}</span>
                  )}
                </div>
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>
              </button>
            );
          })}
        </div>

        <Button onClick={handleConfirm} className="w-full h-14 text-lg">
          Confirmer et Payer
        </Button>
      </div>
    </MobileLayout>
  );
}
