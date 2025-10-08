
"use client"

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPhotosByUsername, UnsplashPhoto } from '@/lib/unsplash';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { MasonryGallery, MasonrySkeleton } from './masonry-gallery';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function PhotographySection() {
  const [photos, setPhotos] = useState<ImagePlaceholder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);
  const [isFullImageLoading, setIsFullImageLoading] = useState(true);


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
      } catch (error) {
        console.error("Failed to fetch photos from Unsplash:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleImageClick = (hobby: ImagePlaceholder) => {
    setIsFullImageLoading(true);
    setSelectedImage(hobby);
  };
  
  const handleCloseDialog = () => {
    setSelectedImage(null);
  }

  const handleNextImage = useCallback(() => {
    if (!selectedImage || photos.length === 0) return;
    setIsFullImageLoading(true);
    const currentIndex = photos.findIndex(p => p.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedImage(photos[nextIndex]);
  }, [selectedImage, photos]);

  const handlePrevImage = useCallback(() => {
    if (!selectedImage || photos.length === 0) return;
    setIsFullImageLoading(true);
    const currentIndex = photos.findIndex(p => p.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedImage(photos[prevIndex]);
  }, [selectedImage, photos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'Escape') {
        handleCloseDialog();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, handleNextImage, handlePrevImage]);

  return (
    <>
      <section className="h-full w-full flex-shrink-0 flex flex-col bg-transparent ">
        <header className="text-left ">
          <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">
            Photography
          </h2>
          <p className="text-lg text-muted-foreground font-body">Capturing moments and perspectives.</p>
        </header>
        
        <div className="flex-grow w-full overflow-y-auto no-scrollbar ">
            {isLoading ? (
              <MasonrySkeleton />
            ) : (
              <MasonryGallery photos={photos} onImageClick={handleImageClick} />
            )}
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="p-0 border-none bg-transparent w-full max-w-5xl h-[90vh] shadow-none flex items-center justify-center">
          {selectedImage && (
            <div className='relative w-full h-full group'>
               {isFullImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                   <Skeleton className="w-full h-full rounded-xl" />
                   <Loader2 className="absolute h-12 w-12 text-primary animate-spin" />
                </div>
              )}
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.description}
                fill
                className="object-contain rounded-xl"
                sizes="100vw"
                onLoad={() => setIsFullImageLoading(false)}
                style={{ opacity: isFullImageLoading ? 0 : 1 }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end rounded-b-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                 <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-white font-headline text-left max-w-[75%]">{selectedImage.description}</DialogTitle>
                    <DialogDescription className="text-left">
                        {selectedImage.unsplashUrl && (
                        <Button asChild variant="outline" size="sm" className="bg-card/20 backdrop-blur-sm border-white/20 text-white hover:bg-card/50 hover:text-white mt-2">
                            <Link href={selectedImage.unsplashUrl} target="_blank" rel="noopener noreferrer">
                            View Full Quality
                            <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        )}
                    </DialogDescription>
                </DialogHeader>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-card/20 backdrop-blur-sm border-white/20 text-white hover:bg-card/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handlePrevImage}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-card/20 backdrop-blur-sm border-white/20 text-white hover:bg-card/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleNextImage}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
