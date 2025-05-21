import { useOnboarding } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type StepInfo = {
  number: number;
  title: string;
  description: string;
  stage: string;
};

export function StepSidebar() {
  const { currentStep, setCurrentStep } = useOnboarding();
  
  const steps: StepInfo[] = [
    { 
      number: 0, 
      title: "Room Preparation", 
      description: "Measure and prepare your space",
      stage: "Physical Installation"
    },
    { 
      number: 1, 
      title: "Installation Overview", 
      description: "Review requirements and tools",
      stage: "Physical Installation"
    },
    { 
      number: 2, 
      title: "Installation & Wiring", 
      description: "Mount and connect",
      stage: "Physical Installation"
    },
    { 
      number: 3, 
      title: "Power On", 
      description: "Activate device",
      stage: "Device Setup"
    },
    { 
      number: 4, 
      title: "Connect Device", 
      description: "Link to app",
      stage: "Device Setup"
    },
    { 
      number: 5, 
      title: "Bind Device", 
      description: "Secure to account",
      stage: "Device Setup"
    },
    { 
      number: 6, 
      title: "Firmware Update", 
      description: "Install latest software",
      stage: "Device Setup"
    },
    { 
      number: 7, 
      title: "Calibration", 
      description: "Optimize accuracy",
      stage: "Device Setup"
    }
  ];

  // Group steps by stage
  const stages = steps.reduce((acc, step) => {
    if (!acc[step.stage]) {
      acc[step.stage] = [];
    }
    acc[step.stage].push(step);
    return acc;
  }, {} as Record<string, StepInfo[]>);

  // Function to safely handle step navigation
  const handleStepClick = (stepNumber: number) => {
    if (typeof setCurrentStep === 'function') {
      try {
        setCurrentStep(stepNumber);
      } catch (error) {
        console.error("Error setting current step:", error);
      }
    } else {
      console.error("setCurrentStep is not a function", setCurrentStep);
    }
  };

  return (
    <div className="w-full md:w-64 mb-6 md:mb-0">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium text-lg mb-4">Setup Steps</h3>
        <div className="space-y-6">
          {Object.entries(stages).map(([stage, stageSteps]) => (
            <div key={stage} className="space-y-2">
              <h4 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                {stage}
              </h4>
              {stageSteps.map((step) => (
                <Button
                  key={step.number}
                  type="button"
                  variant="ghost"
                  onClick={() => handleStepClick(step.number)}
                  className={cn(
                    "w-full justify-start p-3 h-auto font-normal",
                    currentStep === step.number
                      ? "bg-[#CD1B32] text-white hover:bg-[#CD1B32]/90 hover:text-white"
                      : "hover:bg-neutral-100"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium",
                        currentStep === step.number
                          ? "bg-white text-[#CD1B32]"
                          : "bg-neutral-200 text-neutral-600"
                      )}
                    >
                      {step.number + 1}
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-sm">{step.title}</h4>
                      <p className="text-xs opacity-80">{step.description}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
