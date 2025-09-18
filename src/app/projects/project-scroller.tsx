"use client"

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProjectScroller() {
  const projects = PlaceHolderImages.filter(p => p.id.startsWith('project-'));
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const scrollToProject = (index: number) => {
    sectionsRef.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setCurrentProjectIndex(index);
            }
          }
        });
      },
      { threshold: 0.6 } // 60% of the item must be visible
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [projects.length]);
  
  const currentProject = projects[currentProjectIndex];

  return (
    <div className="relative h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      {/* "You are here" indicator */}
      <div className="fixed top-1/2 right-6 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
        {currentProjectIndex > 0 && (
          <Button size="icon" variant="outline" className="rounded-full bg-card/50 backdrop-blur-sm" onClick={() => scrollToProject(currentProjectIndex - 1)}>
            <ArrowUp />
          </Button>
        )}
        <div className="p-4 rounded-lg bg-card/60 backdrop-blur-lg border border-white/10 text-center w-40">
            <p className="font-bold text-primary text-lg">{currentProject.description.split('.')[0]}</p>
            <p className="text-sm text-muted-foreground mt-1">2024</p>
        </div>
        {currentProjectIndex < projects.length - 1 && (
          <Button size="icon" variant="outline" className="rounded-full bg-card/50 backdrop-blur-sm" onClick={() => scrollToProject(currentProjectIndex + 1)}>
            <ArrowDown />
          </Button>
        )}
      </div>

      {/* Project Sections */}
      {projects.map((project, index) => (
        <section
          key={project.id}
          ref={el => sectionsRef.current[index] = el!}
          className="h-screen w-full snap-start flex items-center justify-center relative p-8 md:p-16"
        >
          <div className="absolute inset-0 z-0">
             <Image
                src={project.imageUrl}
                alt={project.description}
                fill
                className="object-cover"
                data-ai-hint={project.imageHint}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 w-full max-w-5xl h-full flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="p-8 rounded-xl bg-blue-950/50 backdrop-blur-lg border border-white/10">
                <h2 className="text-4xl font-bold text-primary mb-4">Project {index + 1}</h2>
                <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
                 <p className="text-muted-foreground mb-6">This is where more detailed information about the project would go. You can describe the technologies used, the problems that were solved, and your role in the project.</p>
                <Button variant="outline" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLink className="ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
