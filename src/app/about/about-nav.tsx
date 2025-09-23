"use client"

import { cn } from '@/lib/utils';

interface AboutNavProps {
    sections: string[];
    currentSection: number;
    scrollToSection: (index: number) => void;
}

export function AboutNav({ sections, currentSection, scrollToSection }: AboutNavProps) {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-8 z-20 flex flex-col gap-4">
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => scrollToSection(index)}
          className="group relative flex items-center"
          aria-label={`Go to ${section} section`}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full bg-white/40 transition-all duration-300",
              currentSection === index ? "w-3 h-3 bg-white" : "group-hover:bg-white/70"
            )}
          />
          <span
            className={cn(
              "absolute right-full mr-3 whitespace-nowrap rounded-md bg-card/80 px-2 py-1 text-xs text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100",
               currentSection === index && "opacity-100"
            )}
          >
            {section}
          </span>
        </button>
      ))}
    </div>
  );
}
