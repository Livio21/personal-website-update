"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

const albums = [
    {
        title: "Random Access Memories",
        artist: "Daft Punk",
        imageUrl: "https://picsum.photos/seed/album3/600/600",
        imageHint: "disco music",
        spotifyUrl: "https://open.spotify.com/album/4m2880jivSbbyEGAKfITCa",
        featured: true
    },
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
    },
    {
        title: "Because the Internet",
        artist: "Childish Gambino",
        imageUrl: "https://picsum.photos/seed/album7/300/300",
        imageHint: "holographic",
        spotifyUrl: "https://open.spotify.com/album/4GNIhgEGXzWGAefgN5qjdU"
    },
    {
        title: "IGOR",
        artist: "Tyler, The Creator",
        imageUrl: "https://picsum.photos/seed/album8/300/300",
        imageHint: "pink suit",
        spotifyUrl: "https://open.spotify.com/album/5zi7WsKlIiUXv09ltAlcaK"
    }
];

export function MusicSection() {
    const featuredAlbum = albums.find(a => a.featured);
    const otherAlbums = albums.filter(a => !a.featured);
    const rotationPreview = otherAlbums.slice(0, 4);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
    <section className="h-screen w-full snap-start flex-shrink-0 flex flex-col p-8 md:p-16 pt-24 bg-background/90 overflow-y-auto no-scrollbar">
      <div className="text-left mb-8">
        <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">
          Music
        </h2>
        <p className="text-lg text-muted-foreground font-body">A few of the albums I have on repeat.</p>
      </div>

      <div className="flex-grow w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Featured Album */}
        {featuredAlbum && (
            <div className='group flex flex-col items-center text-center'>
                <h3 className="text-2xl font-light mb-4 text-primary font-headline">Featured Album</h3>
                <Card className="w-full max-w-sm overflow-hidden bg-card/60 border-none aspect-square shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src={featuredAlbum.imageUrl}
                        alt={`Album art for ${featuredAlbum.title} by ${featuredAlbum.artist}`}
                        width={600}
                        height={600}
                        className="object-cover w-full h-full"
                        data-ai-hint={featuredAlbum.imageHint}
                    />
                </Card>
                <div className="mt-4">
                    <h4 className="text-3xl font-light font-headline">{featuredAlbum.title}</h4>
                    <p className="text-xl text-muted-foreground mb-4 font-body">{featuredAlbum.artist}</p>
                    <Button asChild>
                        <Link href={featuredAlbum.spotifyUrl} target="_blank" rel="noopener noreferrer">
                            Listen on Spotify
                        </Link>
                    </Button>
                </div>
            </div>
        )}

        {/* Other Albums */}
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-light mb-4 font-headline">On Rotation</h3>
            <div className="relative group w-full max-w-sm aspect-square">
                <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                    {rotationPreview.map((album) => (
                        <Card key={album.title} className="overflow-hidden bg-card/60 border-none shadow-lg group/item">
                            <CardContent className="p-0 w-full h-full relative">
                                <Image
                                    src={album.imageUrl}
                                    alt={`Album art for ${album.title} by ${album.artist}`}
                                    width={300}
                                    height={300}
                                    className="object-cover w-full h-full"
                                    data-ai-hint={album.imageHint}
                                />
                                 <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-2 text-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                    <Button asChild variant="link" className="text-primary font-bold font-body">
                                        <Link href={album.spotifyUrl} target="_blank" rel="noopener noreferrer">
                                            Listen
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 z-10 bg-card/50 backdrop-blur-sm"
                    onClick={() => setIsModalOpen(true)}
                >
                    View All
                </Button>
            </div>
        </div>
      </div>

       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card/80 backdrop-blur-lg border-white/10 sm:max-w-4xl h-[85vh] max-h-[85vh]">
          <ScrollArea className="h-full pr-4 -mr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
                {otherAlbums.map((album) => (
                    <Card key={album.title} className="group overflow-hidden bg-card/60 border-none aspect-square shadow-lg transition-transform duration-300 hover:scale-105 rounded-md">
                        <CardContent className="p-0 w-full h-full relative">
                        <Image
                            src={album.imageUrl}
                            alt={`Album art for ${album.title} by ${album.artist}`}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                            data-ai-hint={album.imageHint}
                        />
                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button asChild variant="link" className="text-primary font-bold font-body">
                                <Link href={album.spotifyUrl} target="_blank" rel="noopener noreferrer">
                                    Listen
                                </Link>
                            </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity">
                            <p className="font-semibold text-white truncate font-headline">{album.title}</p>
                            <p className="text-sm text-gray-300 truncate font-body">{album.artist}</p>
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
