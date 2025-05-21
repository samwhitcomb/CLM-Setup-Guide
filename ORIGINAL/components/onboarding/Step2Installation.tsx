import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  ArrowRight, 
  Check, 
  Ruler,
  Drill,
  Cable,
  Power,
  Target,
  AlertCircle,
  HardHat,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  Layout,
  MapPin,
  Wrench,
  Zap,
  Network
} from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import bracketInstallationGif from "@/assets/images/bracket-installation.gif";
import deviceMountingGif from "@/assets/images/device-mounting.gif";

type MountingType = "direct" | "pole";

type CeilingMaterial = "drywall" | "concrete" | "suspended" | "wood";

type WiringType = "surface" | "hidden";

type InstallationState = {
  mountingType: MountingType | null;
  wiringType: WiringType | null;
  ceilingMaterial: CeilingMaterial | null;
  mountingPosition: {
    distanceFromScreen: number;
    isCentered: boolean;
  };
  bracketInstalled: boolean;
  cablesReady: boolean;
  deviceMounted: boolean;
  ceilingMarked: boolean;
  wiringConfirmed: boolean;
};

export function Step2Installation() {
  const { goToNextStep, goToPreviousStep } = useOnboarding();
  const [installStep, setInstallStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [installationState, setInstallationState] = useState<InstallationState>({
    mountingType: null,
    wiringType: null,
    ceilingMaterial: null,
    mountingPosition: {
      distanceFromScreen: 0,
      isCentered: false
    },
    bracketInstalled: false,
    cablesReady: false,
    deviceMounted: false,
    ceilingMarked: false,
    wiringConfirmed: false
  });

  const handleNextInstallStep = () => {
    if (installStep < 7) {
      setInstallStep(installStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevInstallStep = () => {
    if (installStep > 1) {
      setInstallStep(installStep - 1);
      setIsCompleted(false);
    }
  };

  const handleStepClick = (step: number) => {
    setInstallStep(step);
    setIsCompleted(false);
  };

  const totalSteps = 7;
  const progress = (installStep / totalSteps) * 100;

  const renderStepContent = () => {
    switch (installStep) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h4 className="font-medium mb-4">Room Measurement and Mounting Position</h4>
            <div className="mb-6">
              <div className="w-full h-48 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-neutral-400">Placeholder for Room Measurement GIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Mounting Position
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Ideal Mounting Zone</h5>
                      <ul className="text-sm text-neutral-600 space-y-1 list-disc pl-4">
                        <li>9-12 feet from the screen</li>
                        <li>Centered above the hitting area</li>
                        <li>Level with the floor</li>
                      </ul>
                    </div>
                    <div className="bg-primary/10 border border-primary rounded-lg p-4">
                      <div className="flex items-start">
                        <Target className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-neutral-800 mb-1">Position Detected</h5>
                          <p className="text-sm text-neutral-600">
                            Mounting location: 9-12 ft from screen, centered to hitting area
                          </p>
                        </div>
                      </div>
                    </div>
      </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    Mounting Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RadioGroup
                      value={installationState.mountingType || ""}
                      onValueChange={(value) => setInstallationState(prev => ({
                        ...prev,
                        mountingType: value as MountingType
                      }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="direct" id="direct" />
                        <Label htmlFor="direct">Direct Mount</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pole" id="pole" />
                        <Label htmlFor="pole">Drop-down Pole</Label>
        </div>
                    </RadioGroup>
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Recommended Hardware</h5>
                      <ul className="text-sm text-neutral-600 space-y-1 list-disc pl-4">
                        <li>Heavy-duty anchors</li>
                        <li>1/4" lag screws</li>
                        <li>Washers and lock nuts</li>
                      </ul>
        </div>
      </div>
                </CardContent>
              </Card>
            </div>
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Professional Installation Recommended</AlertTitle>
              <AlertDescription>
                For suspended ceilings or heights over 12 feet, we recommend professional installation.
              </AlertDescription>
            </Alert>
          </motion.div>
        );

      case 2:
        return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
            <h4 className="font-medium mb-4">Marking the Mounting Position</h4>
            <div className="mb-6">
              <div className="w-full h-48 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-neutral-400">Placeholder for Mounting Position GIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    Template Placement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Instructions:</h5>
                      <ol className="text-sm text-neutral-600 space-y-2 list-decimal pl-4">
                        <li>Place the mounting template on the ceiling in the calculated position</li>
                        <li>Use a level to ensure it's flat and square to the screen</li>
                        <li>Mark the screw holes with a pencil</li>
                      </ol>
                    </div>
                    <div className="bg-primary/10 border border-primary rounded-lg p-4">
                      <div className="flex items-start">
                        <Target className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-neutral-800 mb-1">Template Position</h5>
                          <p className="text-sm text-neutral-600">
                            Ensure the template is centered and aligned with your hitting area.
                          </p>
            </div>
              </div>
            </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Confirmation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Checklist</h5>
                      <ul className="text-sm text-neutral-600 space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          Template is centered
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          Template is level
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          Holes are marked
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>
        </motion.div>
        );

      case 3:
        return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
            <h4 className="font-medium mb-4">Wiring Options and Planning</h4>
            <div className="mb-6">
              <div className="w-full h-48 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-neutral-400">Placeholder for Wiring Options GIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cable className="h-4 w-4" />
                    Cable Routing Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RadioGroup
                      value={installationState.wiringType || ""}
                      onValueChange={(value) => setInstallationState(prev => ({
                        ...prev,
                        wiringType: value as WiringType
                      }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="surface" id="surface" />
                        <Label htmlFor="surface">Surface Routing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hidden" id="hidden" />
                        <Label htmlFor="hidden">Hidden Install</Label>
            </div>
                    </RadioGroup>
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Cable Requirements</h5>
                      <ul className="text-sm text-neutral-600 space-y-2">
                        <li className="flex items-center gap-2">
                          <Network className="h-4 w-4" />
                          Ethernet: 15-20 feet
                        </li>
                        <li className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Power: 15-20 feet
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowDown className="h-4 w-4" />
                          Leave 6-12 inches of slack
                        </li>
              </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Important Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Professional Assistance Recommended</AlertTitle>
                    <AlertDescription>
                      Hidden ceiling wiring should only be performed by a professional.
                    </AlertDescription>
                  </Alert>
                  <div className="bg-primary/10 border border-primary rounded-lg p-4">
                    <div className="flex items-start">
                      <HardHat className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-neutral-800 mb-1">Safety First</h5>
                        <p className="text-sm text-neutral-600">
                          Ensure all cables are properly secured and protected.
                        </p>
              </div>
            </div>
                  </div>
                </CardContent>
              </Card>
          </div>
        </motion.div>
        );

      case 4:
        return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
            <h4 className="font-medium mb-4">Drilling and Fixing the Bracket</h4>
            <div className="mb-6">
              <div className="w-full h-40 bg-neutral-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <img 
                  src={bracketInstallationGif} 
                  alt="Bracket Installation Process" 
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Drill className="h-4 w-4" />
                    Installation Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Step-by-Step Guide</h5>
                      <ol className="text-sm text-neutral-600 space-y-2 list-decimal pl-4">
                        <li>Drill pilot holes at marked positions</li>
                        <li>Install appropriate anchors for your ceiling type</li>
                        <li>Secure the bracket with provided screws</li>
                        <li>Use a level to ensure the bracket is perfectly flat</li>
                      </ol>
                    </div>
                    <div className="bg-primary/10 border border-primary rounded-lg p-4">
                      <div className="flex items-start">
                        <HardHat className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-neutral-800 mb-1">Safety First</h5>
                          <p className="text-sm text-neutral-600">
                            Ensure the bracket is securely attached before proceeding.
                          </p>
                        </div>
                      </div>
            </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Installation Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Confirm Installation</h5>
                      <ul className="text-sm text-neutral-600 space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          Bracket is securely attached
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          Bracket is level
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          All screws are tightened
                </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h4 className="font-medium mb-4">Threading Cables and Seating the Adapter</h4>
            <div className="mb-6">
              <div className="w-full h-48 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-neutral-400">Placeholder for Cable Threading GIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cable className="h-4 w-4" />
                    Cable Preparation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Instructions</h5>
                      <ol className="text-sm text-neutral-600 space-y-2 list-decimal pl-4">
                        <li>Select the correct cable lengths</li>
                        <li>Thread cables through the bracket</li>
                        <li>Seat the power adapter brick inside the bracket</li>
                        <li>Leave 6-12 inches of cable exposed</li>
                      </ol>
                    </div>
                    <div className="bg-primary/10 border border-primary rounded-lg p-4">
                      <div className="flex items-start">
                        <ArrowDown className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-neutral-800 mb-1">Cable Management</h5>
                          <p className="text-sm text-neutral-600">
                            Ensure cables are neatly routed and have enough slack for connection.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Power className="h-4 w-4" />
                    Power Setup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Power Requirements</h5>
                      <ul className="text-sm text-neutral-600 space-y-2">
                        <li className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Ensure power outlet is accessible
                        </li>
                        <li className="flex items-center gap-2">
                          <Network className="h-4 w-4" />
                          Ethernet port is available
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          Adapter is securely seated
                </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h4 className="font-medium mb-4">Mounting the CLM PRO</h4>
            <div className="mb-6">
              <div className="w-full h-40 bg-neutral-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <img 
                  src={deviceMountingGif} 
                  alt="Device Mounting Process" 
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Device Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Step-by-Step Guide</h5>
                      <ol className="text-sm text-neutral-600 space-y-2 list-decimal pl-4">
                        <li>Insert monitor left to right until it clicks into place</li>
                        <li>Plug in the Ethernet and power cables</li>
                        <li>Confirm the unit is securely latched</li>
                      </ol>
                    </div>
                    <div className="bg-primary/10 border border-primary rounded-lg p-4">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-neutral-800 mb-1">Device Mounted Successfully</h5>
                          <p className="text-sm text-neutral-600">
                            The CLM PRO is now securely mounted and ready for setup.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Final Checks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-neutral-100 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Verification Checklist</h5>
                      <ul className="text-sm text-neutral-600 space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          Device is securely mounted
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          All cables are connected
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          Power indicator is on
                </li>
              </ul>
            </div>
                  </div>
                </CardContent>
              </Card>
          </div>
        </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Installation & Wiring</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 3 of 7</span>
      </div>
      
      <div className="mb-6">
        <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-neutral-500">
          {[
            { label: "Position", step: 1 },
            { label: "Marking", step: 2 },
            { label: "Wiring", step: 3 },
            { label: "Bracket", step: 4 },
            { label: "Cables", step: 5 },
            { label: "Device", step: 6 }
          ].map(({ label, step }) => (
            <button
              key={step}
              onClick={() => handleStepClick(step)}
              className={`cursor-pointer hover:text-primary transition-colors ${
                installStep === step ? "text-primary font-medium" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {renderStepContent()}

      <div className="flex justify-between items-center">
        {!isCompleted ? (
          <>
            <Button 
              variant="outline"
              onClick={handlePrevInstallStep}
              disabled={installStep === 1}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          <Button 
            onClick={handleNextInstallStep} 
            className="bg-primary hover:bg-primary/90 text-white ml-auto flex items-center"
          >
              {installStep === 6 ? "Complete" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline"
              onClick={() => handleStepClick(6)}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Device Mounting
            </Button>
            <Button 
              onClick={goToNextStep} 
              className="bg-[#CD1B32] hover:bg-[#CD1B32]/90 text-white flex items-center"
            >
              Continue to Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}