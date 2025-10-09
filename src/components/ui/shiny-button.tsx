"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { useVibration } from "@/hooks/use-vibration"

export interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ className, asChild = false, children, onClick, ...props }, ref) => {
    const vibrate = useVibration();
    const Comp = asChild ? Slot : "button"
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      vibrate(40); // Light haptic feedback on button press
      onClick?.(e);
    };

    return (
      <div className={cn("shiny-button-wrap", className)}>
        <Comp className="shiny-button" ref={ref} onClick={handleClick} {...props}>
          <span>{children}</span>
        </Comp>
        <div className="shiny-button-shadow"></div>
      </div>
    )
  }
)
ShinyButton.displayName = "ShinyButton"

export { ShinyButton }
