import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { 
  Input 
} from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  ArrowRight, 
  Check, 
  LinkIcon, 
  User, 
  CreditCard, 
  CalendarClock, 
  Gift, 
  X, 
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionModal } from "@/components/modals/SubscriptionModal";

const bindDeviceSchema = z.object({
  deviceNickname: z.string().min(1, "Device nickname is required"),
  location: z.string().optional(),
});

export function Step6BindDevice() {
  const { goToNextStep, goToPreviousStep } = useOnboarding();
  const { toast } = useToast();
  const { user } = useAuth();
  const [binding, setBinding] = useState(false);
  const [deviceBound, setDeviceBound] = useState(false);
  const [trialActivated, setTrialActivated] = useState(false);
  const [addPaymentMethod, setAddPaymentMethod] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const form = useForm<z.infer<typeof bindDeviceSchema>>({
    resolver: zodResolver(bindDeviceSchema),
    defaultValues: {
      deviceNickname: "My CLM PRO",
      location: "",
    },
  });

  const onSubmit = (data: z.infer<typeof bindDeviceSchema>) => {
    setBinding(true);
    
    // Update device nickname with form data
    setTimeout(() => {
      setBinding(false);
      
      // Show trial activation notice first instead of immediately binding
      setTrialActivated(true);
      
      toast({
        title: "Device verification successful",
        description: `Your device "${data.deviceNickname}" is ready to be activated with a trial subscription.`,
      });
    }, 1500);
  };
  
  const handleActivateTrial = () => {
    if (addPaymentMethod) {
      // If user wants to add payment info, show subscription modal
      setShowSubscriptionModal(true);
    } else {
      // Otherwise directly activate the trial without payment info
      toast({
        title: "Free trial activated",
        description: "Your 1-month free trial has been activated. No credit card required.",
      });
      
      // Simulate finalizing device binding
      setTimeout(() => {
        setDeviceBound(true);
      }, 1000);
    }
  };
  
  const handleSubscriptionComplete = () => {
    setShowSubscriptionModal(false);
    
    toast({
      title: "Payment method added",
      description: "Your payment method has been saved and your trial is now active.",
    });
    
    // Finalize device binding
    setDeviceBound(true);
  };

  // Get display name for the account
  const accountName = user?.fullName || user?.username || 'Unknown User';
  const accountEmail = user?.email || 'No email available';
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Bind Device</h3>
        <span className="text-xs bg-[#CD1B32]/20 text-[#CD1B32] px-2 py-1 rounded">Step 6 of 8</span>
      </div>
      
      {deviceBound ? (
        <div className="flex flex-col items-center justify-center p-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4"
          >
            <Check className="h-10 w-10 text-primary" />
          </motion.div>
          
          <h3 className="text-xl font-medium text-center mb-2">Device Bound Successfully</h3>
          <p className="text-neutral-600 text-center mb-6">
            Your device has been securely linked to your account. You can now proceed to the next step.
          </p>
          
          <div className="bg-neutral-100 p-6 rounded-lg max-w-md w-full mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">{form.getValues().deviceNickname}</h4>
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">Active</span>
            </div>
            <div className="space-y-3 text-sm text-neutral-600">
              <div className="flex justify-between">
                <span>Device ID:</span>
                <span className="font-mono">CLM-A7F9</span>
              </div>
              {form.getValues().location && (
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{form.getValues().location}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-primary">Connected</span>
              </div>
              <div className="flex justify-between">
                <span>Owner:</span>
                <span className="font-medium">{accountName}</span>
              </div>
              <div className="flex justify-between">
                <span>Account Email:</span>
                <span className="text-xs overflow-hidden text-ellipsis">{accountEmail}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span>Subscription:</span>
                <div className="flex items-center">
                  <Gift className="w-3 h-3 mr-1 text-primary" />
                  <span className="text-primary">Trial (1 month)</span>
                </div>
              </div>
            </div>
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
            <Button
              onClick={goToNextStep}
              className="bg-[#CD1B32] hover:bg-[#DD393A] text-white flex items-center"
              disabled={!deviceBound}
            >
              Continue to Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : trialActivated ? (
        <div className="fade-in">
          <div className="mb-6">
            <div className="flex items-center">
              <CalendarClock className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-medium">Activate Your Free Trial</h3>
            </div>
            <p className="text-neutral-700 mt-2">
              Your device is ready to be bound to your account. Activate your 1-month free trial to continue.
            </p>
          </div>
          
          <div className="bg-neutral-50 rounded-lg border p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Device info */}
              <div className="w-full md:w-1/2">
                <h4 className="font-medium mb-3 flex items-center">
                  <LinkIcon className="h-4 w-4 mr-2 text-neutral-600" />
                  Device Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Device ID:</span>
                    <span className="font-mono">CLM-A7F9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Nickname:</span>
                    <span>{form.getValues().deviceNickname}</span>
                  </div>
                  {form.getValues().location && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Location:</span>
                      <span>{form.getValues().location}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 mt-1">
                    <span className="text-neutral-600">Owner:</span>
                    <span className="font-medium">{accountName}</span>
                  </div>
                </div>
              </div>
              
              {/* Trial info */}
              <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                <h4 className="font-medium mb-3 flex items-center">
                  <Gift className="h-4 w-4 mr-2 text-primary" />
                  Trial Information
                </h4>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <CalendarClock className="h-4 w-4 mr-2 text-primary" />
                    <span>1-month free trial</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Full access to all features</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="mr-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Add Payment Method (Optional)</h4>
                <p className="text-sm text-neutral-600 mb-3">
                  Add your payment method now to enable auto-renewal after your trial ends. You won't be charged until your trial expires.
                </p>
                <div className="flex items-center">
                  <Checkbox 
                    id="add-payment"
                    checked={addPaymentMethod}
                    onCheckedChange={(checked) => setAddPaymentMethod(!!checked)}
                    className="mr-2"
                  />
                  <label htmlFor="add-payment" className="text-sm cursor-pointer">
                    Add payment method and enable auto-renewal
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              className="mr-3"
              onClick={() => setTrialActivated(false)}
            >
              Back
            </Button>
            <Button 
              onClick={handleActivateTrial}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {addPaymentMethod ? "Continue to Payment" : "Activate Trial (No Credit Card)"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {showSubscriptionModal && (
            <SubscriptionModal 
              onClose={() => setShowSubscriptionModal(false)} 
              onComplete={handleSubscriptionComplete}
            />
          )}
        </div>
      ) : (
        <>
          <p className="text-neutral-600 max-w-lg ml-4">
            Now let's secure your device to your account. This helps ensure that only you can access and control your CLM PRO.
          </p>
          
          {/* Account details card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="text-blue-800 font-medium text-sm flex items-center mb-2">
              <User className="h-4 w-4 mr-2" />
              You're binding this device to:
            </h4>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-blue-900">{accountName}</div>
                <div className="text-xs text-blue-700">{accountEmail}</div>
              </div>
              <div className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                Active Account
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/2">
              <div className="bg-[#F7F7F7] p-6 rounded-lg h-full">
                <div className="flex items-center justify-center h-full">
                  <svg 
                    width="240" 
                    height="240" 
                    viewBox="0 0 240 240" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="opacity-90"
                  >
                    {/* User icon */}
                    <circle cx="90" cy="120" r="40" fill="#E4E5E9" />
                    <circle cx="90" cy="105" r="15" fill="#8D94A2" />
                    <path d="M65,140 C65,125 80,120 90,120 C100,120 115,125 115,140" fill="#8D94A2" />
                    
                    {/* User name */}
                    <text x="90" y="70" fontSize="12" textAnchor="middle" fill="#323438" fontWeight="bold">{accountName}</text>
                    
                    {/* Device icon */}
                    <rect x="150" y="100" width="40" height="40" rx="5" fill="#CD1B32" />
                    <circle cx="170" cy="120" r="10" fill="#fff" fillOpacity="0.6" />
                    
                    {/* Connection line */}
                    <path 
                      d="M115,120 L150,120" 
                      stroke={binding ? "#CD1B32" : "#8D94A2"} 
                      strokeWidth="3" 
                      strokeDasharray={binding ? "none" : "5,5"} 
                      className={binding ? "animate-pulse" : ""}
                    />
                    
                    {/* Lock icon */}
                    <circle 
                      cx="132" 
                      cy="120" 
                      r="15" 
                      fill={binding ? "#CD1B32" : "#F7F7F7"} 
                      stroke={binding ? "#DD393A" : "#D3D5D9"} 
                      strokeWidth="2"
                      className={binding ? "animate-pulse" : ""}
                    />
                    <rect 
                      x="126" 
                      y="117" 
                      width="12" 
                      height="10" 
                      rx="2" 
                      fill={binding ? "#DD393A" : "#8D94A2"} 
                    />
                    <rect x="129" y="112" width="6" height="5" rx="1" fill={binding ? "#DD393A" : "#8D94A2"} />
                    
                    {/* Text labels */}
                    <text x="90" y="170" fontSize="14" textAnchor="middle" fill="#5C616B">Your Account</text>
                    <text x="170" y="170" fontSize="14" textAnchor="middle" fill="#5C616B">Rapsodo GOLF</text>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <div className="flex items-start">
                      <LinkIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-sm text-blue-800 mb-1">Device Information</h5>
                        <p className="text-xs text-blue-700">
                          Your device (CLM-A7F9) is ready to be bound to your account. Binding your device helps secure it and ensures only you can access your data.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="deviceNickname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device Nickname</FormLabel>
                        <FormControl>
                          <Input placeholder="${accountName}'s CLM" {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a name for your device to identify it easily
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Home Office, Garage, etc." {...field} />
                        </FormControl>
                        <FormDescription>
                          Add a location to help identify where this device is installed
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-[#CD1B32] hover:bg-[#DD393A] text-white w-full"
                    disabled={binding}
                  >
                    {binding ? `Binding to ${accountName}'s Account...` : `Bind to ${accountName}'s Account`}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
