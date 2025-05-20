import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import OnboardingPage from "@/pages/onboarding-page";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "./lib/protected-route";

function App() {
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
