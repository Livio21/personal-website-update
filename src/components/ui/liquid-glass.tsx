"use client";

import { cn } from "@/lib/utils";

interface LiquidGlassProps {
  children?: React.ReactNode;
  className?: string;
  // Filter properties
  baseFrequency?: string;
  numOctaves?: number;
  seed?: number;
  stdDeviation?: number;
  surfaceScale?: number;
  specularConstant?: number;
  specularExponent?: number;
  displacementScale?: number;
  // Light position
  lightX?: number;
  lightY?: number;
  lightZ?: number;
  // Visual properties
  blurAmount?: number;
  tintOpacity?: number;
  borderRadius?: string;
  // Shine properties
  shineIntensity?: "light" | "medium" | "strong";
}

export function LiquidGlass({
  children,
  className,
  baseFrequency = "0.01 0.01",
  numOctaves = 1,
  seed = 5,
  stdDeviation = 3,
  surfaceScale = 5,
  specularConstant = 1,
  specularExponent = 100,
  displacementScale = 150,
  lightX = -200,
  lightY = -200,
  lightZ = 300,
  blurAmount = 3,
  tintOpacity = 0.1,
  borderRadius = "2rem",
  shineIntensity = "medium",
  ...props
}: LiquidGlassProps) {
  const filterId = `glass-distortion-${Math.random().toString(36).substr(2, 9)}`;
  
  const shineStyles = {
    light: {
      boxShadow: `
        inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3),
        inset -1px -1px 1px 1px rgba(255, 255, 255, 0.2),
        inset 1px 2px 1px 0 rgba(255, 255, 255, 0.2),
        inset 1px 1px 2px 0 rgba(255, 255, 255, 0.05)
      `,
      activeBoxShadow: `
        inset 1px 1px 1px 0 rgba(255, 255, 255, 0.4),
        inset -1px -1px 1px 1px rgba(255, 255, 255, 0.2)
      `
    },
    medium: {
      boxShadow: `
        inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),
        inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3),
        inset 2px 3px 1px 0 rgba(255, 255, 255, 0.3),
        inset 1px 1px 4px 0 rgba(255, 255, 255, 0.1)
      `,
      activeBoxShadow: `
        inset 2px 2px 1px 0 rgba(255, 255, 255, 0.7),
        inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3)
      `
    },
    strong: {
      boxShadow: `
        inset 3px 3px 2px 0 rgba(255, 255, 255, 0.7),
        inset -2px -2px 2px 2px rgba(255, 255, 255, 0.4),
        inset 3px 4px 2px 0 rgba(255, 255, 255, 0.4),
        inset 2px 2px 6px 0 rgba(255, 255, 255, 0.15)
      `,
      activeBoxShadow: `
        inset 3px 3px 2px 0 rgba(255, 255, 255, 0.8),
        inset -2px -2px 2px 2px rgba(255, 255, 255, 0.4)
      `
    }
  };

  return (
    <>
      <svg style={{ display: "none" }}>
        <filter
          id={filterId}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation={stdDeviation} result="softMap" />

          <feSpecularLighting
            in="softMap"
            surfaceScale={surfaceScale}
            specularConstant={specularConstant}
            specularExponent={specularExponent}
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x={lightX} y={lightY} z={lightZ} />
          </feSpecularLighting>

          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale={displacementScale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      
      <div className={cn("relative", className)} style={{ borderRadius }} {...props}>
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            backdropFilter: `blur(${blurAmount}px)`,
            filter: `url(#${filterId})`,
            borderRadius,
          }}
        />
        <div
          className="absolute inset-0 z-1"
          style={{
            background: `rgba(255, 255, 255, ${tintOpacity})`,
            borderRadius,
          }}
        />
        <div
          className="absolute inset-0 z-2 overflow-hidden transition-all duration-200 active:duration-75"
          style={{
            borderRadius,
            boxShadow: shineStyles[shineIntensity].boxShadow,
          }}
          onMouseDown={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.boxShadow = shineStyles[shineIntensity].activeBoxShadow;
          }}
          onMouseUp={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.boxShadow = shineStyles[shineIntensity].boxShadow;
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.boxShadow = shineStyles[shineIntensity].boxShadow;
          }}
        />
        {children && <div className="relative z-3">{children}</div>}
      </div>
    </>
  );
}