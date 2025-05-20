import { useOnboarding } from "@/lib/onboarding-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StepSidebar } from "@/components/onboarding/StepSidebar";
import { Step0RoomPreparation } from "@/components/onboarding/Step0RoomPreparation";
import { Step1PhysicalInstallation } from "@/components/onboarding/Step1PhysicalInstallation";
import { Step2Installation } from "@/components/onboarding/Step2Installation";
import { Step3PowerOn } from "@/components/onboarding/Step3PowerOn";
import { Step5ConnectDevice } from "@/components/onboarding/Step5ConnectDevice";
import { Step6BindDevice } from "@/components/onboarding/Step6BindDevice";
import { Step7Firmware } from "@/components/onboarding/Step7Firmware";
import { Step8Calibration } from "@/components/onboarding/Step8Calibration";
import { Progress } from "@/components/ui/progress";

export default function OnboardingPage() {
  const { currentStep } = useOnboarding();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step0RoomPreparation />;
      case 2:
        return <Step1PhysicalInstallation />;
      case 3:
        return <Step2Installation />;
      case 4:
        return <Step3PowerOn />;
      case 5:
        return <Step5ConnectDevice />;
      case 6:
        return <Step6BindDevice />;
      case 7:
        return <Step7Firmware />;
      case 8:
        return <Step8Calibration />;
      default:
        return <Step0RoomPreparation />;
    }
  };

  const progress = (currentStep / 8) * 100;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <StepSidebar />
          <div className="space-y-4">
            <Progress
              value={progress}
              className="h-2 bg-[#DCF0A4]/20 [&>div]:bg-[#BCD879]"
            />
            {renderStep()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
