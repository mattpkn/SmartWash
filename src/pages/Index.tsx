import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/layout/Header";
import { AvailabilityOverview } from "@/components/machines/AvailabilityOverview";
import { MachineCard } from "@/components/machines/MachineCard";
import { useNavigate } from "react-router-dom";
import { useMachines } from "@/context/MachinesContext";

export default function Index() {
  const navigate = useNavigate();
  const { machines, selectMachine } = useMachines();

  const handleReserve = (machineId: string) => {
    selectMachine(machineId);
    navigate(`/paiement/${machineId}`);
  };

  const handleTrack = (machineId: string) => {
    selectMachine(machineId);
    navigate(`/suivi/${machineId}`);
  };

  const laveLingeMachines = machines.filter((m) => m.type === "lave-linge");
  const secheLingeMachines = machines.filter((m) => m.type === "seche-linge");

  const laveLingeStats = {
    libre: laveLingeMachines.filter((m) => m.status === "libre").length,
    occupe: laveLingeMachines.filter((m) => m.status !== "libre").length,
  };

  const secheLingeStats = {
    libre: secheLingeMachines.filter((m) => m.status === "libre").length,
    occupe: secheLingeMachines.filter((m) => m.status !== "libre").length,
  };

  return (
    <MobileLayout>
      <Header userName="Claire" />
      
      <div className="px-4 py-6 space-y-4">
        <AvailabilityOverview
          laveLinge={laveLingeStats}
          secheLinge={secheLingeStats}
        />

        <div className="space-y-3">
          {machines.map((machine) => (
            <MachineCard
              key={machine.id}
              {...machine}
              onReserve={() => handleReserve(machine.id)}
              onTrack={() => handleTrack(machine.id)}
            />
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
