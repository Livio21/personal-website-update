

"use client"

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { ProjectCard } from './project-card';
import { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ProjectScrollerContent() {
  const projects = PlaceHolderImages.filter(p => p.id.startsWith('project-'));
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const [isNavHovered, setIsNavHovered] = useState(false);

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
      
      <div 
        className="hidden md:flex fixed right-0 top-0 h-full items-center justify-end z-30"
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
      >
        <div className="relative flex flex-col justify-center items-end h-full w-12 transition-all duration-300 ease-in-out">
            <div className="flex flex-col gap-4 w-full items-center">
              {projects.map((_, index) => {
                  const isActive = currentProjectIndex === index;
                  return (
                      <button
                          key={`dot-${index}`}
                          onClick={() => scrollToProject(index)}
                          className="w-2 h-2 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                            transform: isActive ? 'scale(1.5)' : 'scale(1)',
                          }}
                          aria-label={`Go to project ${index + 1}`}
                      />
                  );
              })}
            </div>
        </div>
         <AnimatePresence>
          {isNavHovered && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute right-0 top-0 h-full w-48 bg-card/10 backdrop-blur-sm border-l border-white/10"
            >
              <div className="flex flex-col justify-center h-full p-4">
                {projects.map((project, index) => {
                  const isActive = currentProjectIndex === index;
                  return (
                    <button
                      key={project.id}
                      onClick={() => scrollToProject(index)}
                      className="text-right py-2 transition-colors duration-300"
                      aria-label={`Go to ${project.description.split('.')[0]}`}
                    >
                      <span
                        className={cn(
                          "font-medium transition-all duration-300 font-headline",
                          isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-white"
                        )}
                      >
                        {project.description.split('.')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
