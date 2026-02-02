import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { 
  User, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: User, label: "Informations personnelles", path: "/compte/profil" },
  { icon: Wallet, label: "Portefeuille SmartWash", path: "/compte/wallet", badge: "15,20 €" },
  { icon: CreditCard, label: "Moyens de paiement", path: "/compte/paiement" },
  { icon: Bell, label: "Notifications", path: "/compte/notifications" },
  { icon: HelpCircle, label: "Aide & Support", path: "/compte/aide" },
];

export default function Account() {
  return (
    <MobileLayout>
      <Header title="Compte" showBack />

      <div className="px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-6 border border-border text-center">
          <div className="w-20 h-20 rounded-full bg-primary mx-auto flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary-foreground">C</span>
          </div>
          <h2 className="text-xl font-semibold">Claire Dupont</h2>
          <p className="text-muted-foreground">claire.dupont@email.com</p>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {item.badge && (
                  <span className="text-sm font-semibold text-primary">{item.badge}</span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button
          variant="secondary"
          className="w-full h-14 text-destructive hover:text-destructive"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Se déconnecter
        </Button>
      </div>
    </MobileLayout>
  );
}
