
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area';

const featuredTrack = {
    name: "Currents",
    artist: "Tame Impala",
    image: "https://picsum.photos/seed/album3/600/600",
    url: "#"
};

const otherTracks = [
    { name: "Discovery", artist: "Daft Punk", image: "https://picsum.photos/seed/album1/300/300", url: "#" },
    { name: "Blonde", artist: "Frank Ocean", image: "https://picsum.photos/seed/album2/300/300", url: "#" },
    { name: "AM", artist: "Arctic Monkeys", image: "https://picsum.photos/seed/album4/300/300", url: "#" },
    { name: "Good Kid, M.A.A.D City", artist: "Kendrick Lamar", image: "https://picsum.photos/seed/album5/300/300", url: "#" },
    { name: "The Dark Side of the Moon", artist: "Pink Floyd", image: "https://picsum.photos/seed/album6/300/300", url: "#" },
    { name: "Random Access Memories", artist: "Daft Punk", image: "https://picsum.photos/seed/album7/300/300", url: "#" },
    { name: "To Pimp a Butterfly", artist: "Kendrick Lamar", image: "https://picsum.photos/seed/album8/300/300", url: "#" },
    { name: "Wish You Were Here", artist: "Pink Floyd", image: "https://picsum.photos/seed/album9/300/300", url: "#" },
];

const rotationPreview = otherTracks.slice(0, 4);

export function MusicSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
    <section className="h-full w-full snap-start flex-shrink-0 flex flex-col items-center justify-center p-8 md:p-16 bg-background/90">
      <div className="text-left w-full max-w-6xl mb-8">
        <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">
          Music
        </h2>
        <p className="text-lg text-muted-foreground font-body">A glimpse into what I enjoy listening to.</p>
      </div>

      <div className="flex-grow w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Featured Album */}
        <div className='group flex flex-col items-center text-center'>
            <h3 className="text-2xl font-light mb-4 text-primary font-headline">All-Time Favorite</h3>
            <Card className="w-full max-w-xs overflow-hidden bg-card/60 border-none aspect-square shadow-lg transition-transform duration-300 ">
                <Image
                    src={featuredTrack.image}
                    alt={`Album art for ${featuredTrack.name} by ${featuredTrack.artist}`}
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    data-ai-hint={"album cover"}
                    priority
                />
            </Card>
            <div className="mt-4">
                <h4 className="text-2xl font-light font-headline">{featuredTrack.name}</h4>
                <p className="text-lg text-muted-foreground mb-4 font-body">{featuredTrack.artist}</p>
                <Button asChild size="sm">
                    <Link href={featuredTrack.url} target="_blank" rel="noopener noreferrer">
                        Listen on Spotify
                    </Link>
                </Button>
            </div>
        </div>

        {/* Other Albums */}
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-light mb-4 font-headline">On Rotation</h3>
            <div className="relative group w-full max-w-xs aspect-square">
                <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                    {rotationPreview.map((track, index) => (
                        <Card key={track.name + index} className="overflow-hidden bg-card/60 border-none shadow-lg group/item">
                            <CardContent className="p-0 w-full h-full relative">
                                <Image
                                    src={track.image}
                                    alt={`Album art for ${track.name} by ${track.artist}`}
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
      </div>

       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card/80 backdrop-blur-lg border-white/10 sm:max-w-4xl max-h-[85vh]">
          <ScrollArea className="h-full pr-4 -mr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
                {otherTracks.map((track, index) => (
                    <Card key={track.name+index} className="group overflow-hidden bg-card/60 border-none aspect-square shadow-lg transition-transform duration-300 rounded-md">
                        <CardContent className="p-0 w-full h-full relative">
                        <Image
                            src={track.image}
                            alt={`Album art for ${track.name} by ${track.artist}`}
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
                            <p className="text-sm text-gray-300 truncate font-body">{track.artist}</p>
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
