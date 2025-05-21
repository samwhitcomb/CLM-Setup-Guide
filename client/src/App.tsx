import { Route, useLocation } from "wouter";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import OnboardingPage from "@/pages/onboarding-page";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "./lib/protected-route";

// Custom hook for hash-based routing
const useHashLocation = () => {
  const [location, setLocation] = useLocation();
  const hashLocation = location.replace(/^#/, '') || '/';
  const hashNavigate = (to: string) => setLocation('#' + to);
  return [hashLocation, hashNavigate];
};

function App() {
  const [location] = useHashLocation();

  return (
    <>
      <Route path="/auth" component={AuthPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <ProtectedRoute path="/" component={HomePage} />
      <Route component={NotFound} />
    </>
  );
}

export default App;
