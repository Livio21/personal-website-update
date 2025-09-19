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
import { motion } from 'framer-motion';

const INITIAL_VISIBLE_IMAGES = 5;

type Hobby = (typeof PlaceHolderImages)[0];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
  },
};


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

  return (
    <>
      <section className="h-screen w-full snap-start flex-shrink-0 flex flex-col p-8 md:p-16 pt-24 bg-transparent overflow-y-auto no-scrollbar">
        <div className="text-left mb-8">
          <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">
            Photography
          </h2>
          <p className="text-lg text-muted-foreground font-body">Capturing moments and perspectives.</p>
        </div>
        <div className="flex-grow w-full">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-5 auto-rows-[180px] gap-2 w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={isExpanded ? 'expanded' : 'collapsed'}
            >
                {visibleHobbies.map((hobby, index) => (
                    <motion.div 
                      key={hobby.id}
                      variants={itemVariants} 
                      className={cn(spans[index % spans.length], "cursor-pointer")}
                      layout
                    >
                      <Card className="overflow-hidden group relative bg-card/40 backdrop-blur-sm border-none h-full shadow-lg" onClick={() => handleImageClick(hobby)}>
                          <CardContent className="p-0 w-full h-full">
                          <Image
                              src={hobby.imageUrl}
                              alt={hobby.description}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:brightness-105"
                              data-ai-hint={hobby.imageHint}
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                          />
                          </CardContent>
                      </Card>
                    </motion.div>
                ))}
            </motion.div>
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
                <h3 className="text-2xl font-bold text-white font-headline">{selectedImage.description}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
