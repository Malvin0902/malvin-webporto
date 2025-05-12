import { cn } from "@/lib/utils"
import type React from "react"

interface DotBackgroundProps {
  children?: React.ReactNode
  className?: string
}

export default function DotBackground({ children, className }: DotBackgroundProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "fixed inset-0 z-[-1]",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      {children}
    </div>
  )
}
