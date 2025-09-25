"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <div className={cn("shiny-button-wrap", className)}>
        <Comp className="shiny-button" ref={ref} {...props}>
          <span>{children}</span>
        </Comp>
        <div className="shiny-button-shadow"></div>
      </div>
    )
  }
)
ShinyButton.displayName = "ShinyButton"

export { ShinyButton }
