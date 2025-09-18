import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export default function HobbiesPage() {
  const hobbies = PlaceHolderImages.filter(p => p.id.startsWith('hobby-'));
  const getSpan = (index: number) => {
    if ((index + 1) % 5 === 1 || (index + 1) % 5 === 2) {
      return 'col-span-2 row-span-2';
    }
    if ((index + 1) % 5 === 3) {
      return 'col-span-1 row-span-2';
    }
    return 'col-span-1 row-span-1';
  }

  return (
    <div className="w-full">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Hobbies & Interests</h1>
        <p className="text-lg text-muted-foreground">When I&apos;m not coding, you can find me...</p>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-fr">
        {hobbies.map((hobby, index) => (
          <Card key={hobby.id} className={`overflow-hidden group bg-card/60 backdrop-blur-lg border-none rounded-none transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${getSpan(index)}`}>
            <CardContent className="p-0 relative w-full h-full">
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
