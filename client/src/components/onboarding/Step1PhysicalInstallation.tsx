import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  Bolt, 
  Wifi, 
  PlugZap, 
  Ruler, 
  Drill, 
  HardHat,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowDown,
  Scale
} from "lucide-react";
import { useStep } from "@/hooks/use-step";
import { StepProps, PageContent } from "@/types/step";
import { StepErrorBoundary } from "@/components/error/StepErrorBoundary";

export function Step1PhysicalInstallation({ onComplete }: StepProps) {
  const { user } = useAuth();
  const { 
    state: { currentPage },
    handleNext,
    handleBack,
    setCompletion,
    validateStep
  } = useStep(2);

  const handleContinue = () => {
    const validation = validateStep();
    if (validation.isValid && user) {
      handleNext();
      onComplete?.();
    }
  };

  // Content for different pages
  const pageContent: PageContent[] = [
    // Page 0: Overview and Requirements
    {
      key: "overview",
      content: (
        <div className="fade-in">
          <p className="text-neutral-700 mb-4">
            Before proceeding with the installation, ensure you have all the necessary tools and materials.
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-amber-800 mb-1">Already Installed?</h5>
                <p className="text-xs text-amber-700">
                  If you've already installed your device, check the box at the bottom to continue.
                </p>
              </div>
            </div>
          </div>
          
          <h4 className="font-medium mb-3">Installation Requirements:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { icon: <Bolt className="h-4 w-4 text-primary" />, label: "Mounting hardware" },
              { icon: <Wifi className="h-4 w-4 text-primary" />, label: "Internet connection" },
              { icon: <PlugZap className="h-4 w-4 text-primary" />, label: "Power outlet" },
              { icon: <Ruler className="h-4 w-4 text-primary" />, label: "Tape measure" },
              { icon: <Drill className="h-4 w-4 text-primary" />, label: "Drill & level" },
              { icon: <HardHat className="h-4 w-4 text-primary" />, label: "Safety equipment" }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-neutral-100 p-2 rounded-lg flex items-center"
                onClick={() => setCompletion(`requirement-${index}`, true)}
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  {item.icon}
                </div>
                <span className="text-xs">{item.label}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 mb-2">
            <div className="bg-neutral-100 rounded-lg overflow-hidden h-36 sm:h-48">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 800 300" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0" y="0" width="800" height="300" fill="#f8f9fa" />
                <rect x="200" y="50" width="400" height="30" fill="#d1d5db" />
                <rect x="280" y="80" width="240" height="160" fill="#e5e7eb" rx="8" />
                <circle cx="400" cy="160" r="40" fill="#CD1B32" opacity="0.8" />
                <path d="M400,130 L400,190" stroke="#fff" strokeWidth="2" />
                <path d="M370,160 L430,160" stroke="#fff" strokeWidth="2" />
                <line x1="310" y1="80" x2="310" y2="240" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="490" y1="80" x2="490" y2="240" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="400" y1="50" x2="400" y2="80" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5" />
                <text x="400" y="270" fontFamily="sans-serif" fontSize="12" fill="#6b7280" textAnchor="middle">Ceiling mounted monitor</text>
                
                <line x1="200" y1="260" x2="600" y2="260" stroke="#4b5563" strokeWidth="1" />
                <path d="M200,255 L200,265" stroke="#4b5563" strokeWidth="1" />
                <path d="M600,255 L600,265" stroke="#4b5563" strokeWidth="1" />
                <text x="400" y="280" fontFamily="sans-serif" fontSize="10" fill="#4b5563" textAnchor="middle">3-4 feet wide</text>
                
                <line x1="610" y1="80" x2="610" y2="240" stroke="#4b5563" strokeWidth="1" />
                <path d="M605,80 L615,80" stroke="#4b5563" strokeWidth="1" />
                <path d="M605,240 L615,240" stroke="#4b5563" strokeWidth="1" />
                <text x="630" y="160" fontFamily="sans-serif" fontSize="10" fill="#4b5563" textAnchor="middle" transform="rotate(90, 630, 160)">8-10 feet height</text>
                
                <path d="M390,290 C390,290 385,280 385,275 C385,270 387,265 390,260 C393,255 395,245 395,240 L405,240 C405,245 407,255 410,260 C413,265 415,270 415,275 C415,280 410,290 410,290" fill="#9ca3af" />
                <circle cx="400" cy="230" r="10" fill="#9ca3af" />
              </svg>
            </div>
          </div>
        </div>
      )
    },
    // Page 1: Additional Resources
    {
      key: "resources",
      content: (
        <div className="fade-in">
          <div className="bg-neutral-100 p-3 rounded-lg border border-neutral-200 mb-4">
            <h5 className="font-medium flex items-center gap-2 mb-2 text-sm">
              <FileText className="h-4 w-4 text-primary" />
              <span>Additional Resources</span>
            </h5>
            <ul className="text-xs text-neutral-600 space-y-2">
              <li className="flex items-center gap-2">
                <ArrowDown className="h-3 w-3 text-primary" />
                <a href="#" className="text-primary underline">Download Detailed Installation Guide (PDF)</a>
              </li>
              <li className="flex items-center gap-2">
                <Scale className="h-3 w-3 text-primary" />
                <a href="#" className="text-primary underline">Mounting Surface Requirements</a>
              </li>
            </ul>
          </div>
          
          <div className="bg-primary/20 border border-primary rounded-lg p-3 mb-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-neutral-800 mb-1">Installation Checklist</h5>
                <ul className="text-xs text-neutral-700 space-y-1 list-disc pl-4">
                  <li>Device is mounted 9 - 10.5 feet high</li>
                  <li>Bracket is level and securely attached</li>
                  <li>Device is clicked firmly into bracket</li>
                  <li>Power cable is connected and routed neatly</li>
                  <li>Power indicator light is on</li>
                </ul>
              </div>
            </div>
          </div>
          
          <p className="text-neutral-600 text-sm italic">
            Once you've completed the physical installation or if you've already installed your device, 
            check the box below to continue with the digital setup process.
          </p>
        </div>
      )
    }
  ];

  return (
    <StepErrorBoundary>
      <div className="space-y-6">
        {pageContent[currentPage].content}
        
        <div className="flex gap-4">
          {currentPage > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleContinue}
            className="flex-1 bg-[#CD1B32] hover:bg-[#CD1B32]/90"
          >
            {currentPage === pageContent.length - 1 ? "Continue to Next Step" : "Next"}
          </Button>
        </div>
      </div>
    </StepErrorBoundary>
  );
}
