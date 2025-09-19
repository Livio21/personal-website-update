import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { HobbiesContent } from './hobbies-content';

export default function HobbiesPage() {
  const hobbies = PlaceHolderImages.filter(p => p.id.startsWith('hobby-'));
  
  return (
    <div className="w-full">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Hobbies & Interests</h1>
        <p className="text-lg text-muted-foreground">When I&apos;m not coding, you can find me...</p>
      </header>
      
      <HobbiesContent hobbies={hobbies} />
    </div>
  );
}
