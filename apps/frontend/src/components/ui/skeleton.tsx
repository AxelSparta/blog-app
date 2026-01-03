import * as React from "react";
import { cn } from "@/lib/utils"; // Utility for joining class names of tailwindcss and handle undefined, null, conditional classes, etc

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="status"
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-slate-300 dark:bg-slate-700 rounded",
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
