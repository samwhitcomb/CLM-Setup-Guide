import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useStep } from "@/hooks/use-step";
import { StepProps, StepItem } from "@/types/step";
import { StepErrorBoundary } from "@/components/error/StepErrorBoundary";

// Import images
import bracketInstallation from "@/assets/images/bracket-installation.gif";
import deviceMounting from "@/assets/images/device-mounting.gif";

export function Step2Installation({ onComplete, onBack }: StepProps) {
  const { 
    state: { currentPage },
    handleNext,
    handleBack,
    setCompletion,
    completionStatus,
    validateStep
  } = useStep(4);

  const steps: StepItem[] = [
    {
      title: "Mount Bracket",
      description: "Securely mount the bracket to the ceiling using the provided hardware.",
      image: bracketInstallation,
      checklist: [
        "Locate ceiling joists",
        "Mark mounting points",
        "Drill pilot holes",
        "Secure bracket with screws"
      ]
    },
    {
      title: "Install Device",
      description: "Carefully mount the device onto the bracket.",
      image: deviceMounting,
      checklist: [
        "Align device with bracket",
        "Connect power cable",
        "Secure device to bracket",
        "Verify power indicator"
      ]
    },
    {
      title: "Connect Cables",
      description: "Connect and route all necessary cables.",
      checklist: [
        "Connect power cable",
        "Connect network cable",
        "Route cables neatly",
        "Secure cables with ties"
      ]
    },
    {
      title: "Final Checks",
      description: "Perform final checks before powering on.",
      checklist: [
        "Verify bracket is level",
        "Check all connections",
        "Ensure cables are secure",
        "Clear installation area"
      ]
    }
  ];

  const handleContinue = () => {
    const validation = validateStep();
    if (validation.isValid) {
      if (currentPage === steps.length - 1) {
        onComplete?.();
      }
      handleNext();
    }
  };

  return (
    <StepErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Step {currentPage + 1} of {steps.length}</h3>
          <div className="flex gap-2">
            {completionStatus[`step-${currentPage}`] ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500" />
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="text-xl font-semibold mb-2">{steps[currentPage].title}</h4>
          <p className="text-neutral-600 mb-4">{steps[currentPage].description}</p>

          {steps[currentPage].image && (
            <div className="mb-6">
              <img
                src={steps[currentPage].image}
                alt={steps[currentPage].title}
                className="w-full rounded-lg"
              />
            </div>
          )}

          <div className="space-y-3">
            {steps[currentPage].checklist?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 cursor-pointer"
                onClick={() => setCompletion(`step-${currentPage}`, true)}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  completionStatus[`step-${currentPage}`] ? "border-green-500 bg-green-500" : "border-neutral-300"
                }`}>
                  {completionStatus[`step-${currentPage}`] && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {currentPage > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={handleContinue}
            className="flex-1 bg-[#CD1B32] hover:bg-[#CD1B32]/90"
            disabled={!completionStatus[`step-${currentPage}`]}
          >
            {currentPage === steps.length - 1 ? (
              "Complete Installation"
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </StepErrorBoundary>
  );
}