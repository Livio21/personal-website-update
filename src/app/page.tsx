import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import PrismShape from '@/components/prism-shape';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center h-full">
      <div className="relative w-full max-w-lg mx-auto mb-12">
        <PrismShape />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Prismfolio
      </h1>
      <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8">
        A creative developer and designer crafting beautiful, intuitive, and performant web experiences. Welcome to my digital space.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/projects">
            View My Work <ArrowRight className="ml-2" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Get In Touch</Link>
        </Button>
      </div>
    </main>
  );
}
