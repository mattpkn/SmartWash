import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { machines as initialMachines, type Machine } from "@/lib/machines";

interface MachinesContextValue {
  machines: Machine[];
  selectedMachine?: Machine;
  selectMachine: (id: string) => void;
}

const MachinesContext = createContext<MachinesContextValue | undefined>(
  undefined,
);

interface MachinesProviderProps {
  children: ReactNode;
}

export function MachinesProvider({ children }: MachinesProviderProps) {
  const [machines] = useState<Machine[]>(initialMachines);
  const [selectedMachineId, setSelectedMachineId] = useState<string | undefined>();

  const selectMachine = (id: string) => {
    setSelectedMachineId(id);
  };

  const value = useMemo<MachinesContextValue>(
    () => ({
      machines,
      selectedMachine: machines.find((m) => m.id === selectedMachineId),
      selectMachine,
    }),
    [machines, selectedMachineId],
  );

  return (
    <MachinesContext.Provider value={value}>{children}</MachinesContext.Provider>
  );
}

export function useMachines() {
  const context = useContext(MachinesContext);
  if (!context) {
    throw new Error("useMachines must be used within a MachinesProvider");
  }
  return context;
}

