import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuizProvider } from "@/context/QuizContext";
import HeroPage from "./fear-audit/HeroPage";
import QuizPage from "./fear-audit/QuizPage";
import CalculatingPage from "./fear-audit/CalculatingPage";
import ResultsPage from "./fear-audit/ResultsPage";
import EmailGatePage from "./fear-audit/EmailGatePage";
import NotFound from "./fear-audit/NotFound";

const queryClient = new QueryClient();

export default function FearAuditWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <QuizProvider>
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/quiz/:section" element={<QuizPage />} />
            <Route path="/calculating" element={<CalculatingPage />} />
            <Route path="/email" element={<EmailGatePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QuizProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
