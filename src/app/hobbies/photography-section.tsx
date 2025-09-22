"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { MasonryGallery, MasonrySkeleton } from './masonry-gallery';

type Hobby = (typeof PlaceHolderImages)[0];

export function PhotographySection() {
  const [photos, setPhotos] = useState<Hobby[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Hobby | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API (like Unsplash)
    const fetchPhotos = async () => {
      setIsLoading(true);
      // In the future, you'll replace this with your Unsplash API call
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      const photographyHobbies = PlaceHolderImages.filter(p => p.id.startsWith('hobby-photo-'));
      setPhotos(photographyHobbies);
      setIsLoading(false);
    };

    fetchPhotos();
  }, []);

  const handleImageClick = (hobby: Hobby) => {
    setSelectedImage(hobby);
  };
  
  return (
    <>
      <section className="h-screen w-full snap-start flex-shrink-0 flex flex-col p-4 md:p-8 pt-24 bg-transparent overflow-y-auto no-scrollbar">
        <header className="text-left mb-8 px-4 md:px-0">
          <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">
            Photography
          </h2>
          <p className="text-lg text-muted-foreground font-body">Capturing moments and perspectives.</p>
        </header>
        
        <div className="flex-grow w-full px-2 md:px-0">
            {isLoading ? (
              <MasonrySkeleton />
            ) : (
              <MasonryGallery photos={photos} onImageClick={handleImageClick} />
            )}
        </div>
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
