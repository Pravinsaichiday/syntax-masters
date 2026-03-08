import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AIChatbot from "@/components/AIChatbot";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WelcomePage from "./pages/WelcomePage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemPage from "./pages/ProblemPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import DSARoadmapPage from "./pages/DSARoadmapPage";
import DSATopicPage from "./pages/DSATopicPage";
import LearnPythonPage from "./pages/LearnPythonPage";
import PythonTopicPage from "./pages/PythonTopicPage";
import LearnTrackPage from "./pages/LearnTrackPage";
import TrackTopicPage from "./pages/TrackTopicPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MaintenancePage from "./pages/MaintenancePage";
import NotebookPage from "./pages/NotebookPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { data: isMaintenanceMode, isLoading } = useQuery({
    queryKey: ["maintenance-check"],
    queryFn: async () => {
      const { data } = await supabase
        .from("admin_settings")
        .select("value")
        .eq("key", "maintenance_mode")
        .single();
      return data?.value === "true";
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isMaintenanceMode) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<MaintenancePage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/dsa" element={<DSARoadmapPage />} />
        <Route path="/dsa/:topicId" element={<DSATopicPage />} />
        <Route path="/learn-python" element={<LearnPythonPage />} />
        <Route path="/learn-python/:topicId" element={<PythonTopicPage />} />
        <Route path="/learn/:trackId" element={<LearnTrackPage />} />
        <Route path="/learn/:trackId/:topicId" element={<TrackTopicPage />} />
        <Route path="/notebook" element={<NotebookPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AIChatbot />
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
