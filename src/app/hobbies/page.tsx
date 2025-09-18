import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export default function HobbiesPage() {
  const hobbies = PlaceHolderImages.filter(p => p.id.startsWith('hobby-'));

  return (
    <div className="w-full max-w-6xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Hobbies & Interests</h1>
        <p className="text-lg text-muted-foreground">When I&apos;m not coding, you can find me...</p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hobbies.map((hobby) => (
          <Card key={hobby.id} className="overflow-hidden group bg-card/60 backdrop-blur-lg border-border/20 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
            <CardContent className="p-0 relative aspect-square">
              <Image
                src={hobby.imageUrl}
                alt={hobby.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={hobby.imageHint}
              />
              <div className="absolute inset-0 bg-black/50 flex items-end p-4 transition-opacity opacity-0 group-hover:opacity-100">
                <h3 className="text-lg font-semibold text-white">{hobby.description}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
