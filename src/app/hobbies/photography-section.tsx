import { HobbiesContent } from './hobbies-content';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Camera } from 'lucide-react';

export function PhotographySection() {
  const photographyHobbies = PlaceHolderImages.filter(p => p.id.startsWith('hobby-photo-'));

  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center relative p-8 md:p-16 bg-background/80">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-4 justify-center">
          <Camera className="text-primary size-10" />
          Photography
        </h2>
        <p className="text-lg text-muted-foreground">Capturing moments and perspectives.</p>
      </div>
      <HobbiesContent hobbies={photographyHobbies} />
    </section>
  );
}
