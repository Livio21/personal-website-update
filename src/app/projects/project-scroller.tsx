
"use client"

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { ProjectCard } from './project-card';
import { Suspense } from 'react';

function ProjectScrollerContent() {
  const projects = PlaceHolderImages.filter(p => p.id.startsWith('project-'));
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();

  const scrollToProject = (index: number, behavior: 'smooth' | 'auto' = 'smooth') => {
    if (containerRef.current && !isScrollingRef.current) {
        isScrollingRef.current = true;
        const sectionHeight = containerRef.current.clientHeight;
        containerRef.current.scrollTo({
            top: index * sectionHeight,
            behavior: behavior,
        });
        setCurrentProjectIndex(index);
        
        const timeoutDuration = behavior === 'smooth' ? 1000 : 50;
        setTimeout(() => {
            isScrollingRef.current = false;
        }, timeoutDuration); 
    }
  };

  useEffect(() => {
    const projectParam = searchParams.get('project');
    if (projectParam) {
      const projectIndex = projects.findIndex(p => p.id === projectParam);
      if (projectIndex !== -1) {
        setTimeout(() => scrollToProject(projectIndex, 'auto'), 100);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProjectIndex, projects.length]);


  return (
    <div className="flex h-screen w-full">
      <div ref={containerRef} className="relative h-full flex-1 snap-y snap-mandatory overflow-y-scroll no-scrollbar">
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full bg-card/50 backdrop-blur-sm fixed top-4 left-1/2 -translate-x-1/2 z-20 md:hidden" 
          onClick={handlePrev}
        >
          <ArrowUp />
        </Button>

        <Button 
            size="icon" 
            variant="outline" 
            className="rounded-full bg-card/50 backdrop-blur-sm fixed bottom-4 left-1/2 -translate-x-1/2 z-20 md:hidden" 
            onClick={handleNext}
        >
            <ArrowDown />
        </Button>

        {projects.map((project, index) => (
          <section
            key={project.id}
            className="h-screen w-full snap-start flex items-center justify-center relative p-4"
          >
            <div className="absolute inset-0 z-0">
               {project.videoUrl ? (
                <video
                  key={`${project.videoUrl}-bg`}
                  src={project.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : null}
                <div className="absolute inset-0 bg-background/50 backdrop-blur-lg" />
            </div>
            <div className="relative z-10 w-full max-w-7xl h-full flex items-center pr-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full items-center">
                <div 
                    className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black/30"
                >
                    {project.videoUrl ? (
                        <video
                            key={project.videoUrl}
                            src={project.videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    ) : (
                        <div className="w-full h-full bg-card/50 flex items-center justify-center">
                            <p className="text-muted-foreground">No preview available</p>
                        </div>
                    )}
                </div>
                <ProjectCard project={project} isActive={currentProjectIndex === index} />
              </div>
            </div>
          </section>
        ))}
      </div>
      
      <div className="group hidden md:flex fixed right-0 top-0 h-full items-center justify-end z-30">
          <div className="relative flex flex-col justify-center items-end h-full w-48 bg-card/10 backdrop-blur-sm border-l border-white/10 p-4 transition-transform duration-300 ease-in-out transform translate-x-[calc(100%-2rem)] group-hover:translate-x-0">
              <div className="flex flex-col gap-4 w-full">
                  {projects.map((project, index) => {
                      const isActive = currentProjectIndex === index;
                      return (
                          <button
                              key={project.id}
                              onClick={() => scrollToProject(index)}
                              className="relative flex items-center justify-end gap-4 transition-all duration-300 w-full text-right"
                              aria-label={`Go to ${project.description.split('.')[0]}`}
                          >
                              <span
                                  className={cn(
                                      "font-medium truncate transition-all duration-300 font-headline opacity-0 group-hover:opacity-100",
                                      isActive ? "text-primary text-base font-bold" : "text-muted-foreground hover:text-white text-sm"
                                  )}
                              >
                                  {project.description.split('.')[0]}
                              </span>
                              <div className={cn("w-2 h-2 rounded-full transition-all duration-300", isActive ? "bg-primary scale-125" : "bg-muted-foreground group-hover:bg-white")}></div>
                          </button>
                      );
                  })}
              </div>
          </div>
      </div>
    </div>
  );
}

export function ProjectScroller() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectScrollerContent />
    </Suspense>
  )
}
