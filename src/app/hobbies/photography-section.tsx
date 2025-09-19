"use client"

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTransition, animated } from '@react-spring/web';

const INITIAL_VISIBLE_IMAGES = 5;

type Hobby = (typeof PlaceHolderImages)[0];

export function PhotographySection() {
  const photographyHobbies = PlaceHolderImages.filter(p => p.id.startsWith('hobby-photo-'));
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Hobby | null>(null);

  const visibleHobbies = isExpanded ? photographyHobbies : photographyHobbies.slice(0, INITIAL_VISIBLE_IMAGES);
  const canExpand = photographyHobbies.length > INITIAL_VISIBLE_IMAGES;

  const handleImageClick = (hobby: Hobby) => {
    setSelectedImage(hobby);
  };
  
  const spans = [
    'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1', 
    'col-span-1 row-span-1', 'col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2',
    'col-span-1 row-span-1', 'col-span-1 row-span-1',
  ];

  const transitions = useTransition(visibleHobbies, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    trail: 100,
    keys: item => item.id
  });

  return (
    <>
      <section className="h-screen w-full snap-start flex-shrink-0 flex flex-col p-8 md:p-16 pt-24 bg-background/80 overflow-y-auto no-scrollbar">
        <div className="text-left mb-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-2">
            Photography
          </h2>
          <p className="text-lg text-muted-foreground">Capturing moments and perspectives.</p>
        </div>
        <div className="flex-grow w-full">
            <div className="grid grid-cols-2 md:grid-cols-5 auto-rows-[180px] gap-2 w-full">
                {transitions((style, hobby, t, index) => (
                    <animated.div style={style} className={cn(spans[index % spans.length], "cursor-pointer")}>
                    <Card key={hobby.id} className="overflow-hidden group relative bg-card/60 border-none h-full shadow-lg" onClick={() => handleImageClick(hobby)}>
                        <CardContent className="p-0 w-full h-full">
                        <Image
                            src={hobby.imageUrl}
                            alt={hobby.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            data-ai-hint={hobby.imageHint}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        />
                        </CardContent>
                    </Card>
                    </animated.div>
                ))}
            </div>
        </div>
        {canExpand && (
          <div className="mt-4 text-center">
            <Button onClick={() => setIsExpanded(!isExpanded)} variant="outline" className="bg-card/50 backdrop-blur-sm">
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        )}
      </section>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="p-0 border-none bg-transparent w-full max-w-4xl h-[80vh] shadow-none">
          {selectedImage && (
            <div className='relative w-full h-full'>
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.description}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold text-white">{selectedImage.description}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
