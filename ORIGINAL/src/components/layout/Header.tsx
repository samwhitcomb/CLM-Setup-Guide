import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { HeadphonesIcon } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo className="h-8 w-auto" />
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <span className="text-sm text-neutral-600">
              Welcome, {user.fullName || user.username}
            </span>
          )}
          <span className="text-sm font-medium text-neutral-600">Need help?</span>
          <Button variant="ghost" className="text-primary hover:text-primary/90 text-sm flex items-center">
            <HeadphonesIcon className="h-4 w-4 mr-1" /> Support
          </Button>
          {user && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="ml-2"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
