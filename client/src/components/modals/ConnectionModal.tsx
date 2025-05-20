import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wifi, X, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface ConnectionModalProps {
  onClose: () => void;
  onComplete: () => void;
  deviceName: string;
}

export function ConnectionModal({ onClose, onComplete, deviceName }: ConnectionModalProps) {
  const [progress, setProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'success' | 'failed'>('connecting');
  
  useEffect(() => {
    // Simulate connection process
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = Math.min(oldProgress + 2, 100);
        
        if (newProgress === 100) {
          clearInterval(timer);
          setConnectionStatus('success');
          
          // Auto-complete after showing success for a moment
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
        
        return newProgress;
      });
    }, 50);
    
    return () => {
      clearInterval(timer);
    };
  }, [onComplete]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      onClick={(e) => {
        // Only allow closing on backdrop click if not in the middle of connecting
        if (e.target === e.currentTarget && connectionStatus !== 'connecting') {
          onClose();
        }
      }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {connectionStatus !== 'connecting' && (
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        <div className="text-center mb-6">
          {connectionStatus === 'connecting' && (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Wifi className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Binding Device</h3>
              <p className="text-neutral-600 text-sm">Binding device...</p>
            </>
          )}
          
          {connectionStatus === 'success' && (
            <>
              <div className="w-16 h-16 rounded-full bg-[#DCF0A4]/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-[#BCD879] h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Connection Successful</h3>
              <p className="text-neutral-600 text-sm">Connected to {deviceName}</p>
            </>
          )}
          
          {connectionStatus === 'failed' && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-red-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Connection Failed</h3>
              <p className="text-neutral-600 text-sm">Could not connect to {deviceName}</p>
            </>
          )}
        </div>
        
        {connectionStatus === 'connecting' && (
          <>
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="bg-neutral-100 p-4 rounded-lg mb-6">
              <h4 className="font-medium flex items-center mb-2">
                <AlertCircle className="h-4 w-4 text-primary mr-1" />
                <span>Make sure:</span>
              </h4>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Device is powered on</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Ethernet cable is connected</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Your phone/computer is on the same network</span>
                </li>
              </ul>
            </div>
            
            <Button 
              id="cancel-connection" 
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
          </>
        )}
        
        {connectionStatus === 'success' && (
          <div className="space-y-4">
            <div className="bg-[#DCF0A4]/20 p-4 rounded-lg border border-[#BCD879] text-sm text-[#5C616B]">
              Your device is now connected and ready to use. You can proceed to the next step of the setup process.
            </div>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white"
              onClick={onComplete}
            >
              Continue
            </Button>
          </div>
        )}
        
        {connectionStatus === 'failed' && (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-sm text-red-800">
              <p className="font-medium mb-1">Troubleshooting tips:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Check power and network connections</li>
                <li>Ensure your device is on the same network</li>
                <li>Restart your device and try again</li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="w-full"
                onClick={onClose}
              >
                Cancel
              </Button>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                onClick={() => {
                  // Reset and try again
                  setProgress(0);
                  setConnectionStatus('connecting');
                }}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
