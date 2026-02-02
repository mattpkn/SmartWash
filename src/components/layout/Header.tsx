import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  userName?: string;
}

export function Header({ title, showBack, userName }: HeaderProps) {
  const navigate = useNavigate();

  if (userName) {
    return (
      <header
        className="text-primary-foreground rounded-b-3xl px-6 pt-12 pb-8 shadow-md"
        style={{ backgroundImage: "var(--gradient-header)" }}
      >
        <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-1">
          SmartWash
        </p>
        <h1 className="text-2xl font-bold mb-1">Bonjour {userName}.</h1>
        <p className="text-primary-foreground/90 text-sm">
          Voici la disponibilité des machines dans votre laverie.
        </p>
      </header>
    );
  }

  return (
    <header className="flex items-center gap-3 px-4 pt-12 pb-4">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {title && (
        <h1 className="text-xl font-semibold text-primary">{title}</h1>
      )}
    </header>
  );
}
