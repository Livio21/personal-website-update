"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import type { LastFmTrack } from './actions';

interface MusicSectionProps {
    tracks: LastFmTrack[];
}

export function MusicSection({ tracks }: MusicSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!tracks || tracks.length === 0) {
        return (
            <section className="h-screen w-full snap-start flex-shrink-0 flex flex-col p-8 md:p-16 pt-24 bg-background/90 overflow-y-auto no-scrollbar">
                <div className="text-left mb-8">
                    <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">
                        Music
                    </h2>
                    <p className="text-lg text-muted-foreground font-body">What I'm currently listening to, via Last.fm.</p>
                </div>
                <div className='flex-grow flex items-center justify-center text-center text-muted-foreground font-body'>
                    <p>Could not load tracks from Last.fm. <br/> Please set up your API key or check the console for errors.</p>
                </div>
            </section>
        );
    }

    const featuredTrack = tracks[0];
    const otherTracks = tracks.slice(1);
    const rotationPreview = otherTracks.slice(0, 4);

    return (
    <section className="h-screen w-full snap-start flex-shrink-0 flex flex-col p-8 md:p-16 pt-24 bg-background/90 overflow-y-auto no-scrollbar">
      <div className="text-left mb-8">
        <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">
          Music
        </h2>
        <p className="text-lg text-muted-foreground font-body">What I'm currently listening to, via Last.fm.</p>
      </div>

      <div className="flex-grow w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Featured Album */}
        <div className='group flex flex-col items-center text-center'>
            <h3 className="text-2xl font-light mb-4 text-primary font-headline">Recently Played</h3>
            <Card className="w-full max-w-sm overflow-hidden bg-card/60 border-none aspect-square shadow-lg transition-transform duration-300 group-hover:scale-105">
                <Image
                    src={featuredTrack.image.find(i => i.size === 'extralarge')?.['#text'] || "https://picsum.photos/seed/album3/600/600"}
                    alt={`Album art for ${featuredTrack.name} by ${featuredTrack.artist['#text']}`}
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    data-ai-hint={"album cover"}
                    priority
                />
            </Card>
            <div className="mt-4">
                <h4 className="text-3xl font-light font-headline">{featuredTrack.name}</h4>
                <p className="text-xl text-muted-foreground mb-4 font-body">{featuredTrack.artist['#text']}</p>
                <Button asChild>
                    <Link href={featuredTrack.url} target="_blank" rel="noopener noreferrer">
                        View on Last.fm
                    </Link>
                </Button>
            </div>
        </div>

        {/* Other Albums */}
        {tracks.length > 1 && (
            <div className="flex flex-col items-center">
                <h3 className="text-2xl font-light mb-4 font-headline">On Rotation</h3>
                <div className="relative group w-full max-w-sm aspect-square">
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                        {rotationPreview.map((track, index) => (
                            <Card key={track.name + index} className="overflow-hidden bg-card/60 border-none shadow-lg group/item">
                                <CardContent className="p-0 w-full h-full relative">
                                    <Image
                                        src={track.image.find(i => i.size === 'large')?.['#text'] || "https://picsum.photos/seed/album1/300/300"}
                                        alt={`Album art for ${track.name} by ${track.artist['#text']}`}
                                        width={300}
                                        height={300}
                                        className="object-cover w-full h-full"
                                        data-ai-hint="album art"
                                    />
                                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-2 text-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                        <Button asChild variant="link" className="text-primary font-bold font-body">
                                            <Link href={track.url} target="_blank" rel="noopener noreferrer">
                                                Listen
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {otherTracks.length > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 z-10 bg-card/50 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(true)}
                        >
                            View All
                        </Button>
                    )}
                </div>
            </div>
        )}
      </div>

       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card/80 backdrop-blur-lg border-white/10 sm:max-w-4xl max-h-[85vh]">
          <ScrollArea className="h-full pr-4 -mr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
                {otherTracks.map((track, index) => (
                    <Card key={track.name+index} className="group overflow-hidden bg-card/60 border-none aspect-square shadow-lg transition-transform duration-300 hover:scale-105 rounded-md">
                        <CardContent className="p-0 w-full h-full relative">
                        <Image
                            src={track.image.find(i => i.size === 'large')?.['#text'] || "https://picsum.photos/seed/album-other/300/300"}
                            alt={`Album art for ${track.name} by ${track.artist['#text']}`}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                            data-ai-hint="album art"
                        />
                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button asChild variant="link" className="text-primary font-bold font-body">
                                <Link href={track.url} target="_blank" rel="noopener noreferrer">
                                    Listen
                                </Link>
                            </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity">
                            <p className="font-semibold text-white truncate font-headline">{track.name}</p>
                            <p className="text-sm text-gray-300 truncate font-body">{track.artist['#text']}</p>
                        </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
}
