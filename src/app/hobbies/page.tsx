
"use client"

import { useEffect, useState } from 'react';
import { PhotographySection } from './photography-section';
import { MusicSection } from './music-section';
import { BlogSection } from './blog-section';
import { HobbiesNav } from './hobbies-nav';
import { getRecentTracks, type LastFmTrack } from './actions';
import { Skeleton } from '@/components/ui/skeleton';

export default function HobbiesPage() {
  const [tracks, setTracks] = useState<LastFmTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const fetchedTracks = await getRecentTracks();
        setTracks(fetchedTracks);
      } catch (error) {
        console.error("Failed to fetch Last.fm tracks for page:", error);
        // Tracks will remain an empty array, and MusicSection will handle the error display
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <HobbiesNav />
      <div 
        id="hobbies-scroll-container"
        className="flex w-full h-full snap-x snap-mandatory overflow-x-scroll no-scrollbar"
      >
        <div id="Photography" className="w-full h-full flex-shrink-0 snap-start">
            <PhotographySection />
        </div>
        <div id="Music" className="w-full h-full flex-shrink-0 snap-start">
          {loading ? (
            <section className="h-screen w-full snap-start flex-shrink-0 flex flex-col p-8 md:p-16 pt-24 bg-background/90 overflow-y-auto no-scrollbar">
                <div className="text-left mb-8">
                    <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">
                        Music
                    </h2>
                    <p className="text-lg text-muted-foreground font-body">What I'm currently listening to, via Last.fm.</p>
                </div>
                <div className='flex-grow flex items-center justify-center'>
                    <Skeleton className="h-[400px] w-full max-w-lg" />
                </div>
            </section>
          ) : (
            <MusicSection tracks={tracks} />
          )}
        </div>
        <div id="Blog" className="w-full h-full flex-shrink-0 snap-start">
            <BlogSection />
        </div>
      </div>
    </div>
  );
}
