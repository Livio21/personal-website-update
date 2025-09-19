"use client"

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useTransition, animated } from '@react-spring/web';

type Hobby = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

interface HobbiesContentProps {
  hobbies: Hobby[];
}

export function HobbiesContent({ hobbies }: HobbiesContentProps) {
  // A more dynamic masonry-like layout
  const spans = [
    'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1', 
    'col-span-1 row-span-1', 'col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2',
  ];

  const transitions = useTransition(hobbies, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    trail: 100,
    keys: item => item.id
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] gap-4 pl-8">
      {transitions((style, hobby, t, index) => (
        <animated.div style={style} className={spans[index % spans.length]}>
          <Card key={hobby.id} className="overflow-hidden group relative bg-card/60 border-none h-full">
            <CardContent className="p-0 w-full h-full">
              <Image
                src={hobby.imageUrl}
                alt={hobby.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={hobby.imageHint}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              />
              <div className="absolute inset-0 bg-black/50 flex items-end p-4 transition-opacity opacity-0 group-hover:opacity-100">
                <h3 className="text-lg font-semibold text-white">{hobby.description}</h3>
              </div>
            </CardContent>
          </Card>
        </animated.div>
      ))}
    </div>
  );
}
