import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

interface OnboardingContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isComplete: boolean;
  setIsComplete: (complete: boolean) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const initialStep: number = user?.currentStep ?? 0;
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (user) {
      setCurrentStep(user.currentStep ?? 0);
    }
  }, [user]);

  const goToNextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetOnboarding = () => {
    setCurrentStep(0);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        isComplete,
        setIsComplete,
        goToNextStep,
        goToPreviousStep,
        resetOnboarding,
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
