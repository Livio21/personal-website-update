import Image from 'next/image';
import { Music, GitBranch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function MusicSection() {
    const musicImages = PlaceHolderImages.filter(p => p.id.startsWith('hobby-music-'));
    const guitarImage = musicImages.find(p => p.id === 'hobby-music-1');
    const pianoImage = musicImages.find(p => p.id === 'hobby-music-2');

    return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center relative p-8 md:p-16 pt-24 bg-background/90">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-4 justify-center">
          <Music className="text-primary size-10" />
          Music
        </h2>
        <p className="text-lg text-muted-foreground">Creating melodies and exploring sounds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <Card className="md:col-span-1 bg-card/60 backdrop-blur-sm border-white/10 flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <GitBranch className="text-accent" />
                    My Instruments
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground">
                    I find joy in expressing myself through music. The guitar is my primary instrument, where I love to explore everything from intricate fingerstyle patterns to powerful rock riffs. I also play the piano, which offers a different creative outlet and a deeper understanding of music theory.
                </p>
            </CardContent>
        </Card>

        <div className="md:col-span-2 grid grid-cols-1 grid-rows-2 gap-8 h-[400px] md:h-auto">
          {guitarImage && (
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={guitarImage.imageUrl}
                alt={guitarImage.description}
                fill
                className="object-cover"
                data-ai-hint={guitarImage.imageHint}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{guitarImage.description}</h3>
            </div>
          )}
          {pianoImage && (
             <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={pianoImage.imageUrl}
                    alt={pianoImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={pianoImage.imageHint}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{pianoImage.description}</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
