"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Music, Mic, Headset } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const albums = [
    {
        title: "Currents",
        artist: "Tame Impala",
        imageUrl: "https://picsum.photos/seed/album1/300/300",
        imageHint: "psychedelic rock",
        spotifyUrl: "https://open.spotify.com/album/79dL7FLiJFOO0EoehUHQBv",
    },
    {
        title: "Blonde",
        artist: "Frank Ocean",
        imageUrl: "https://picsum.photos/seed/album2/300/300",
        imageHint: "abstract album",
        spotifyUrl: "https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf",
    },
    {
        title: "Random Access Memories",
        artist: "Daft Punk",
        imageUrl: "https://picsum.photos/seed/album3/300/300",
        imageHint: "disco music",
        spotifyUrl: "https://open.spotify.com/album/4m2880jivSbbyEGAKfITCa",
    },
    {
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        imageUrl: "https://picsum.photos/seed/album4/300/300",
        imageHint: "prism light",
        spotifyUrl: "https://open.spotify.com/album/4LH4d3cOWNNsVw41Gqt2kv",
    },
    {
        title: "AM",
        artist: "Arctic Monkeys",
        imageUrl: "https://picsum.photos/seed/album5/300/300",
        imageHint: "soundwave line",
        spotifyUrl: "https://open.spotify.com/album/78bpIziExqiI9qztvNFlQu",
    },
    {
        title: "Discovery",
        artist: "Daft Punk",
        imageUrl: "https://picsum.photos/seed/album6/300/300",
        imageHint: "futuristic chrome",
        spotifyUrl: "https://open.spotify.com/album/2noRn2Aes5aoNVsU6iWThc"
    }
];

export function MusicSection() {
    return (
    <section className="h-screen w-full snap-start flex-shrink-0 flex flex-col p-8 md:p-16 pt-24 bg-background/90 overflow-y-auto no-scrollbar">
      <div className="text-left mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-4">
          <Music className="text-primary size-10" />
          Music
        </h2>
        <p className="text-lg text-muted-foreground">A few of the albums I have on repeat.</p>
      </div>

      <TooltipProvider>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 w-full max-w-6xl">
            {albums.map((album) => (
                <Tooltip key={album.title} delayDuration={150}>
                    <TooltipTrigger asChild>
                        <Link href={album.spotifyUrl} target="_blank" rel="noopener noreferrer">
                            <Card className="overflow-hidden group relative bg-card/60 border-none aspect-square shadow-lg transition-transform duration-300 hover:scale-105">
                                <CardContent className="p-0 w-full h-full">
                                <Image
                                    src={album.imageUrl}
                                    alt={`Album art for ${album.title} by ${album.artist}`}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={album.imageHint}
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-lg font-bold text-white">{album.title}</h3>
                                    <p className="text-sm text-muted-foreground">{album.artist}</p>
                                    <Headset className="w-8 h-8 text-primary mt-3" />
                                </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{album.title} by {album.artist}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
      </TooltipProvider>
    </section>
  );
}
