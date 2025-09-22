
"use client"

import { useState, useRef, useEffect } from 'react';
import { PhotographySection } from './photography-section';
import { MusicSection } from './music-section';
import { BlogSection } from './blog-section';
import { HobbiesNav } from './hobbies-nav';

const sections = [
  { id: 'Photography', component: <PhotographySection /> },
  { id: 'Music', component: <MusicSection /> },
  { id: 'Blog', component: <BlogSection /> },
];

export default function HobbiesPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = (index: number) => {
    if (containerRef.current && !isScrollingRef.current) {
        isScrollingRef.current = true;
        const sectionWidth = containerRef.current.clientWidth;
        containerRef.current.scrollTo({
            left: index * sectionWidth,
            behavior: 'smooth',
        });
        setCurrentSection(index);
        
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000); 
    }
  };

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
    <div className="relative h-screen w-full overflow-hidden">
      <HobbiesNav currentSection={currentSection} scrollToSection={scrollToSection} />
      <div 
        ref={containerRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto no-scrollbar"
      >
        {sections.map((section) => (
          <div key={section.id} className="h-full w-full flex-shrink-0 snap-start">
            {section.component}
          </div>
        ))}
      </div>
    </div>
  );
}
