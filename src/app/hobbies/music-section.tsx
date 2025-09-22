
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { getWeeklyTopAlbums, getWeeklyTopTracks, LastfmAlbum, LastfmTrack } from '@/lib/lastfm';
import { Skeleton } from '@/components/ui/skeleton';
import { Play } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const username = process.env.NEXT_PUBLIC_LASTFM_USERNAME || 'doresty';

function MusicSkeleton() {
    return (
        <section className="h-full w-full flex-shrink-0 flex flex-col items-center justify-center">
            <div className="text-left w-full max-w-6xl mb-8">
                <Skeleton className="h-12 w-48 mb-2" />
                <Skeleton className="h-6 w-96" />
            </div>
            <div className="flex-grow w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className='flex flex-col items-center text-center'>
                    <Skeleton className="h-8 w-48 mb-4" />
                    <Skeleton className="w-full max-w-xs h-auto aspect-square rounded-full" />
                    <div className="mt-4 text-center">
                        <Skeleton className="h-8 w-48 mx-auto mb-2" />
                        <Skeleton className="h-6 w-32 mx-auto" />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <Skeleton className="h-8 w-48 mb-4" />
                    <div className="relative group w-full max-w-xs aspect-square">
                        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                            {[...Array(4)].map((_, i) => <Skeleton key={i} className="w-full h-full rounded-md" />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function MusicSection() {
    const [topTrack, setTopTrack] = useState<LastfmTrack | null>(null);
    const [topAlbums, setTopAlbums] = useState<LastfmAlbum[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchMusicData = async () => {
            setIsLoading(true);
            try {
                const [tracks, albums] = await Promise.all([
                    getWeeklyTopTracks(username),
                    getWeeklyTopAlbums(username),
                ]);

                if (tracks.length > 0) {
                    const track = tracks[0];
                    const albumArt = albums.find(a => a.artist === track.artist)?.image || track.image;
                    setTopTrack({ ...track, image: albumArt });
                }

                setTopAlbums(albums);
            } catch (error) {
                console.error("Failed to fetch Last.fm data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMusicData();
    }, []);

    if (isLoading) {
        return <MusicSkeleton />;
    }

    return (
    <section className="h-full w-full flex-shrink-0 flex flex-col items-center justify-center">
      <div className="text-left w-full  mb-8">
        <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">
          Music
        </h2>
        <p className="text-lg text-muted-foreground font-body">A glimpse into what I'm listening to, powered by Last.fm.</p>
      </div>

      <div className="flex-grow w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Top Track of the Week */}
        <div className='group flex flex-col items-center text-center'>
            <h3 className="text-2xl font-light mb-4 text-primary font-headline">Top Track This Week</h3>
            {topTrack ? (
                <div className="relative w-full max-w-xs aspect-square record-container">
                    <Image
                        src={topTrack.image || 'https://picsum.photos/seed/vinyl/600/600'}
                        alt={`Album art for ${topTrack.name} by ${topTrack.artist}`}
                        width={600}
                        height={600}
                        className="record object-cover w-full h-full rounded-full shadow-lg"
                        data-ai-hint="album cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button asChild size="icon" className="w-20 h-20 bg-primary/80 hover:bg-primary play-icon opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                            <Link href={topTrack.url} target="_blank" rel="noopener noreferrer">
                                <Play className="w-8 h-8 fill-primary-foreground text-primary-foreground" />
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : <p className='text-muted-foreground'>Could not load top track.</p>}
            <div className="mt-4 text-center">
                {topTrack && (
                    <>
                        <h4 className="text-2xl font-light font-headline">{topTrack.name}</h4>
                        <p className="text-lg text-muted-foreground mb-4 font-body">{topTrack.artist}</p>
                    </>
                )}
            </div>
        </div>

        {/* Top Albums of the Week */}
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-light mb-4 font-headline">Top Albums This Week</h3>
            <div className="relative group w-full max-w-xs aspect-square">
                {topAlbums.length > 0 ? (
                     <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                        {topAlbums.slice(0, 4).map((album, index) => (
                            <Card key={album.name + index} className="overflow-hidden bg-card/40 backdrop-blur-sm border-none shadow-lg group/item">
                                <CardContent className="p-0 w-full h-full relative">
                                    <Image
                                        src={album.image || 'https://picsum.photos/seed/album/300/300'}
                                        alt={`Album art for ${album.name} by ${album.artist}`}
                                        width={300}
                                        height={300}
                                        className="object-cover w-full h-full"
                                        data-ai-hint="album art"
                                    />
                                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-2 text-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                        <Button asChild variant="link" className="text-primary font-bold font-body">
                                            <Link href={album.url} target="_blank" rel="noopener noreferrer">
                                                Listen
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className='text-muted-foreground'>No albums to display.</p>
                )}
                {topAlbums.length > 4 && (
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
        <DialogContent className="bg-card/80 backdrop-blur-lg border-white/10 sm:max-w-4xl max-h-[80vh]">
          <h3 className="text-2xl font-light font-headline text-primary mt-2">All Top Albums</h3>
            <ScrollArea className="h-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
                  {topAlbums.map((album, index) => (
                      <Card key={album.name+index} className="group overflow-hidden bg-card/40 backdrop-blur-sm border-none aspect-square shadow-lg transition-transform duration-300 rounded-md">
                          <CardContent className="p-0 w-full h-full relative">
                          <Image
                              src={album.image || 'https://picsum.photos/seed/album/300/300'}
                              alt={`Album art for ${album.name} by ${album.artist}`}
                              width={300}
                              height={300}
                              className="object-cover w-full h-full"
                              data-ai-hint="album art"
                          />
                          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Button asChild variant="link" className="text-primary font-bold font-body">
                                  <Link href={album.url} target="_blank" rel="noopener noreferrer">
                                      Listen
                                  </Link>
                              </Button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity">
                              <p className="font-semibold text-white truncate font-headline">{album.name}</p>
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
