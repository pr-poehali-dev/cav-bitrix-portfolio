
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BotProtection from "./components/BotProtection";
import BotAdmin from "./pages/BotAdmin";
import ConsentAdmin from "./pages/ConsentAdmin";
import AdminLogin from "./pages/AdminLogin";
import LoginHistory from "./pages/LoginHistory";
import ChangePassword from "./pages/ChangePassword";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import OurServices from "./pages/OurServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BotProtection />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/bots" element={<AdminProtectedRoute><BotAdmin /></AdminProtectedRoute>} />
          <Route path="/admin/consents" element={<AdminProtectedRoute><ConsentAdmin /></AdminProtectedRoute>} />
          <Route path="/admin/login-history" element={<AdminProtectedRoute><LoginHistory /></AdminProtectedRoute>} />
          <Route path="/admin/change-password" element={<AdminProtectedRoute><ChangePassword /></AdminProtectedRoute>} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;