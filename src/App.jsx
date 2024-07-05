import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/navbar"; // Changed to use the navbar layout
import Index from "./pages/Index.jsx";
import EducationalResources from "./pages/EducationalResources.jsx";
import DesignTools from "./pages/DesignTools.jsx";
import RegionalAdaptation from "./pages/RegionalAdaptation.jsx";
import ContentUpdates from "./pages/ContentUpdates.jsx";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home", // Feel free to change this to your liking
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Educational Resources",
    to: "/educational-resources",
  },
  {
    title: "Design Tools",
    to: "/design-tools",
  },
  {
    title: "Regional Adaptation",
    to: "/regional-adaptation",
  },
  {
    title: "Content Updates",
    to: "/content-updates",
  },
  {
    title: "Sign In/Sign Up",
    to: "/sign-in",
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/educational-resources" element={<EducationalResources />} />
              <Route path="/design-tools" element={<DesignTools />} />
              <Route path="/regional-adaptation" element={<RegionalAdaptation />} />
              <Route path="/content-updates" element={<ContentUpdates />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;