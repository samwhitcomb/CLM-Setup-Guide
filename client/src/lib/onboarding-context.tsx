import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

type OnboardingContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isComplete: boolean;
  setIsComplete: (complete: boolean) => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (user) {
      setCurrentStep(user.currentStep);
    }
  }, [user]);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        isComplete,
        setIsComplete,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
