import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ className, value = 0, ...props }, ref) => (
  <div ref={ref} className={cn("w-full h-2 bg-gray-200 rounded", className)} {...props}>
    <div className="h-2 bg-blue-600 rounded" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>
));
Progress.displayName = "Progress";
