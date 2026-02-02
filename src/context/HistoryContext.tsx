import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import type { Machine } from "@/lib/machines";

export interface WashHistoryItem {
  id: string;
  machineId: string;
  machineName: string;
  program: string;
  price: number;
  type: Machine["type"];
  finishedAt: string; // ISO string
}

interface HistoryContextValue {
  history: WashHistoryItem[];
  addFromMachine: (machine: Machine) => void;
}

const HistoryContext = createContext<HistoryContextValue | undefined>(
  undefined,
);

interface HistoryProviderProps {
  children: ReactNode;
}

export function HistoryProvider({ children }: HistoryProviderProps) {
  const [history, setHistory] = useState<WashHistoryItem[]>([]);

  const addFromMachine = (machine: Machine) => {
    const now = new Date();
    const finishedAt = new Date(
      now.getTime() + machine.duration * 60 * 1000,
    ).toISOString();

    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${machine.id}`,
        machineId: machine.id,
        machineName: machine.name,
        program: machine.program,
        price: machine.price,
        type: machine.type,
        finishedAt,
      },
    ]);
  };

  const value = useMemo<HistoryContextValue>(
    () => ({
      history,
      addFromMachine,
    }),
    [history],
  );

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}

export function useHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return ctx;
}

