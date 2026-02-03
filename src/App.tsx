import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Exercises from "./pages/Exercises";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import ActiveWorkout from "./pages/ActiveWorkout";
import BMICalculator from "./pages/BMICalculator";
import Diet from "./pages/Diet";
import Steps from "./pages/Steps";
import Running from "./pages/Running";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/workout/:planId" element={<ActiveWorkout />} />
              <Route path="/bmi" element={<BMICalculator />} />
              <Route path="/diet" element={<Diet />} />
              <Route path="/steps" element={<Steps />} />
              <Route path="/running" element={<Running />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
