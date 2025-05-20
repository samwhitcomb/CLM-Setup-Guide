import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, X } from "lucide-react";
import { SubscriptionModal } from "./SubscriptionModal";
import { motion } from "framer-motion";

interface AccountModalProps {
  onClose: () => void;
  onComplete: () => void;
}

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name is required"),
  receiveUpdates: z.boolean().optional(),
});

export function AccountModal({ onClose, onComplete }: AccountModalProps) {
  const { registerMutation } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      receiveUpdates: false,
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    if (!termsAccepted) {
      return;
    }
    
    registerMutation.mutate(data, {
      onSuccess: () => {
        // Show subscription modal after account creation
        setShowSubscriptionModal(true);
      },
    });
  };

  const handleSubscriptionComplete = () => {
    setShowSubscriptionModal(false);
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

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      onClick={onClose}
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
            <UserPlus className="text-primary h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold">Create Your Account</h3>
          <p className="text-neutral-600 text-sm">Get started with your CLM PRO device</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Choose a username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                />
                <label htmlFor="terms" className="text-sm text-neutral-600">
                  I agree to the <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="receiveUpdates"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          id="updates"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <label htmlFor="updates" className="text-sm text-neutral-600">
                        Send me product updates and news
                      </label>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={registerMutation.isPending || !termsAccepted}
            >
              {registerMutation.isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-4 text-center">
          <span className="text-sm text-neutral-600">Already have an account? <a href="#" className="text-primary font-medium">Log in</a></span>
        </div>
      </motion.div>
      
      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onComplete={handleSubscriptionComplete}
        />
      )}
    </motion.div>
  );
}
