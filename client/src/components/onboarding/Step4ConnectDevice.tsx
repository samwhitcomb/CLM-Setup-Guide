import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function Step4ConnectDevice() {
  const { goToNextStep } = useOnboarding();
  const [roomSize, setRoomSize] = useState(200);
  const [ceilingHeight, setCeilingHeight] = useState(8);
  const [wallDistance, setWallDistance] = useState(2);

  const handleContinue = () => {
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Room Size</h3>
        <div className="space-y-2">
          <label className="text-sm text-neutral-600">
            Room Size (sq ft): {roomSize}
          </label>
          <Slider
            value={[roomSize]}
            onValueChange={(value) => setRoomSize(value[0])}
            min={100}
            max={1000}
            step={10}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Ceiling Height</h3>
        <div className="space-y-2">
          <label className="text-sm text-neutral-600">
            Height (ft): {ceilingHeight}
          </label>
          <Slider
            value={[ceilingHeight]}
            onValueChange={(value) => setCeilingHeight(value[0])}
            min={6}
            max={12}
            step={0.5}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Wall Distance</h3>
        <div className="space-y-2">
          <label className="text-sm text-neutral-600">
            Distance (ft): {wallDistance}
          </label>
          <Slider
            value={[wallDistance]}
            onValueChange={(value) => setWallDistance(value[0])}
            min={1}
            max={5}
            step={0.5}
          />
        </div>
      </div>

      <Button
        onClick={handleContinue}
        className="w-full bg-[#CD1B32] hover:bg-[#CD1B32]/90"
      >
        Continue to Next Step
      </Button>
    </div>
  );
} 