import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="mobile-container">
      <div className="safe-bottom">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
