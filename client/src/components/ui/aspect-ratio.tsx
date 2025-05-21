import * as React from "react"
import { cn } from "@/lib/utils"

// Placeholder implementation until @radix-ui/react-aspect-ratio is added as a dependency
interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 1, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        paddingBottom: `${(1 / ratio) * 100}%`,
        position: 'relative'
      }}
      className={cn("", className)}
      {...props}
    />
  )
)
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
