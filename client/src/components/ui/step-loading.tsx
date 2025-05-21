import { Loader2 } from "lucide-react";

interface StepLoadingProps {
  message?: string;
}

export function StepLoading({ message = "Loading..." }: StepLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
      <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
      <p className="text-sm text-neutral-600">{message}</p>
    </div>
  );
} 