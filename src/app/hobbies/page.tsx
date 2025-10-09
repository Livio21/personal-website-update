
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
  const touchStartRef = useRef<number | null>(null);

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
        
        // Longer timeout to prevent interference with scroll detection
        const timeoutDuration = behavior === 'smooth' ? 1500 : 100;
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
              const scrollLeft = containerRef.current!.scrollLeft;
              const sectionWidth = containerRef.current!.clientWidth;
              const index = Math.round(scrollLeft / sectionWidth);
              
              // Only update if we've scrolled significantly (more than 40% of section width)
              const scrollProgress = (scrollLeft % sectionWidth) / sectionWidth;
              const threshold = 0.4;
              
              if (index !== currentSection && (scrollProgress < threshold || scrollProgress > (1 - threshold))) {
                setCurrentSection(index);
              }
            }, 400) // Further increased timeout to reduce sensitivity
        }
    };

    // Touch event handlers for better mobile control
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || !containerRef.current) return;
      
      const touchEnd = e.changedTouches[0].clientX;
      const diff = touchStartRef.current - touchEnd;
      const minSwipeDistance = 50; // Minimum distance for a swipe
      
      if (Math.abs(diff) > minSwipeDistance) {
        if (diff > 0 && currentSection < sections.length - 1) {
          // Swipe left - next section
          scrollToSection(currentSection + 1);
        } else if (diff < 0 && currentSection > 0) {
          // Swipe right - previous section
          scrollToSection(currentSection - 1);
        }
      }
      
      touchStartRef.current = null;
    };

    const currentContainer = containerRef.current;
    currentContainer?.addEventListener('scroll', handleScroll, { passive: true });
    currentContainer?.addEventListener('touchstart', handleTouchStart, { passive: true });
    currentContainer?.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
        currentContainer?.removeEventListener('scroll', handleScroll);
        currentContainer?.removeEventListener('touchstart', handleTouchStart);
        currentContainer?.removeEventListener('touchend', handleTouchEnd);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
    };
  }, [currentSection]);

  return (
    <main className="relative h-screen w-full overflow-hidden touch-pan-x">
      <HobbiesNav currentSection={currentSection} scrollToSection={scrollToSection} />
      <div 
        ref={containerRef}
        className="flex h-full w-full snap-x snap-proximity overflow-x-auto no-scrollbar scroll-smooth"
        style={{ scrollSnapType: 'x proximity' }}
      >
        {sections.map((section) => (
          <div key={section.id} className="h-full w-full flex-shrink-0 snap-center px-4 md:px-6 overflow-hidden">
            <div className="h-full w-full overflow-y-auto no-scrollbar py-12">
              {section.component}
            </div>
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
