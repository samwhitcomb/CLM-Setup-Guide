import { useOnboarding } from "@/lib/onboarding-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StepSidebar } from "@/components/onboarding/StepSidebar";
import { Step0RoomPreparation } from "@/components/onboarding/Step0RoomPreparation";
import { Step1PhysicalInstallation } from "@/components/onboarding/Step1PhysicalInstallation";
import { Step2Installation } from "@/components/onboarding/Step2Installation";
import { Step3PowerOn } from "@/components/onboarding/Step3PowerOn";
import { Step4ConnectDevice } from "@/components/onboarding/Step4ConnectDevice";
import { Step5BindDevice } from "@/components/onboarding/Step5BindDevice";
import { Step6FirmwareUpdate } from "@/components/onboarding/Step6FirmwareUpdate";
import { Step7Calibration } from "@/components/onboarding/Step7Calibration";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export function OnboardingPage() {
  const { currentStep } = useOnboarding();
  const [errorState, setErrorState] = useState<{ hasError: boolean; message: string }>({
    hasError: false,
    message: "",
  });

  // Reset error state when step changes
  useEffect(() => {
    setErrorState({ hasError: false, message: "" });
  }, [currentStep]);

  const renderStep = () => {
    try {
      switch (currentStep) {
        case 0:
          return <Step0RoomPreparation />;
        case 1:
          return <Step1PhysicalInstallation />;
        case 2:
          return <Step2Installation />;
        case 3:
          return <Step3PowerOn />;
        case 4:
          return <Step4ConnectDevice />;
        case 5:
          return <Step5BindDevice />;
        case 6:
          return <Step6FirmwareUpdate />;
        case 7:
          return <Step7Calibration />;
        default:
          return <Step0RoomPreparation />;
      }
    } catch (error) {
      console.error("Error rendering step:", error);
      setErrorState({
        hasError: true,
        message: "There was an error loading this step. Please try refreshing the page.",
      });
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-600 font-medium">Error Loading Step</h3>
          <p className="text-red-600">There was an error loading this step. Please try refreshing the page.</p>
        </div>
      );
    }
  };

  const progress = ((currentStep + 1) / 8) * 100;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <StepSidebar />
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Progress
                value={progress}
                className="h-2 bg-[#DCF0A4]/20 [&>div]:bg-[#BCD879]"
              />
              {errorState.hasError ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-4">
                  <h3 className="text-red-600 font-medium">Error</h3>
                  <p className="text-red-600">{errorState.message}</p>
                </div>
              ) : (
                renderStep()
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
