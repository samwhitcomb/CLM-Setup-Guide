import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Monitor, Box, Home } from "lucide-react";
import { Slider } from "@/components/ui/slider";

type Unit = "inches" | "cm" | "feet" | "meters";

export function Step0RoomPreparation() {
  const { goToNextStep } = useOnboarding();
  const [formData, setFormData] = useState({
    screenSize: "",
    enclosureHeight: "",
    enclosureWidth: "",
    enclosureThickness: "",
    ceilingHeight: "",
    ceilingMaterial: ""
  });
  const [units, setUnits] = useState<{
    enclosure: Unit;
    ceiling: Unit;
  }>({
    enclosure: "inches",
    ceiling: "feet"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUnitChange = (type: "enclosure" | "ceiling", unit: Unit) => {
    setUnits(prev => ({
      ...prev,
      [type]: unit
    }));
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== "");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Room Preparation</h3>
        <span className="text-xs bg-[#CD1B32]/20 text-[#CD1B32] px-2 py-1 rounded">Step 1 of 8</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form */}
        <div className="space-y-6">
          {/* Screen Size */}
          <div className="space-y-2">
            <Label htmlFor="screenSize" className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-primary" />
              Screen Size
            </Label>
            <Slider
              value={[parseInt(formData.screenSize) || 55]}
              min={55}
              max={120}
              step={1}
              onValueChange={(value) => handleInputChange("screenSize", value[0].toString())}
            />
            <div className="flex items-center">
              <input
                type="number"
                value={formData.screenSize}
                onChange={(e) => handleInputChange("screenSize", e.target.value)}
                className="w-16 text-sm text-neutral-600 border rounded"
              />
              <span className="ml-2 text-sm text-neutral-600">{formData.screenSize || "required input"}</span>
            </div>
          </div>

          {/* Ceiling Height */}
          <div className="space-y-2">
            <Label htmlFor="ceilingHeight" className="flex items-center gap-2">
              <Home className="h-4 w-4 text-primary" />
              Ceiling Height
            </Label>
            <div className="flex gap-2">
              <Slider
                value={[parseInt(formData.ceilingHeight) || 7]}
                min={7}
                max={20}
                step={0.1}
                onValueChange={(value) => handleInputChange("ceilingHeight", value[0].toString())}
              />
              <input
                type="number"
                value={formData.ceilingHeight}
                onChange={(e) => handleInputChange("ceilingHeight", e.target.value)}
                className="w-16 text-sm text-neutral-600 border rounded"
              />
              <Select
                value={units.ceiling}
                onValueChange={(value: Unit) => handleUnitChange("ceiling", value)}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feet">Feet</SelectItem>
                  <SelectItem value="meters">Meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-neutral-600">
              {formData.ceilingHeight || "required input"} {units.ceiling}
            </div>
          </div>

          {/* Enclosure Dimensions */}
          <div className="space-y-2">
            <Label htmlFor="enclosureHeight" className="flex items-center gap-2">
              <Box className="h-4 w-4 text-primary" />
              Enclosure Height
            </Label>
            <div className="flex gap-2">
              <Slider
                value={[parseInt(formData.enclosureHeight) || 36]}
                min={90}
                max={200}
                step={1}
                onValueChange={(value) => handleInputChange("enclosureHeight", value[0].toString())}
              />
              <input
                type="number"
                value={formData.enclosureHeight}
                onChange={(e) => handleInputChange("enclosureHeight", e.target.value)}
                className="w-16 text-sm text-neutral-600 border rounded"
              />
              <Select
                value={units.enclosure}
                onValueChange={(value: Unit) => handleUnitChange("enclosure", value)}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="cm">CM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-neutral-600">
              {formData.enclosureHeight || "required input"} {units.enclosure}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enclosureWidth" className="flex items-center gap-2">
              <Box className="h-4 w-4 text-primary" />
              Enclosure Width
            </Label>
            <div className="flex gap-2">
              <Slider
                value={[parseInt(formData.enclosureWidth) || 48]}
                min={100}
                max={200}
                step={1}
                onValueChange={(value) => handleInputChange("enclosureWidth", value[0].toString())}
              />
              <input
                type="number"
                value={formData.enclosureWidth}
                onChange={(e) => handleInputChange("enclosureWidth", e.target.value)}
                className="w-16 text-sm text-neutral-600 border rounded"
              />
              <Select
                value={units.enclosure}
                onValueChange={(value: Unit) => handleUnitChange("enclosure", value)}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="cm">CM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-neutral-600">
              {formData.enclosureWidth || "required input"} {units.enclosure}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enclosureThickness" className="flex items-center gap-2">
              <Box className="h-4 w-4 text-primary" />
              Enclosure Depth
            </Label>
            <div className="flex gap-2">
              <Slider
                value={[parseInt(formData.enclosureThickness) || 2]}
                min={12}
                max={200}
                step={1}
                onValueChange={(value) => handleInputChange("enclosureThickness", value[0].toString())}
              />
              <input
                type="number"
                value={formData.enclosureThickness}
                onChange={(e) => handleInputChange("enclosureThickness", e.target.value)}
                className="w-16 text-sm text-neutral-600 border rounded"
              />
              <Select
                value={units.enclosure}
                onValueChange={(value: Unit) => handleUnitChange("enclosure", value)}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="cm">CM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-neutral-600">
              {formData.enclosureThickness || "required input"} {units.enclosure}
            </div>
          </div>

          {/* Ceiling Material */}
          <div className="space-y-2">
            <Label htmlFor="ceilingMaterial" className="flex items-center gap-2">
              <Home className="h-4 w-4 text-primary" />
              Ceiling Material
            </Label>
            <Select
              value={formData.ceilingMaterial}
              onValueChange={(value: string) => handleInputChange("ceilingMaterial", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ceiling material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drywall">Drywall</SelectItem>
                <SelectItem value="concrete">Concrete</SelectItem>
                <SelectItem value="wood">Wood</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right side - Information */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Why we need this information:</h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
              <li>Screen size helps determine optimal viewing distance</li>
              <li>Enclosure dimensions ensure proper mounting hardware selection</li>
              <li>Ceiling height and material affect mounting requirements and safety</li>
              <li>This information helps customize installation instructions for your specific setup</li>
            </ul>
          </div>

          <div className="bg-neutral-100 rounded-lg p-4">
            <h4 className="font-medium mb-2">Recommended Measurements:</h4>
            <ul className="text-sm text-neutral-600 space-y-2">
              <li>Screen Size: 55" - 120"</li>
              <li>Ceiling Height: 9 - 12 feet</li>
              <li>Enclosure Height: 108" - 135"</li>
              <li>Enclosure Width: 108" - 168"</li>
              <li>Enclosure Depth: 120" - 180"</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={goToNextStep}
          className="bg-[#CD1B32] hover:bg-[#CD1B32]/90 text-white flex items-center"
          disabled={!isFormValid()}
        >
          Continue to Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 