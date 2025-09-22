"use client"

import Image from 'next/image';
import { type ImagePlaceholder, getImageDimensions } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

interface MasonryGalleryProps {
  photos: ImagePlaceholder[];
  onImageClick: (photo: ImagePlaceholder) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function MasonryGallery({ photos, onImageClick }: MasonryGalleryProps) {
  return (
    <motion.div 
      className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {photos.map((photo, index) => {
        const { width, height } = getImageDimensions(photo);
        return (
          <motion.div 
            key={photo.id}
            className="mb-2 break-inside-avoid"
            variants={itemVariants}
            layout
          >
            <div
              className="relative overflow-hidden rounded-lg cursor-pointer group opacity-80 hover:opacity-100 border border-white/30 "
              onClick={() => onImageClick(photo)}
            >
              <Image
                src={photo.smallImageUrl || photo.imageUrl}
                alt={photo.description}
                width={width}
                height={height}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 "
                data-ai-hint={photo.imageHint}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                priority={index < 10}
              />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  );
}


export function MasonrySkeleton() {
    const heights = [250, 320, 280, 400, 350, 220, 380, 300, 260, 330];
    return (
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 animate-pulse">
            {heights.map((height, index) => (
                <Skeleton 
                    key={index}
                    className="mb-2 break-inside-avoid rounded-lg bg-card/50"
                    style={{ height: `${height}px` }}
                />
            ))}
        </div>
    )
}
