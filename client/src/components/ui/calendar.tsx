import * as React from "react"
import { cn } from "@/lib/utils"

// Placeholder implementation until react-day-picker is added as a dependency
export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  showOutsideDays?: boolean
}

function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="text-center">Calendar placeholder (react-day-picker required)</div>
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
