import { Route, Switch } from "wouter";
import { OnboardingPage } from "@/pages/onboarding-page";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "./lib/protected-route";
import HomePage from "@/pages/home-page";
import NotFound from "@/pages/not-found";
import { Providers } from "./providers";

export default function App() {
  return (
    <Providers>
      <Switch>
        <Route path="/" component={OnboardingPage} />
        <Route path="/auth" component={AuthPage} />
        <ProtectedRoute path="/" component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    </Providers>
  );
}
