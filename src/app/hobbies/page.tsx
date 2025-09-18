import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export default function HobbiesPage() {
  const hobbies = PlaceHolderImages.filter(p => p.id.startsWith('hobby-'));
  
  // A more dynamic masonry-like layout
  const spans = [
    'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1', 
    'col-span-1 row-span-1', 'col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2',
  ];

  return (
    <div className="w-full">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Hobbies & Interests</h1>
        <p className="text-lg text-muted-foreground">When I&apos;m not coding, you can find me...</p>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] gap-1">
        {hobbies.map((hobby, index) => (
          <Card key={hobby.id} className={`overflow-hidden group relative bg-card/60 border-none rounded-lg ${spans[index % spans.length]}`}>
            <CardContent className="p-0 w-full h-full">
              <Image
                src={hobby.imageUrl}
                alt={hobby.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={hobby.imageHint}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
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
