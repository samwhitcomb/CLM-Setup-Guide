import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { ConnectionModal } from "./ConnectionModal";
import { useAuth } from "@/hooks/use-auth";

interface SubscriptionModalProps {
  onClose: () => void;
  onComplete: () => void;
}

export function SubscriptionModal({ onClose, onComplete }: SubscriptionModalProps) {
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const { user } = useAuth();
  
  const handleAddPayment = () => {
    setShowConnectionModal(true);
  };
  
  const handleSkipPayment = () => {
    setShowConnectionModal(true);
  };
  
  const handleConnectionComplete = () => {
    setShowConnectionModal(false);
    onComplete();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const premiumFeatures = [
    "Advanced shot analytics and metrics",
    "Cloud storage for all your sessions",
    "Integration with golf simulator software",
    "Personalized improvement recommendations",
  ];

  const trialEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const formattedEndDate = trialEndDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      onClick={(e) => {
        // Only close if clicking backdrop, not modal content
        if (e.target === e.currentTarget) onClose();
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
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg 
              className="text-primary h-8 w-8" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm4 14a2 2 0 1 0 3.995.095L10 18H6zm12 0a2 2 0 1 0 3.995.095L22 18h-4z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold">(New Bowser Window) Start Your Free Trial</h3>
          <p className="text-neutral-600 text-sm">Get 1 month free access to all premium features</p>
        </div>
        
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-primary mb-2">Premium Features Include:</h4>
          <ul className="space-y-2">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4 mb-6">
          <Button 
            id="add-payment" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center"
            onClick={handleAddPayment}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Add Payment Details
          </Button>
          
          <Button 
            id="skip-payment" 
            variant="outline"
            className="w-full"
            onClick={handleSkipPayment}
          >
            Skip for Now
          </Button>
        </div>
        
        <p className="text-xs text-neutral-500 text-center">
          No charge until your trial ends on <span className="font-medium">{formattedEndDate}</span>.<br/>
          Cancel anytime in Settings before then.
        </p>
      </motion.div>
      
      {showConnectionModal && (
        <ConnectionModal
          onClose={() => setShowConnectionModal(false)}
          onComplete={handleConnectionComplete}
          deviceName="CLM-A7F9"
        />
      )}
    </motion.div>
  );
}
