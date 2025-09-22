"use client"

import { useState, useEffect, useRef } from 'react';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function ProjectScroller() {
  const projects = PlaceHolderImages.filter(p => p.id.startsWith('project-'));
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToProject = (index: number) => {
    if (containerRef.current && !isScrollingRef.current) {
        isScrollingRef.current = true;
        const sectionHeight = containerRef.current.clientHeight;
        containerRef.current.scrollTo({
            top: index * sectionHeight,
            behavior: 'smooth',
        });
        setCurrentProjectIndex(index);
        
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000); 
    }
  };

  const handleNext = () => {
    const nextIndex = (currentProjectIndex + 1) % projects.length;
    scrollToProject(nextIndex);
  };
  
  const handlePrev = () => {
      const prevIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
      scrollToProject(prevIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
        if (containerRef.current && !isScrollingRef.current) {
             if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = setTimeout(() => {
              const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
              if (index !== currentProjectIndex) {
                setCurrentProjectIndex(index);
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
  }, [currentProjectIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentProjectIndex, projects.length]);


  return (
    <div className="flex h-screen w-full">
      <div ref={containerRef} className="relative h-full flex-1 snap-y snap-mandatory overflow-y-scroll no-scrollbar">
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full bg-card/50 backdrop-blur-sm fixed top-6 left-1/2 -translate-x-1/2 z-20 md:hidden" 
          onClick={handlePrev}
        >
          <ArrowUp />
        </Button>

        <Button 
            size="icon" 
            variant="outline" 
            className="rounded-full bg-card/50 backdrop-blur-sm fixed bottom-6 left-1/2 -translate-x-1/2 z-20 md:hidden" 
            onClick={handleNext}
        >
            <ArrowDown />
        </Button>

        {projects.map((project, index) => (
          <section
            key={project.id}
            className="h-screen w-full snap-start flex flex-1 items-center justify-center relative p-8 md:p-16 pt-24 md:pt-16"
          >
            <div className="absolute inset-0 z-0">
               {project.videoUrl ? (
                <video
                  src={project.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : null}
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 w-full max-w-6xl h-full flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-8 rounded-xl bg-card/40 backdrop-blur-lg border border-white/10">
                  <h2 className="text-3xl md:text-4xl font-headline font-light text-primary mb-4">{project.description.split('.')[0]}</h2>
                  <p className="text-base md:text-lg text-muted-foreground mb-6 font-body">{project.description}</p>
                  <Button variant="outline" asChild>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      
      <div className="hidden md:flex flex-col justify-center p-2 pr-4">
        <div className="flex flex-col gap-4 w-full">
          {projects.map((project, index) => {
            const isActive = currentProjectIndex === index;
            return (
              <button
                key={project.id}
                onClick={() => scrollToProject(index)}
                className={cn(
                  "relative flex flex-col gap-4 transition-all duration-300 w-full text-right",
                )}
                aria-label={`Go to ${project.description.split('.')[0]}`}
              >
                <span
                  className={cn(
                    "text-xs font-medium truncate transition-all duration-300 font-headline",
                    isActive ? "text-primary text-lg font-bold" : "text-muted-foreground"
                  )}
                >
                  {project.description.split('.')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
