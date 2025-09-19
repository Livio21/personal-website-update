"use client"

import { useState, useRef, useEffect } from 'react';
import { PhotographySection } from './photography-section';
import { MusicSection } from './music-section';
import { BlogSection } from './blog-section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sections = ['Photography', 'Music', 'Blog'];

export default function HobbiesPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current && !isScrollingRef.current) {
      isScrollingRef.current = true;
      const sectionWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: index * sectionWidth,
        behavior: 'smooth',
      });
      setCurrentSection(index);

      // Allow manual scroll to update section after smooth scroll finishes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700); 
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

  useEffect(() => {
    const container = scrollContainerRef.current;
    
    const handleScroll = () => {
      if (container && !isScrollingRef.current) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          const newIndex = Math.round(container.scrollLeft / container.clientWidth);
          if (newIndex !== currentSection) {
            setCurrentSection(newIndex);
          }
        }, 150);
      }
    };

    container?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container?.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentSection]);
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
        <Button 
          size="icon" 
          variant="outline" 
          className={cn(
            "rounded-full bg-card/50 backdrop-blur-sm fixed top-1/2 left-4 -translate-y-1/2 z-20 transition-opacity",
            currentSection === 0 && "opacity-0 pointer-events-none"
          )} 
          onClick={handlePrev}
        >
          {"<"}
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
            {">"}
        </Button>
      
      <div 
        ref={scrollContainerRef} 
        className="flex w-full h-full snap-x snap-mandatory overflow-x-scroll no-scrollbar"
      >
        <PhotographySection />
        <MusicSection />
        <BlogSection />
      </div>
    </div>
  );
}
