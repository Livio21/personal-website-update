import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function ProjectsPage() {
  const projects = PlaceHolderImages.filter(p => p.id.startsWith('project-'));

  return (
    <div className="w-full max-w-5xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">My Projects</h1>
        <p className="text-lg text-muted-foreground">A selection of my work. Swipe to explore.</p>
      </header>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="h-full flex flex-col bg-card/60 backdrop-blur-lg border-border/20 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <div className="aspect-video relative mb-4">
                       <Image
                          src={project.imageUrl}
                          alt={project.description}
                          fill
                          className="rounded-lg object-cover"
                          data-ai-hint={project.imageHint}
                        />
                    </div>
                    <CardTitle>Project {index + 1}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-end">
                     <Button variant="outline" className="w-full">
                        View Project <ExternalLink className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14"/>
      </Carousel>
    </div>
  );
}
