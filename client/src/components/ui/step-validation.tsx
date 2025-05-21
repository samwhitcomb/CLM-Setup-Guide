import { AlertCircle, CheckCircle } from "lucide-react";
import { StepValidation } from "@/types/step";

interface StepValidationMessageProps {
  validation: StepValidation;
  className?: string;
}

export function StepValidationMessage({ validation, className = "" }: StepValidationMessageProps) {
  if (!validation.message) return null;

  return (
    <div className={`flex items-start gap-2 p-3 rounded-lg ${
      validation.isValid 
        ? "bg-green-50 text-green-800 border border-green-200" 
        : "bg-red-50 text-red-800 border border-red-200"
    } ${className}`}>
      {validation.isValid ? (
        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
      ) : (
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
      )}
      <p className="text-sm">{validation.message}</p>
    </div>
  );
} 