"use client"

import { useRef } from 'react';
import { Timeline } from './timeline';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative h-screen w-full flex flex-col overflow-hidden">
        <div className="text-center pt-24 pb-8 px-4">
            <h1 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">My Journey</h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-body">
                A timeline of my professional and academic background. Scroll horizontally to explore.
            </p>
        </div>
        <div ref={containerRef} className="flex-1 w-full overflow-x-auto overflow-y-hidden">
           <Timeline />
        </div>
    </main>
  );
}
