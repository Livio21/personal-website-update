
"use client"

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

const sections = ['Photography', 'Music', 'Blog'];

interface HobbiesNavProps {
    currentSection: number;
    setCurrentSection: Dispatch<SetStateAction<number>>;
}

export function HobbiesNav({ currentSection, setCurrentSection }: HobbiesNavProps) {
  
  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
        setCurrentSection(index);
    }
  };

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
        size="icon" 
        variant="outline" 
        className={cn(
          "rounded-full bg-card/50 backdrop-blur-sm fixed top-1/2 left-4 -translate-y-1/2 z-20 transition-opacity",
          currentSection === 0 && "opacity-0 pointer-events-none"
        )} 
        onClick={handlePrev}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <Button 
        size="icon" 
        variant="outline" 
        className={cn(
            "rounded-full bg-card/50 backdrop-blur-sm fixed top-1/2 right-4 -translate-y-1/2 z-20 transition-opacity",
            currentSection === sections.length - 1 && "opacity-0 pointer-events-none"
        )} 
        onClick={handleNext}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>

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
