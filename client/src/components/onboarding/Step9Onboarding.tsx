import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Check, 
  ArrowRight, 
  Settings, 
  Radio, 
  BarChart, 
  Gamepad2, 
  Trophy, 
  Users, 
  CreditCard,
  FolderOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export function Step9Onboarding() {
  const { resetOnboarding } = useOnboarding();
  const { user } = useAuth();
  const [setupComplete, setSetupComplete] = useState(false);
  
  const handleComplete = () => {
    setSetupComplete(true);
  };

  const features = [
    {
      title: "Shot Analysis",
      description: "Track club head speed, ball speed, launch angle, and more",
      icon: <BarChart className="h-8 w-8 text-primary" />,
    },
    {
      title: "Simulator Integration",
      description: "Connect with popular golf simulator software",
      icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    },
    {
      title: "Skills Practice",
      description: "Guided drills and practice routines",
      icon: <Trophy className="h-8 w-8 text-primary" />,
    },
    {
      title: "Swing Library",
      description: "Save and review your best shots",
      icon: <FolderOpen className="h-8 w-8 text-primary" />,
    },
    {
      title: "Multi-Player",
      description: "Create profiles for friends and family",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Device Settings",
      description: "Customize your CLM PRO preferences",
      icon: <Settings className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Final Setup</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 8 of 8</span>
      </div>
      
      {setupComplete ? (
        <div className="flex flex-col items-center justify-center p-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6"
          >
            <Check className="h-12 w-12 text-primary" />
          </motion.div>
          
          <h3 className="text-2xl font-medium text-center mb-2">Setup Complete!</h3>
          <p className="text-neutral-600 text-center max-w-md mb-8">
            Congratulations! Your Rapsodo CLM PRO is now set up and ready to use.
            You can start analyzing your golf swing right away.
          </p>
          
          <div className="bg-neutral-100 p-6 rounded-lg max-w-md w-full mb-8">
            <h4 className="font-medium mb-4 flex items-center">
              <CreditCard className="h-5 w-5 text-primary mr-2" />
              Subscription Status
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Plan:</span>
                <span className="font-medium">Premium (Trial)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Status:</span>
                <span className="text-primary font-medium">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Trial ends:</span>
                <span className="font-medium">
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
              {!user?.paymentAdded && (
                <div className="text-xs text-amber-600 mt-2 bg-amber-50 p-2 rounded">
                  Payment information required before trial ends to continue service.
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white min-w-[180px]"
                onClick={resetOnboarding}
              >
                Start Using App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Button variant="outline">
              View Tutorial Videos
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-neutral-600 max-w-lg mx-auto">
            Let's get you familiar with the key features of your Rapsodo CLM PRO and prepare for your first use.
          </p>
          
          <Tabs defaultValue="features" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="settings">Preferences</TabsTrigger>
              <TabsTrigger value="start">Quick Start</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-neutral-50 p-4 rounded-lg flex"
                  >
                    <div className="mr-4 bg-white p-2 rounded-lg shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h5 className="font-medium text-base mb-1">{feature.title}</h5>
                      <p className="text-sm text-neutral-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-primary" />
                    User Preferences
                  </CardTitle>
                  <CardDescription>
                    Set your defaults for a personalized experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Measurement Units</h5>
                        <p className="text-sm text-neutral-600">Choose your preferred units</p>
                      </div>
                      <div className="flex border rounded-md overflow-hidden">
                        <button className="px-3 py-1 bg-primary text-white text-sm font-medium">US</button>
                        <button className="px-3 py-1 bg-white text-neutral-700 text-sm">Metric</button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Default Club</h5>
                        <p className="text-sm text-neutral-600">Select your most used club</p>
                      </div>
                      <select className="bg-white border rounded p-1 text-sm">
                        <option>Driver</option>
                        <option>Iron (7)</option>
                        <option>Wedge (PW)</option>
                        <option>Putter</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Audio Feedback</h5>
                        <p className="text-sm text-neutral-600">Shot detection sounds</p>
                      </div>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Automatic Recording</h5>
                        <p className="text-sm text-neutral-600">Save all detected shots</p>
                      </div>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="start">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Radio className="h-5 w-5 mr-2 text-primary" />
                    Quick Start Guide
                  </CardTitle>
                  <CardDescription>
                    Follow these steps to get started with your first session
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex p-3 border rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-primary font-medium">1</span>
                      </div>
                      <div>
                        <h5 className="font-medium">Position Yourself</h5>
                        <p className="text-sm text-neutral-600">
                          Stand on your hitting mat directly under the CLM PRO, with your ball in the detection zone.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex p-3 border rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-primary font-medium">2</span>
                      </div>
                      <div>
                        <h5 className="font-medium">Choose Session Type</h5>
                        <p className="text-sm text-neutral-600">
                          Select between Practice, Simulator, or Skills Challenge from the main menu.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex p-3 border rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-primary font-medium">3</span>
                      </div>
                      <div>
                        <h5 className="font-medium">Take Your Shot</h5>
                        <p className="text-sm text-neutral-600">
                          Hit your ball as normal. The system will automatically detect and analyze your swing.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex p-3 border rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-primary font-medium">4</span>
                      </div>
                      <div>
                        <h5 className="font-medium">View Results</h5>
                        <p className="text-sm text-neutral-600">
                          Review your shot data including club head speed, ball speed, launch angle, and projected distance.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 p-4 rounded-lg mt-6">
                      <h5 className="font-medium flex items-center mb-2">
                        <Radio className="h-4 w-4 text-primary mr-2" />
                        Pro Tip
                      </h5>
                      <p className="text-sm text-neutral-700">
                        Start with a few practice swings to get comfortable with the system 
                        before diving into a full session or competition.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Watch Tutorial Video
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleComplete} 
              className="bg-primary hover:bg-primary/90 text-white flex items-center"
            >
              Complete Setup
              <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
