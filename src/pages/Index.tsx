import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/layout/Header";
import { AvailabilityOverview } from "@/components/machines/AvailabilityOverview";
import { MachineCard } from "@/components/machines/MachineCard";
import { useNavigate } from "react-router-dom";

const mockMachines = [
  { id: "1", name: "Laverie 1", type: "lave-linge" as const, status: "libre" as const, timeRemaining: 18 },
  { id: "2", name: "Sèche-linge 2", type: "seche-linge" as const, status: "en-cours" as const, timeRemaining: 12 },
  { id: "3", name: "Laverie 2", type: "lave-linge" as const, status: "occupe" as const, timeRemaining: 25 },
  { id: "4", name: "Laverie 3", type: "lave-linge" as const, status: "libre" as const, timeRemaining: 0 },
];

export default function Index() {
  const navigate = useNavigate();

  const handleReserve = (machineId: string) => {
    navigate(`/paiement/${machineId}`);
  };

  const handleTrack = (machineId: string) => {
    navigate(`/suivi/${machineId}`);
  };

  return (
    <MobileLayout>
      <Header userName="Claire" />
      
      <div className="px-4 py-6 space-y-4">
        <AvailabilityOverview
          laveLinge={{ libre: 3, occupe: 2 }}
          secheLinge={{ libre: 2, occupe: 1 }}
        />

        <div className="space-y-3">
          {mockMachines.map((machine) => (
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
