
"use client"

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

const sections = ['Photography', 'Music', 'Blog'];

interface HobbiesNavProps {
    currentSection: number;
    scrollToSection: (index: number) => void;
}

export function HobbiesNav({ currentSection, scrollToSection }: HobbiesNavProps) {
  
  const handleNext = () => {
    const nextIndex = (currentSection + 1) % sections.length;
    scrollToSection(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentSection - 1 + sections.length) % sections.length;
    scrollToSection(prevIndex);
  };
  
  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(index)}
            className={cn(
              "h-2 w-2 rounded-full bg-white/40 transition-all duration-300",
              currentSection === index ? "w-6 bg-white" : "hover:bg-white/70"
            )}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>
    </>
  );
}
