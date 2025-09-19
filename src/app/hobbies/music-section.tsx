"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Music, PlayCircle, Headset } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


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
    }
];

export function MusicSection() {
    const featuredAlbum = albums.find(a => a.featured);
    const otherAlbums = albums.filter(a => !a.featured);

    return (
    <section className="h-screen w-full snap-start flex-shrink-0 flex flex-col p-8 md:p-16 pt-24 bg-background/90 overflow-y-auto no-scrollbar">
      <div className="text-left mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-4">
          <Music className="text-primary size-10" />
          Music
        </h2>
        <p className="text-lg text-muted-foreground">A few of the albums I have on repeat.</p>
      </div>

      <div className="w-full max-w-6xl space-y-8">
        {/* Featured Album */}
        {featuredAlbum && (
            <div className='group'>
                <h3 className="text-2xl font-semibold mb-4 text-primary">Featured Album</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-1">
                        <Card className="overflow-hidden bg-card/60 border-none aspect-square shadow-lg transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src={featuredAlbum.imageUrl}
                                alt={`Album art for ${featuredAlbum.title} by ${featuredAlbum.artist}`}
                                width={600}
                                height={600}
                                className="object-cover w-full h-full"
                                data-ai-hint={featuredAlbum.imageHint}
                            />
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <h4 className="text-3xl font-bold">{featuredAlbum.title}</h4>
                        <p className="text-xl text-muted-foreground mb-4">{featuredAlbum.artist}</p>
                        <Button asChild>
                            <Link href={featuredAlbum.spotifyUrl} target="_blank" rel="noopener noreferrer">
                                <PlayCircle className="mr-2"/> Listen on Spotify
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )}

        {/* Other Albums */}
        <div>
             <h3 className="text-2xl font-semibold my-4">On Rotation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {otherAlbums.map((album) => (
                    <div key={album.title} className="group">
                        <Card className="overflow-hidden bg-card/60 border-none aspect-square shadow-lg transition-transform duration-300 group-hover:scale-105 mb-2">
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
                                <Link href={album.spotifyUrl} target="_blank" rel="noopener noreferrer">
                                    <Headset className="w-10 h-10 text-primary" />
                                </Link>
                            </div>
                            </CardContent>
                        </Card>
                        <div className="text-left">
                           <p className="font-semibold truncate">{album.title}</p>
                           <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}