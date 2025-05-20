import { Switch, Route, useLocation } from "wouter";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import OnboardingPage from "@/pages/onboarding-page";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "./lib/protected-route";

function App() {
  const [location] = useLocation();
  
  // Handle GitHub Pages routing
  if (location.startsWith('/CLM-Setup-Guide')) {
    const newPath = location.replace('/CLM-Setup-Guide', '');
    window.history.replaceState(null, '', newPath);
  }

  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <ProtectedRoute path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
