import { useState, useEffect } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Check, AlertCircle, RefreshCw, ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Step7Firmware() {
  const { goToNextStep, goToPreviousStep } = useOnboarding();
  const [checkingForUpdates, setCheckingForUpdates] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [installingUpdate, setInstallingUpdate] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentVersion, setCurrentVersion] = useState("v2.0.5");
  const latestVersion = "v2.1.3";

  useEffect(() => {
    // Simulate checking for updates
    setTimeout(() => {
      setCheckingForUpdates(false);
      setUpdateAvailable(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (installingUpdate) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 2;
          }
          clearInterval(timer);
          return 100;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [installingUpdate]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setInstallingUpdate(false);
        setUpdateComplete(true);
        setCurrentVersion(latestVersion);
      }, 1000);
    }
  }, [progress, latestVersion]);

  const handleInstallUpdate = () => {
    setInstallingUpdate(true);
    setProgress(0);
  };

  const handleSkipUpdate = () => {
    goToNextStep();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Firmware Update</h3>
        <span className="text-xs bg-[#CD1B32]/20 text-[#CD1B32] px-2 py-1 rounded">Step 7 of 8</span>
      </div>
      
      {checkingForUpdates ? (
        <div className="flex flex-col items-center justify-center p-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-12 w-12 mb-4"
          >
            <RefreshCw className="h-12 w-12 text-primary opacity-70" />
          </motion.div>
          <h4 className="font-medium text-lg mb-2">Checking for Updates</h4>
          <p className="text-neutral-600 text-center">
            We're checking to see if your device has the latest firmware.
          </p>
        </div>
      ) : updateComplete ? (
        <div className="flex flex-col items-center justify-center p-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4"
          >
            <Check className="h-10 w-10 text-primary" />
          </motion.div>
          
          <h3 className="text-xl font-medium text-center mb-2">Update Successful</h3>
          <p className="text-neutral-600 text-center mb-6">
            Your device firmware has been updated to {currentVersion}
          </p>
          
          <div className="bg-neutral-100 p-6 rounded-lg max-w-md w-full mb-6">
            <h4 className="font-medium mb-4">What's New in {currentVersion}</h4>
            <ul className="space-y-2 pl-5 list-disc text-sm text-neutral-700">
              <li>Improved shot detection accuracy</li>
              <li>Enhanced club recognition capabilities</li>
              <li>Better performance in varying lighting conditions</li>
              <li>Reduced latency for real-time feedback</li>
              <li>Fixed connectivity issues with certain routers</li>
            </ul>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Step
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleSkipUpdate}
                className="flex items-center"
                disabled={installingUpdate}
              >
                Skip Update
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={goToNextStep}
                className="bg-[#CD1B32] hover:bg-[#DD393A] text-white flex items-center"
                disabled={!updateComplete}
              >
                Continue to Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : installingUpdate ? (
        <div className="p-6">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <Download className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-medium mb-2">Installing Firmware Update</h4>
            <p className="text-neutral-600">
              Please don't disconnect power or Ethernet during the update.
            </p>
          </div>
          
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between mb-2 text-sm">
              <span>{currentVersion}</span>
              <span>{latestVersion}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm">
              <span>{progress}% Complete</span>
              <span>Estimated time: {Math.ceil((100 - progress) / 10)} seconds</span>
            </div>
          </div>
          
          <Alert className="mb-6 max-w-md mx-auto">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Keep the window open and the device powered on until the update is complete.
            </AlertDescription>
          </Alert>
          
          <div className="text-center">
            <p className="text-sm text-neutral-500 animate-pulse">
              Updating firmware... please wait
            </p>
          </div>
        </div>
      ) : updateAvailable ? (
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/2">
            <div className="bg-neutral-100 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Current Firmware</h4>
                <span className="text-sm text-neutral-600">{currentVersion}</span>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-neutral-200 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Status</span>
                  <span className="text-sm text-amber-600">Update Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Installed On</span>
                  <span className="text-sm">May 15, 2023</span>
                </div>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-lg text-sm flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-amber-800 mb-1">Your firmware is out of date</p>
                  <p className="text-amber-700">
                    We recommend updating to the latest version for improved performance and new features.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-black text-lg mb-2">Latest Firmware</h4>
                <span className="text-sm font-medium text-black">{latestVersion}</span>
              </div>
              
              <h5 className="font-medium text-black mb-2">What's New:</h5>
              <ul className="list-disc pl-5 space-y-2 text-base text-black mb-6">
                <li>Improved shot detection accuracy</li>
                <li>Enhanced ball spin calculations</li>
                <li>Better network stability</li>
                <li>Bug fixes and performance improvements</li>
              </ul>
              
              <p className="text-sm text-black mb-4">
                We recommend keeping your device up to date with the latest firmware for optimal performance and features.
              </p>
              
              <Button
                onClick={handleInstallUpdate}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {installingUpdate ? "Updating..." : "Update Firmware"}
              </Button>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-800 mb-2">Before You Update:</h5>
              <ul className="list-disc pl-5 text-sm text-blue-800 space-y-1">
                <li>Update takes approximately 2-3 minutes</li>
                <li>Device will reboot automatically during the process</li>
                <li>Make sure the device stays powered on</li>
                <li>Keep the Ethernet connection stable</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-10">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h4 className="font-medium text-lg mb-2">Your Firmware is Up to Date</h4>
          <p className="text-neutral-600 text-center mb-6">
            Your device is running the latest firmware version ({currentVersion}).
          </p>
          <Button
            onClick={goToNextStep}
            className="bg-[#CD1B32] hover:bg-[#CD1B32]/90 text-white flex items-center"
          >
            Continue to Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
