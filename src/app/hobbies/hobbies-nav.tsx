
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
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-card/50 backdrop-blur-sm hidden md:flex"
        onClick={handlePrev}
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Previous Section</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-card/50 backdrop-blur-sm hidden md:flex"
        onClick={handleNext}
      >
        <ArrowRight className="h-5 w-5" />
        <span className="sr-only">Next Section</span>
      </Button>

      <div className="fixed top-8 md:top-auto md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/10 backdrop-blur-sm border border-white/10 p-4 rounded-full ">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(index)}
            className={cn(
              "h-4 w-4 md:h-2 md:w-2 rounded-full bg-white/40 transition-all duration-300",
              currentSection === index ? "w-6 md:w-6 bg-white" : "hover:bg-white/70"
            )}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>
    </>
  );
}
