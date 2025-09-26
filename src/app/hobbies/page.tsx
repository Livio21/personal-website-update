
"use client"

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PhotographySection } from './photography-section';
import { MusicSection } from './music-section';
import { BlogSection } from './blog-section';
import { HobbiesNav } from './hobbies-nav';

const sections = [
  { id: 'Photography', component: <PhotographySection /> },
  { id: 'Music', component: <MusicSection /> },
  { id: 'Blog', component: <BlogSection /> },
];

function HobbiesPageContent() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchParams = useSearchParams();

  const scrollToSection = (index: number, behavior: 'smooth' | 'auto' = 'smooth') => {
    if (containerRef.current) {
        isScrollingRef.current = true;
        const sectionWidth = containerRef.current.clientWidth;
        containerRef.current.scrollTo({
            left: index * sectionWidth,
            behavior: behavior,
        });
        setCurrentSection(index);
        
        // Use a longer timeout for smooth scrolling to prevent scroll handler from firing mid-animation
        const timeoutDuration = behavior === 'smooth' ? 1000 : 50;
        setTimeout(() => {
            isScrollingRef.current = false;
        }, timeoutDuration); 
    }
  };
  
  useEffect(() => {
    const sectionParam = searchParams.get('section');
    if (sectionParam) {
      const sectionIndex = sections.findIndex(s => s.id.toLowerCase() === sectionParam.toLowerCase());
      if (sectionIndex !== -1) {
        // Use a timeout to ensure the layout is stable before scrolling
        setTimeout(() => scrollToSection(sectionIndex, 'auto'), 100);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
        if (containerRef.current && !isScrollingRef.current) {
             if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = setTimeout(() => {
              const index = Math.round(containerRef.current!.scrollLeft / containerRef.current!.clientWidth);
              if (index !== currentSection) {
                setCurrentSection(index);
              }
            }, 150)
        }
    };

    const currentContainer = containerRef.current;
    currentContainer?.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
        currentContainer?.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
    };
  }, [currentSection]);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <HobbiesNav currentSection={currentSection} scrollToSection={scrollToSection} />
      <div 
        ref={containerRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto no-scrollbar scroll-smooth"
      >
        {sections.map((section) => (
          <div key={section.id} className="h-full w-full flex-shrink-0 snap-center px-4 md:px-6 pt-20 pb-16 md:pb-24 overflow-y-auto no-scrollbar">
            {section.component}
          </div>
        ))}
      </div>
    </main>
  );
}


export default function HobbiesPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>}>
      <HobbiesPageContent />
    </Suspense>
  )
}
