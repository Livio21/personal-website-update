"use client"

import { useState } from 'react';
import { HobbiesContent } from './hobbies-content';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Camera, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const INITIAL_VISIBLE_IMAGES = 5;

export function PhotographySection() {
  const photographyHobbies = PlaceHolderImages.filter(p => p.id.startsWith('hobby-photo-'));
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleHobbies = isExpanded ? photographyHobbies : photographyHobbies.slice(0, INITIAL_VISIBLE_IMAGES);
  const canExpand = photographyHobbies.length > INITIAL_VISIBLE_IMAGES;

  return (
    <section className="h-screen w-full snap-start flex-shrink-0 flex flex-col p-8 md:p-16 pt-24 bg-background/80 overflow-y-auto no-scrollbar">
      <div className="text-left mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-4">
          <Camera className="text-primary size-10" />
          Photography
        </h2>
        <p className="text-lg text-muted-foreground">Capturing moments and perspectives.</p>
      </div>
      <div className="flex-grow w-full">
        <HobbiesContent hobbies={visibleHobbies} />
      </div>
      {canExpand && (
        <div className="mt-4 text-center">
          <Button onClick={() => setIsExpanded(!isExpanded)} variant="outline" className="bg-card/50 backdrop-blur-sm">
            {isExpanded ? <Minus className="mr-2" /> : <Plus className="mr-2" />}
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      )}
    </section>
  );
}
