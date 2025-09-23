"use client"

import { useState, useRef, useEffect } from 'react';
import { IntroSection } from './intro-section';
import { ExperienceSection } from './experience-section';
import { EducationSection } from './education-section';
import { SkillsSection } from './skills-section';
import { AboutNav } from './about-nav';

const sections = ['Intro', 'Experience', 'Education', 'Skills'];

export default function AboutPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-section-index') || '0', 10);
          setCurrentSection(index);
        }
      });
    }, observerOptions);

    const currentRefs = sectionRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="relative">
      <AboutNav sections={sections} currentSection={currentSection} scrollToSection={scrollToSection} />
      
      <section 
        ref={el => sectionRefs.current[0] = el}
        data-section-index={0}
        className="h-screen w-full flex items-center justify-center snap-center"
      >
        <IntroSection />
      </section>

      <section 
        ref={el => sectionRefs.current[1] = el}
        data-section-index={1}
        className="w-full relative snap-center"
      >
        <ExperienceSection />
      </section>
      
      <section 
        ref={el => sectionRefs.current[2] = el}
        data-section-index={2}
        className="h-screen w-full flex items-center justify-center snap-center px-8"
      >
        <EducationSection />
      </section>

      <section
        ref={el => sectionRefs.current[3] = el}
        data-section-index={3}
        className="h-screen w-full flex items-center justify-center snap-center"
      >
        <SkillsSection />
      </section>
    </div>
  );
}
