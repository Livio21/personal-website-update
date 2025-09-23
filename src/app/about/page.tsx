"use client"

import { useState, useRef, useEffect } from 'react';
import { AboutNav } from './about-nav';
import { IntroSection } from './intro-section';
import { ExperienceSection } from './experience-section';
import { EducationSection } from './education-section';
import { SkillsSection } from './skills-section';

const sections = [
  { id: 'Intro', component: <IntroSection /> },
  { id: 'Experience', component: <ExperienceSection /> },
  { id: 'Education', component: <EducationSection /> },
  { id: 'Skills', component: <SkillsSection /> },
];

export default function AboutPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
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
        }, 150);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const nextIndex = (currentSection + 1) % sections.length;
        scrollToSection(nextIndex);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentSection - 1 + sections.length) % sections.length;
        scrollToSection(prevIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection]);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <AboutNav
        sections={sections.map(s => s.id)}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
      />
      <div
        ref={containerRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto no-scrollbar scroll-smooth"
      >
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="h-full w-full flex-shrink-0 snap-center flex items-center justify-center p-4 md:p-8"
          >
            {section.component}
          </div>
        ))}
      </div>
    </main>
  );
}