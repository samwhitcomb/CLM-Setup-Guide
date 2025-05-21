import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AccountModal } from "@/components/modals/AccountModal";

export function Header() {
  const { user, logout } = useAuth();
  const [showAccountModal, setShowAccountModal] = useState(false);

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-primary">CLM Setup Guide</h1>
        </div>
        <div>
          {user ? (
            <Button
              variant="outline"
              onClick={() => logout()}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => setShowAccountModal(true)}
            >
              Login
            </Button>
          )}
        </div>
      </div>
      <AccountModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />
    </header>
  );
}
