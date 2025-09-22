"use client"

import { PhotographySection } from './photography-section';
import { MusicSection } from './music-section';
import { BlogSection } from './blog-section';
import { HobbiesNav } from './hobbies-nav';

export default function HobbiesPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden pt-24 ">
      <HobbiesNav />
      <div 
        id="hobbies-scroll-container"
        className="flex w-full h-full snap-x snap-mandatory overflow-x-scroll no-scrollbar"
      >
        <div id="Photography" className="w-full h-full flex-shrink-0 snap-start">
            <PhotographySection />
        </div>
        <div id="Music" className="w-full h-full flex-shrink-0 snap-start">
            <MusicSection />
        </div>
        <div id="Blog" className="w-full h-full flex-shrink-0 snap-start">
            <BlogSection />
        </div>
      </div>
    </div>
  );
}
