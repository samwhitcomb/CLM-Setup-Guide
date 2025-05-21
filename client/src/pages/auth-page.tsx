import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Club, UserPlus, LogIn } from "lucide-react";

// Mock data for auto-fill
const mockLoginData = {
  username: "demo_user",
  password: "demo123",
};

const mockRegisterData = {
  username: "new_user",
  email: "demo@example.com",
  password: "demo123",
  fullName: "Demo User",
  receiveUpdates: true,
};

// Validation schemas
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(1, "Full name is required"),
  receiveUpdates: z.boolean(),
});

export default function AuthPage() {
  const { user, loginMutation, registerMutation, isLoading } = useAuth();
  const [, navigate] = useLocation();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

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

  // Auto-fill functions
  const handleLoginFieldClick = (field: keyof typeof mockLoginData) => {
    loginForm.setValue(field, mockLoginData[field]);
  };

  const handleRegisterFieldClick = (field: keyof typeof mockRegisterData) => {
    registerForm.setValue(field, mockRegisterData[field]);
  };

  const onLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
    await loginMutation({ ...data, fullName: "" });
  };

  const onRegisterSubmit = async (data: z.infer<typeof registerSchema>) => {
    await registerMutation(data);
  };

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate("/onboarding");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {/* Left: Auth Form */}
          <div className="w-full md:w-1/2">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-[#CD1B32] data-[state=active]:text-white">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-[#CD1B32] data-[state=active]:text-white">Create Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LogIn className="h-5 w-5 text-[#CD1B32]" />
                      <span>Login to Your Account</span>
                    </CardTitle>
                    <CardDescription>
                      Access your CLM PRO device and settings
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
                                <Input placeholder="Your username" {...field} className="border-[#D3D5D9] focus:border-[#CD1B32]" onClick={() => handleLoginFieldClick("username")} />
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
                                <Input type="password" placeholder="Your password" {...field} className="border-[#D3D5D9] focus:border-[#CD1B32]" onClick={() => handleLoginFieldClick("password")} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="remember" className="border-[#D3D5D9] data-[state=checked]:bg-[#CD1B32] data-[state=checked]:border-[#CD1B32]" />
                            <label htmlFor="remember" className="text-sm text-[#5C616B]">
                              Remember me
                            </label>
                          </div>
                          <a href="#" className="text-sm text-[#CD1B32] hover:text-[#DD393A]">
                            Forgot password?
                          </a>
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full bg-[#CD1B32] hover:bg-[#DD393A] text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? "Logging in..." : "Login"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5 text-[#CD1B32]" />
                      <span>Create Your Account</span>
                    </CardTitle>
                    <CardDescription>
                      Get started with your CLM PRO device
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
                                <Input placeholder="your@email.com" {...field} className="border-[#D3D5D9] focus:border-[#CD1B32]" onClick={() => handleRegisterFieldClick("email")} />
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
                                <Input placeholder="Choose a username" {...field} className="border-[#D3D5D9] focus:border-[#CD1B32]" onClick={() => handleRegisterFieldClick("username")} />
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
                                <Input type="password" placeholder="Create a password" {...field} className="border-[#D3D5D9] focus:border-[#CD1B32]" onClick={() => handleRegisterFieldClick("password")} />
                              </FormControl>
                              <FormDescription>
                                Must be at least 8 characters
                              </FormDescription>
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
                                <Input placeholder="Your name" {...field} className="border-[#D3D5D9] focus:border-[#CD1B32]" onClick={() => handleRegisterFieldClick("fullName")} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" required className="border-[#D3D5D9] data-[state=checked]:bg-[#CD1B32] data-[state=checked]:border-[#CD1B32]" onClick={() => handleRegisterFieldClick("receiveUpdates")} />
                          <label htmlFor="terms" className="text-sm text-[#5C616B]">
                            I agree to the <a href="#" className="text-[#CD1B32] hover:text-[#DD393A]">Terms of Service</a> and <a href="#" className="text-[#CD1B32] hover:text-[#DD393A]">Privacy Policy</a>
                          </label>
                        </div>
                        
                        <FormField
                          control={registerForm.control}
                          name="receiveUpdates"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox 
                                  id="updates"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="border-[#D3D5D9] data-[state=checked]:bg-[#CD1B32] data-[state=checked]:border-[#CD1B32]"
                                />
                              </FormControl>
                              <label htmlFor="updates" className="text-sm text-[#5C616B]">
                                Send me product updates and news
                              </label>
                            </FormItem>
                          )}
                        />
                        
                        <Button
                          type="submit"
                          className="w-full bg-[#CD1B32] hover:bg-[#DD393A] text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right: Hero Image */}
          <div className="w-full md:w-1/2 bg-[#323438] rounded-lg p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-6">
                <Club className="text-[#CD1B32] h-8 w-8 mr-2" />
                <h2 className="text-white text-2xl font-bold">CLM PRO</h2>
              </div>
              
              <h3 className="text-white text-3xl font-bold mb-4">
                Elevate Your Golf Game with Precision Analytics
              </h3>
              
              <p className="text-[#AFB2B8] mb-6">
                The ceiling-mounted launch monitor that provides professional-grade 
                swing analysis, helping you improve your game with every shot.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#5C616B]/50 p-4 rounded-lg">
                  <div className="text-[#CD1B32] text-xl font-bold mb-1">100%</div>
                  <div className="text-white text-sm">Accurate Shot Tracking</div>
                </div>
                <div className="bg-[#5C616B]/50 p-4 rounded-lg">
                  <div className="text-[#CD1B32] text-xl font-bold mb-1">12+</div>
                  <div className="text-white text-sm">Data Points Per Swing</div>
                </div>
                <div className="bg-[#5C616B]/50 p-4 rounded-lg">
                  <div className="text-[#CD1B32] text-xl font-bold mb-1">Easy</div>
                  <div className="text-white text-sm">Setup Process</div>
                </div>
                <div className="bg-[#5C616B]/50 p-4 rounded-lg">
                  <div className="text-[#CD1B32] text-xl font-bold mb-1">Cloud</div>
                  <div className="text-white text-sm">Shot Storage</div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-white text-sm italic">
                    "CLM PRO has completely transformed my practice sessions. The insights 
                    are incredible and my handicap dropped 4 strokes in just one month!"
                  </p>
                  <p className="text-neutral-400 text-xs mt-1">- Michael S., Handicap 8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
