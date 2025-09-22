"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPhotosByUsername, UnsplashPhoto } from '@/lib/unsplash';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { MasonryGallery, MasonrySkeleton } from './masonry-gallery';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function PhotographySection() {
  const [photos, setPhotos] = useState<ImagePlaceholder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const unsplashPhotos = await getPhotosByUsername(process.env.NEXT_PUBLIC_UNSPLASH_USERNAME || "l1v1o");
        const formattedPhotos: ImagePlaceholder[] = unsplashPhotos.map((p: UnsplashPhoto) => ({
          id: p.id,
          description: p.description || p.alt_description || 'Unsplash Photo',
          imageUrl: p.urls.regular,
          smallImageUrl: p.urls.small,
          unsplashUrl: p.links.html,
          imageHint: p.alt_description || 'photo',
          width: p.width,
          height: p.height
        }));
        setPhotos(formattedPhotos);
      } catch (error) => {
        console.error("Failed to fetch photos from Unsplash:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleImageClick = (hobby: ImagePlaceholder) => {
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
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                <h3 className="text-xl font-bold text-white font-headline max-w-[75%]">{selectedImage.description}</h3>
                {selectedImage.unsplashUrl && (
                  <Button asChild variant="outline" size="sm" className="bg-card/20 backdrop-blur-sm border-white/20 text-white hover:bg-card/50 hover:text-white">
                    <Link href={selectedImage.unsplashUrl} target="_blank" rel="noopener noreferrer">
                      View Full Quality
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
