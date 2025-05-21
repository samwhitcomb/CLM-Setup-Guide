import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, UserPlus } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { SubscriptionModal } from "@/components/modals/SubscriptionModal";
import { motion } from "framer-motion";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  receiveUpdates: z.boolean().optional(),
});

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export function Step4Account() {
  const { goToNextStep } = useOnboarding();
  const { registerMutation, loginMutation, user, isLoading } = useAuth();
  const [accountCreated, setAccountCreated] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      receiveUpdates: false,
    },
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onRegisterSubmit = async (data: z.infer<typeof registerSchema>) => {
    await registerMutation(data);
    setAccountCreated(true);
    setShowSubscriptionModal(true);
  };

  const onLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
    await loginMutation({ ...data, fullName: "" });
    setAccountCreated(true);
    setShowSubscriptionModal(true);
  };

  const handleContinue = () => {
    if (accountCreated || user) {
      goToNextStep();
    } else {
      // Show login/register form
    }
  };

  const handleSubscriptionComplete = () => {
    setShowSubscriptionModal(false);
    goToNextStep();
  };

  if (accountCreated || user) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Account Setup</h3>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 4 of 9</span>
        </div>
        
        <div className="flex flex-col items-center justify-center p-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4"
          >
            <Check className="h-10 w-10 text-primary" />
          </motion.div>
          
          <h3 className="text-xl font-medium text-center mb-2">Account Setup Complete</h3>
          <p className="text-neutral-600 text-center mb-6">
            Your account has been successfully set up. You can now proceed to the next step.
          </p>
          
          <Button
            onClick={handleContinue}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Continue to Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {showSubscriptionModal && (
          <SubscriptionModal
            onClose={() => setShowSubscriptionModal(false)}
            onComplete={handleSubscriptionComplete}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Account Setup</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 4 of 9</span>
      </div>
      
      <p className="text-neutral-600 text-sm mb-6">
        Create an account to enable cloud syncing, personalized settings, and access to all features of your Rapsodo CLM PRO.
      </p>

      <div className="md:w-4/5 mx-auto">
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="register">Create Account</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  <span>Create Your Account</span>
                </CardTitle>
                <CardDescription>
                  Get started with your Rapsodo GOLF device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
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
                      control={registerForm.control}
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
                      control={registerForm.control}
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
                      control={registerForm.control}
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
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-neutral-600">
                        I agree to the <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="updates"
                        className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
                        onChange={(e) => registerForm.setValue('receiveUpdates', e.target.checked)}
                      />
                      <label htmlFor="updates" className="text-sm text-neutral-600">
                        Send me product updates and news
                      </label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white mt-4"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Log In</CardTitle>
                <CardDescription>
                  Access your existing Rapsodo GOLF account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white mt-4"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging In..." : "Log In"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-neutral-600 w-full text-center">
                  <a href="#" className="text-primary hover:underline">Forgot password?</a>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
