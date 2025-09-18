"use client"

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function ProjectModal() {
  const projects = PlaceHolderImages.filter(p => p.id.startsWith('project-'));
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const handleOpen = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card 
            key={project.id} 
            className="overflow-hidden group relative bg-card/60 backdrop-blur-sm border-white/10 cursor-pointer"
            onClick={() => handleOpen(project)}
          >
            <CardContent className="p-0 w-full h-full">
              <div className="aspect-video relative">
                <Image
                  src={project.imageUrl}
                  alt={project.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={project.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary">Project {index + 1}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent className="sm:max-w-[625px]">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="aspect-video relative mb-4">
                    <Image
                        src={selectedProject.imageUrl}
                        alt={selectedProject.description}
                        fill
                        className="rounded-lg object-cover"
                        data-ai-hint={selectedProject.imageHint}
                    />
                </div>
                <DialogTitle className="text-2xl">Project Details</DialogTitle>
                <DialogDescription>
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 text-muted-foreground">
                <p>This is where more detailed information about the project would go. You can describe the technologies used, the problems that were solved, and your role in the project.</p>
              </div>
              <DialogFooter>
                <Button variant="outline" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLink className="ml-2" />
                  </a>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
