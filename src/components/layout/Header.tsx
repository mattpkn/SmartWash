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
      <header className="bg-primary text-primary-foreground rounded-b-3xl px-6 pt-12 pb-8">
        <h1 className="text-2xl font-bold mb-1">SmartWash</h1>
        <p className="text-primary-foreground/90 text-lg">
          Bonjour {userName}.
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
