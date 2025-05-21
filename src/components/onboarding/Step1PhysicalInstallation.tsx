import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AccountModal } from "@/components/modals/AccountModal";
import { 
  Bolt, 
  Wifi, 
  PlugZap, 
  Ruler, 
  Drill, 
  Club,
  ArrowRight,
  ArrowLeft,
  HardHat,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowDown,
  Scale,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";

export function Step1PhysicalInstallation() {
  const { goToNextStep, goToPreviousStep } = useOnboarding();
  const { user } = useAuth();
  const [installationReviewed, setInstallationReviewed] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Define the total number of pages
  const totalPages = 2;
  
  const handleContinue = () => {
    if (currentPage === totalPages - 1 || installationReviewed) {
      if (user) {
        goToNextStep();
      } else {
        setShowAccountModal(true);
      }
    }
  };
  
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Content for different pages
  const pageContent = [
    // Page 0: Overview and Requirements
    <div key="page0" className="fade-in">
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
            
            {/* Add dimensions */}
            <line x1="200" y1="260" x2="600" y2="260" stroke="#4b5563" strokeWidth="1" />
            <path d="M200,255 L200,265" stroke="#4b5563" strokeWidth="1" />
            <path d="M600,255 L600,265" stroke="#4b5563" strokeWidth="1" />
            <text x="400" y="280" fontFamily="sans-serif" fontSize="10" fill="#4b5563" textAnchor="middle">3-4 feet wide</text>
            
            <line x1="610" y1="80" x2="610" y2="240" stroke="#4b5563" strokeWidth="1" />
            <path d="M605,80 L615,80" stroke="#4b5563" strokeWidth="1" />
            <path d="M605,240 L615,240" stroke="#4b5563" strokeWidth="1" />
            <text x="630" y="160" fontFamily="sans-serif" fontSize="10" fill="#4b5563" textAnchor="middle" transform="rotate(90, 630, 160)">8-10 feet height</text>
            
            {/* Add golfer silhouette */}
            <path d="M390,290 C390,290 385,280 385,275 C385,270 387,265 390,260 C393,255 395,245 395,240 L405,240 C405,245 407,255 410,260 C413,265 415,270 415,275 C415,280 410,290 410,290" fill="#9ca3af" />
            <circle cx="400" cy="230" r="10" fill="#9ca3af" />
          </svg>
        </div>
      </div>
    </div>,

    // Page 1: Additional Resources
    <div key="page1" className="fade-in">
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
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Installation Overview</h3>
        <span className="text-xs bg-[#CD1B32]/20 text-[#CD1B32] px-2 py-1 rounded">Step 2 of 8</span>
      </div>
      
      {/* Page content with fixed height to prevent layout shifts */}
      <div className="h-[380px] overflow-y-auto pr-1 mb-2">
        {pageContent[currentPage]}
      </div>
      
      {/* Pagination controls */}
      <div className="flex justify-center mb-3 mt-1">
        <div className="flex items-center space-x-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {Array.from({length: totalPages}).map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index ? "default" : "outline"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </Button>
          ))}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous Step
        </Button>
        <div className="flex items-center gap-6">
          <div className="text-[#5C616B] text-sm">
            <label className="flex items-center" htmlFor="installation-reviewed">
              <Checkbox 
                id="installation-reviewed" 
                checked={installationReviewed}
                onCheckedChange={(checked) => setInstallationReviewed(!!checked)}
                className="mr-2 h-4 w-4"
              />
              <span>I've installed my device or will skip this step</span>
            </label>
          </div>
          <Button 
            onClick={handleContinue} 
            className="bg-[#CD1B32] hover:bg-[#DD393A] text-white transition flex items-center"
            disabled={!(currentPage === totalPages - 1 || installationReviewed)}
          >
            Continue to Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {showAccountModal && (
        <AccountModal 
          onClose={() => setShowAccountModal(false)} 
          onComplete={goToNextStep}
        />
      )}
    </div>
  );
}
