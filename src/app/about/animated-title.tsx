"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  wordSpacing?: string;
}

export function AnimatedTitle({ text, className, wordSpacing = "0.1em" }: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Animate startOffset from 100% to 0%
  const startOffset = useTransform(scrollYProgress, [0, 0.4], ['100%', '0%']);
  const uniqueId = useRef(`path-${Math.random().toString(36).substr(2, 9)}`);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <svg viewBox="0 0 500 50" className="w-full h-auto overflow-visible">
        <defs>
          <path id={uniqueId.current} d="M10,25 C100,0 400,50 490,25" />
        </defs>
        <motion.text
          className={cn("fill-current", className)}
          style={{ wordSpacing }}
        >
          <textPath href={`#${uniqueId.current}`} startOffset={startOffset}>
            {text}
          </textPath>
        </motion.text>
      </svg>
    </div>
  );
}
