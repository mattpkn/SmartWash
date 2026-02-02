import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Payment from "./pages/Payment";
import Tracking from "./pages/Tracking";
import AiAdvice from "./pages/AiAdvice";
import History from "./pages/History";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import { MachinesProvider } from "./context/MachinesContext";
import { HistoryProvider } from "./context/HistoryContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MachinesProvider>
      <HistoryProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/paiement/:machineId" element={<Payment />} />
              <Route path="/suivi/:machineId" element={<Tracking />} />
              <Route path="/conseils" element={<AiAdvice />} />
              <Route path="/historique" element={<History />} />
              <Route path="/compte" element={<Account />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HistoryProvider>
    </MachinesProvider>
  </QueryClientProvider>
);

export default App;
