import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route, useLocation } from "wouter";

// Custom hook for hash-based routing
const useHashLocation = () => {
  const [location, setLocation] = useLocation();
  const hashLocation = location.replace(/^#/, '') || '/';
  const hashNavigate = (to: string) => setLocation('#' + to);
  return [hashLocation, hashNavigate];
};

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading } = useAuth();
  const [location] = useHashLocation();

  // Allow access to onboarding page without authentication
  if (path === "/onboarding") {
    return <Route path={path} component={Component} />;
  }

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  return <Route path={path} component={Component} />;
}
