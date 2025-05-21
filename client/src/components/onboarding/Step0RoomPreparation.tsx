import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function Step0RoomPreparation() {
  const { goToNextStep } = useOnboarding();
  const [roomSize, setRoomSize] = useState(200);
  const [ceilingHeight, setCeilingHeight] = useState(8);
  const [wallDistance, setWallDistance] = useState(2);

  const handleContinue = () => {
    if (typeof goToNextStep === 'function') {
      goToNextStep();
    } else {
      console.error("goToNextStep is not a function", goToNextStep);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium" id="roomSizeHeading">Room Size</h3>
          <div className="space-y-2">
            <label htmlFor="roomSizeSlider" className="text-sm text-neutral-600">
              Room Size (sq ft): {roomSize}
            </label>
            <Slider
              id="roomSizeSlider"
              name="roomSize"
              aria-labelledby="roomSizeHeading"
              value={[roomSize]}
              onValueChange={(value) => setRoomSize(value[0])}
              min={100}
              max={1000}
              step={10}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium" id="ceilingHeightHeading">Ceiling Height</h3>
          <div className="space-y-2">
            <label htmlFor="ceilingHeightSlider" className="text-sm text-neutral-600">
              Height (ft): {ceilingHeight}
            </label>
            <Slider
              id="ceilingHeightSlider"
              name="ceilingHeight"
              aria-labelledby="ceilingHeightHeading"
              value={[ceilingHeight]}
              onValueChange={(value) => setCeilingHeight(value[0])}
              min={6}
              max={12}
              step={0.5}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium" id="wallDistanceHeading">Wall Distance</h3>
          <div className="space-y-2">
            <label htmlFor="wallDistanceSlider" className="text-sm text-neutral-600">
              Distance (ft): {wallDistance}
            </label>
            <Slider
              id="wallDistanceSlider"
              name="wallDistance"
              aria-labelledby="wallDistanceHeading"
              value={[wallDistance]}
              onValueChange={(value) => setWallDistance(value[0])}
              min={1}
              max={5}
              step={0.5}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#CD1B32] hover:bg-[#CD1B32]/90 mt-6"
        >
          Continue to Next Step
        </Button>
      </form>
    </div>
  );
} 