import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Ruler, 
  Club, 
  Maximize,
  Video,
  Target,
  AlertTriangle,
  ChevronLeft
} from "lucide-react";
import { 
  Slider 
} from "@/components/ui/slider";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

type DeviceStatus = {
  pitch: number;
  roll: number;
  height: number;
  alignment: boolean;
};

type CalibrationStep = 1 | 2 | 3 | 4;

export function Step8Calibration() {
  const { goToNextStep, goToPreviousStep } = useOnboarding();
  const ceilingHeight = 9;
  const [screenDistance, setScreenDistance] = useState(10);
  const [calibrationStep, setCalibrationStep] = useState<CalibrationStep>(1);
  const [calibrating, setCalibrating] = useState(false);
  const [calibrationComplete, setCalibrationComplete] = useState(false);
  const [testShots, setTestShots] = useState<any[]>([]);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    pitch: 0,
    roll: 0,
    height: 9,
    alignment: false
  });
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [environmentIssues, setEnvironmentIssues] = useState<string[]>([]);
  
  const handleScreenDistanceChange = (value: number[]) => {
    const newDistance = value[0];
    if (newDistance >= 6 && newDistance <= 15) {
      setScreenDistance(newDistance);
    }
  };
  
  const handleAzimuthCalibration = () => {
    setCalibrating(true);
    
    // Simulate device status check
    setTimeout(() => {
      const isAligned = Math.random() > 0.5;
      setDeviceStatus(prev => ({
        ...prev,
        pitch: Math.random() * 2 - 1, // Random pitch between -1 and 1
        roll: Math.random() * 2 - 1,  // Random roll between -1 and 1
        alignment: isAligned
      }));
      
      setCalibrating(false);
      
      // If all values are in spec, advance to next step
      const isPitchOk = Math.abs(deviceStatus.pitch) < 0.5;
      const isRollOk = Math.abs(deviceStatus.roll) < 0.5;
      const isHeightOk = deviceStatus.height >= 7 && deviceStatus.height <= 16;
      
      if (isPitchOk && isRollOk && isHeightOk && isAligned) {
        setCalibrationStep(2); // Advance to distance input
      } else {
        alert("The unit needs adjustment. Please ensure all values are in the green range.");
      }
    }, 2000);
  };
  
  const startCalibration = () => {
    setCalibrationStep(2);
    setCalibrating(true);
    
    // Simulate test shots being recorded
    setTimeout(() => {
      setTestShots([
        { id: 1, clubSpeed: 93, ballSpeed: 138, launchAngle: 12.5, spinRate: 2800, distance: 235 },
      ]);
      
      setTimeout(() => {
        setTestShots(prev => [
          ...prev,
          { id: 2, clubSpeed: 95, ballSpeed: 142, launchAngle: 11.8, spinRate: 2650, distance: 243 },
        ]);
        
        setTimeout(() => {
          setTestShots(prev => [
            ...prev,
            { id: 3, clubSpeed: 94, ballSpeed: 140, launchAngle: 12.2, spinRate: 2750, distance: 240 },
          ]);
          
          setCalibrating(false);
          setCalibrationStep(3);
        }, 3000);
      }, 3000);
    }, 3000);
  };
  
  const completeCalibration = () => {
    setCalibrationProgress(0);
    setCalibrating(true);
    
    // Simulate final calibration
    const interval = setInterval(() => {
      setCalibrationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCalibrating(false);
          setCalibrationComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleFinalCalibration = () => {
    setCalibrating(true);
    setCalibrationProgress(0);
    
    // Simulate environment check
    setTimeout(() => {
      const issues = [];
      if (Math.random() > 0.7) issues.push("Glare detected in hitting zone");
      if (Math.random() > 0.7) issues.push("Camera view partially obstructed");
      setEnvironmentIssues(issues);
      
      // Simulate calibration progress
      const interval = setInterval(() => {
        setCalibrationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setCalibrating(false);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }, 1000);
  };

  const renderDeviceStatus = () => {
    const isPitchOk = Math.abs(deviceStatus.pitch) < 0.5;
    const isRollOk = Math.abs(deviceStatus.roll) < 0.5;
    const isHeightOk = deviceStatus.height >= 7 && deviceStatus.height <= 16;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-neutral-50 rounded">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-primary mr-2" />
            <span className="text-neutral-700">Pitch</span>
          </div>
          <span className={`font-medium ${isPitchOk ? 'text-green-600' : 'text-red-600'}`}>
            {isPitchOk ? '✓' : '⚠️'} {deviceStatus.pitch.toFixed(1)}°
          </span>
        </div>
        <div className="flex items-center justify-between p-2 bg-neutral-50 rounded">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-primary mr-2" />
            <span className="text-neutral-700">Roll</span>
          </div>
          <span className={`font-medium ${isRollOk ? 'text-green-600' : 'text-red-600'}`}>
            {isRollOk ? '✓' : '⚠️'} {deviceStatus.roll.toFixed(1)}°
          </span>
        </div>
        <div className="flex items-center justify-between p-2 bg-neutral-50 rounded">
          <div className="flex items-center">
            <Ruler className="h-5 w-5 text-primary mr-2" />
            <span className="text-neutral-700">Height</span>
          </div>
          <span className={`font-medium ${isHeightOk ? 'text-green-600' : 'text-red-600'}`}>
            {isHeightOk ? '✓' : '⚠️'} {deviceStatus.height} ft
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Device Calibration</h3>
        <span className="text-xs bg-[#CD1B32]/20 text-[#CD1B32] px-2 py-1 rounded">Step 8 of 8</span>
      </div>
      
      {calibrationComplete ? (
        <div className="flex flex-col items-center justify-center p-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4"
          >
            <Check className="h-10 w-10 text-primary" />
          </motion.div>
          
          <h3 className="text-xl font-medium text-center mb-2">Calibration Complete</h3>
          <p className="text-neutral-600 text-center mb-6">
            Your CLM PRO has been calibrated for optimal accuracy.
          </p>
          
          <div className="bg-neutral-100 p-6 rounded-lg max-w-md w-full mb-6">
            <h4 className="font-medium mb-4">Calibration Settings</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Ceiling Height:</span>
                <span className="font-medium">{ceilingHeight} feet</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Test Shots:</span>
                <span className="font-medium">{testShots.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Status:</span>
                <span className="text-primary font-medium">Optimized</span>
              </div>
            </div>
          </div>
          
          <Card className="mb-6 w-full max-w-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">Test Shot Results</h5>
                <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Average Values</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-neutral-50 p-2 rounded text-center">
                  <div className="text-xl font-medium text-primary">94</div>
                  <div className="text-xs text-neutral-600">Club Speed (mph)</div>
                </div>
                <div className="bg-neutral-50 p-2 rounded text-center">
                  <div className="text-xl font-medium text-primary">140</div>
                  <div className="text-xs text-neutral-600">Ball Speed (mph)</div>
                </div>
                <div className="bg-neutral-50 p-2 rounded text-center">
                  <div className="text-xl font-medium text-primary">239</div>
                  <div className="text-xs text-neutral-600">Distance (yds)</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end mt-6">
            <Button
              onClick={goToNextStep}
              className="bg-[#CD1B32] hover:bg-[#CD1B32]/90 text-white flex items-center"
            >
              Continue to Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <>
          {calibrationStep === 1 && (
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="w-full md:w-1/2">
                <div className="bg-[#F7F7F7] rounded-lg p-6 relative">
                  <h4 className="text-base font-medium mb-2">Align Device and Confirm Mounting</h4>
                  <p className="text-sm text-neutral-600 mb-4">
                    Place a golf club along the intended target line (0° launch direction) and we'll align the device's centerline.
                  </p>
                  
                  <div className="mb-4">
                    <div className="aspect-video bg-neutral-200 rounded-lg mb-4 flex items-center justify-center">
                      <Video className="h-12 w-12 text-neutral-400" />
                      <span className="text-sm text-neutral-500 ml-2">Live Video Feed</span>
                    </div>
                    
                    <Button 
                      onClick={handleAzimuthCalibration} 
                      className="bg-[#CD1B32] hover:bg-[#DD393A] text-white w-full"
                      disabled={calibrating}
                    >
                      {calibrating ? 'Calibrating...' : 'Calibrate Centerline'}
                    </Button>
                  </div>
                  
                  {deviceStatus.alignment && (
                    <Alert className="bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertTitle>Centerline Calibrated</AlertTitle>
                      <AlertDescription>
                        Device status: Flat ✓ | Height OK ✓ | Alignment OK ✓
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="bg-[#F7F7F7] rounded-lg p-6">
                  <h4 className="text-base font-medium mb-4">Device Status</h4>
                  {renderDeviceStatus()}
                </div>
              </div>
            </div>
          )}
          
          {calibrationStep === 2 && (
            <div className="fade-in">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-primary/20 rounded-full mb-4">
                  <Ruler className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-medium mb-2">Set Screen Distance</h4>
                <p className="text-neutral-600 max-w-lg mx-auto">
                  Measure the distance from the center of your hitting area to the screen or net.
                </p>
              </div>
              
              <div className="max-w-md mx-auto mb-8">
                <div className="aspect-video bg-neutral-200 rounded-lg mb-4 flex items-center justify-center">
                  <Video className="h-12 w-12 text-neutral-400" />
                  <span className="text-sm text-neutral-500 ml-2">Measure from tee location to screen face</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-2">
                  <Ruler className="h-5 w-5 text-neutral-500" />
                  <div className="flex-1">
                    <Slider
                      defaultValue={[10]}
                      max={15}
                      min={6}
                      step={0.1}
                      value={[screenDistance]}
                      onValueChange={handleScreenDistanceChange}
                    />
                  </div>
                  <div className="w-16 text-center font-medium">
                    {screenDistance.toFixed(1)} ft
                  </div>
                </div>
                <p className="text-sm text-neutral-600 text-center">
                  Distance set to {screenDistance.toFixed(1)} ft. You're almost there!
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => {
                    setCalibrationStep(3);
                    handleFinalCalibration();
                  }}
                  className="bg-[#CD1B32] hover:bg-[#DD393A] text-white"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {calibrationStep === 3 && (
            <div className="fade-in">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-primary/20 rounded-full mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-medium mb-2">Final Calibration</h4>
                <p className="text-neutral-600 max-w-lg mx-auto">
                  The system is applying your settings and optimizing for your environment.
                </p>
              </div>
              
              <div className="max-w-md mx-auto mb-8">
                <div className="aspect-video bg-neutral-200 rounded-lg mb-4 flex items-center justify-center">
                  <Video className="h-12 w-12 text-neutral-400" />
                  <span className="text-sm text-neutral-500 ml-2">Hitting Zone View</span>
                </div>
                
                {calibrating ? (
                  <div className="space-y-4">
                    <Progress value={calibrationProgress} className="h-2" />
                    <p className="text-sm text-neutral-600 text-center">
                      Calibrating... {calibrationProgress}%
                    </p>
                    
                    {environmentIssues.length > 0 && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Environment Issues Detected</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc list-inside">
                            {environmentIssues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert className="bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertTitle>Calibration Complete</AlertTitle>
                      <AlertDescription>
                        Let's test a few shots to validate the calibration.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="ghost" 
                        onClick={completeCalibration}
                        className="text-neutral-600"
                      >
                        Skip for Now
                      </Button>
                      
                      <Button 
                        onClick={() => setCalibrationStep(4)}
                        className="bg-[#CD1B32] hover:bg-[#DD393A] text-white"
                      >
                        Take Test Shots
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {calibrationStep === 4 && (
            <div className="fade-in">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-primary/20 rounded-full mb-4">
                  <Club className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-medium mb-2">Test Shots</h4>
                <p className="text-neutral-600 max-w-lg mx-auto">
                  Hit 2-3 shots to validate the calibration accuracy.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-1/2">
                  <div className="bg-neutral-100 rounded-lg p-6 h-64 flex items-center justify-center relative">
                    <svg width="280" height="180" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
                      {/* Ceiling with device */}
                      <rect x="40" y="20" width="200" height="5" fill="#d1d5db" />
                      <rect x="120" y="25" width="40" height="15" fill="#CD1B32" rx="3" />
                      
                      {/* Detection cone */}
                      <path 
                        d="M120,40 L80,140 L200,140 L160,40 Z" 
                        fill="#CD1B32" 
                        fillOpacity="0.1" 
                        stroke="#CD1B32" 
                        strokeWidth="1" 
                        strokeDasharray={calibrating ? "none" : "5,5"}
                      />
                      
                      {/* Ball trajectory */}
                      {calibrating && testShots.length > 0 && (
                        <motion.path 
                          d="M140,140 Q150,100 180,80" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        />
                      )}
                      
                      {/* Ball */}
                      {calibrating && (
                        <motion.circle 
                          cx="140" 
                          cy="140" 
                          r="5" 
                          fill="white" 
                          stroke="#d1d5db"
                          initial={{ cx: 140, cy: 140 }}
                          animate={{ cx: 180, cy: 80 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      )}
                    </svg>
                    
                    {calibrating && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="flex flex-col items-center">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="flex items-center justify-center h-16 w-16 mb-2"
                          >
                            <Maximize className="h-16 w-16 text-primary/40" />
                          </motion.div>
                          <p className="text-sm font-medium text-primary animate-pulse">
                            Detecting shot {testShots.length + 1}...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h4 className="font-medium mb-3">Test Shots: {testShots.length}/3</h4>
                  
                  {testShots.length === 0 ? (
                    <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-lg p-6 text-center">
                      <Club className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                      <p className="text-neutral-600">
                        No shots detected yet. Hit your first test shot.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {testShots.map((shot, index) => (
                        <motion.div
                          key={shot.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white border border-neutral-200 rounded-lg p-3"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium text-sm">Shot {index + 1}</h5>
                            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                              Detected
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-center text-xs">
                            <div>
                              <div className="font-medium text-primary">{shot.clubSpeed}</div>
                              <div className="text-neutral-600">Club Speed (mph)</div>
                            </div>
                            <div>
                              <div className="font-medium text-primary">{shot.ballSpeed}</div>
                              <div className="text-neutral-600">Ball Speed (mph)</div>
                            </div>
                            <div>
                              <div className="font-medium text-primary">{shot.launchAngle}°</div>
                              <div className="text-neutral-600">Launch Angle</div>
                            </div>
                            <div>
                              <div className="font-medium text-primary">{shot.distance}</div>
                              <div className="text-neutral-600">Distance (yds)</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4">
                    {calibrating ? (
                      <div className="text-center text-sm text-neutral-600">
                        {testShots.length < 3 ? (
                          <p>Keep taking shots until you complete 3 test shots...</p>
                        ) : (
                          <p>Analyzing shots...</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {testShots.length > 0 && testShots.length < 3 && (
                          <Button 
                            onClick={startCalibration} 
                            className="w-full"
                            variant="outline"
                          >
                            Continue Calibration ({3 - testShots.length} more shots)
                          </Button>
                        )}
                        
                        {testShots.length === 3 && (
                          <div className="space-y-3">
                            <Alert className="bg-green-50 border-green-200">
                              <Check className="h-4 w-4 text-green-600" />
                              <AlertTitle>Launch angle and direction look accurate</AlertTitle>
                              <AlertDescription>
                                You're calibrated and ready to go!
                              </AlertDescription>
                            </Alert>
                            
                            <div className="flex justify-between">
                              <Button 
                                variant="outline" 
                                onClick={() => {
                                  setTestShots([]);
                                  setCalibrationStep(1);
                                }}
                                className="flex items-center"
                              >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Recalibrate
                              </Button>
                              
                              <Button 
                                onClick={completeCalibration} 
                                className="bg-primary hover:bg-primary/90 text-white flex items-center"
                              >
                                Accept Calibration
                                <Check className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          onClick={completeCalibration}
                          className="text-neutral-600"
                        >
                          Skip for Now
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous Step
        </Button>
        <Button
          onClick={goToNextStep}
          className="bg-[#CD1B32] hover:bg-[#DD393A] text-white flex items-center"
          disabled={calibrationStep !== 4}
        >
          Continue to Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
