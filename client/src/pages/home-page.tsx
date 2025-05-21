import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Club, 
  Settings, 
  BarChart, 
  Activity, 
  RotateCcw,
  Clock,
  Trophy,
  Calendar
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useOnboarding } from "@/lib/onboarding-context";

export default function HomePage() {
  const { user } = useAuth();
  const { resetOnboarding } = useOnboarding();
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Assume a first-time user should be directed to the onboarding flow
    // You could check if they've completed onboarding by checking the current step
    if (user && (user.currentStep ?? 0) < 9) {
      navigate("/onboarding");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.fullName || "Golfer"}!</h1>
            <p className="text-neutral-600">Your CLM PRO device is ready to help improve your game.</p>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Club className="h-5 w-5" />
                  Quick Start
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Begin a new practice session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">
                  Start tracking your shots immediately with default settings.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full text-primary">
                  Start Session
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Analysis Dashboard
                </CardTitle>
                <CardDescription>
                  View your performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">
                  Check your stats, shot history, and improvement over time.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Stats
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Device Settings
                </CardTitle>
                <CardDescription>
                  Configure your launch monitor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">
                  Adjust calibration, preferences, and connectivity options.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    if (typeof resetOnboarding === 'function') {
                      resetOnboarding();
                      navigate("/onboarding");
                    } else {
                      console.error("resetOnboarding is not a function", resetOnboarding);
                      // Still navigate even if reset fails
                      navigate("/onboarding");
                    }
                  }}
                >
                  Manage Device
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Recent Activity</h2>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>
            
            {/* If no activity yet */}
            <Card className="bg-neutral-50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12">
                <Activity className="h-12 w-12 text-neutral-400 mb-4" />
                <h3 className="text-xl font-medium text-neutral-700 mb-2">No Activity Yet</h3>
                <p className="text-neutral-600 text-center mb-6 max-w-md">
                  You haven't recorded any shots with your CLM PRO device. 
                  Start a practice session to begin tracking your performance.
                </p>
                <Button>Start First Session</Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Training Programs and Subscription Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Training Programs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <RotateCcw className="h-5 w-5 text-primary mr-2" />
                      Swing Consistency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600 mb-2">
                      Build a repeatable swing with targeted drills.
                    </p>
                    <div className="flex items-center text-xs text-neutral-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>10 sessions • 14 days</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Program
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="h-5 w-5 text-primary mr-2" />
                      Distance Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600 mb-2">
                      Add yards to your drives and iron shots.
                    </p>
                    <div className="flex items-center text-xs text-neutral-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>8 sessions • 21 days</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Program
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Subscription</h2>
              <Card className="bg-neutral-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Premium Trial</CardTitle>
                  <CardDescription>
                    Your trial ends in {user?.trialActive ? 30 : 0} days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-3 rounded-lg border mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Status</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Next Billing</span>
                      <span className="text-sm">
                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <h4 className="text-sm font-medium flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-1 text-primary" />
                      <span>Upcoming</span>
                    </h4>
                    <p className="text-xs text-neutral-600">
                      {user?.paymentAdded 
                        ? "Your subscription will automatically continue at $24.99/month after the trial."
                        : "Add payment details to continue your subscription after the trial period ends."}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">
                    {user?.paymentAdded ? "Manage Subscription" : "Add Payment Method"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
