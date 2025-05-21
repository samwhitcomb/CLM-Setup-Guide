import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { AuthContext } from "@/hooks/use-auth";

type OnboardingContextType = {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setStep: (step: number) => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const authContext = useContext(AuthContext);
  const user = authContext?.user ?? null;
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  
  // Initialize step from user data if available
  useEffect(() => {
    if (user && user.currentStep) {
      setCurrentStep(user.currentStep);
    }
  }, [user]);
  
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const setStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };
  
  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        goToNextStep,
        goToPreviousStep,
        setStep,
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
