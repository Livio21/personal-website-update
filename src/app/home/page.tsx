import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import PrismShape from '@/components/prism-shape';

export default function Home() {
  return (
    <div className="w-full p-8 md:p-24 md:pl-32">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          Livio Macaj
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          I'm a Software Developer with nearly two years of experience building web apps. I hold a Bachelor's and Master's in Software Engineering from the Canadian Institute of Technology, and I've shipped projects using React (Remix, Router), Vue.js, and Python/Odoo. I thrive on turning complex requirements into clean, maintainable solutions and love collaborating across teams. Let's connect to discuss opportunities or your next big idea!
        </p>
      </header>
      
      <div className="flex flex-col items-start gap-8">
        <div className="relative w-full max-w-md">
          <PrismShape />
        </div>
        
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
      </div>
    </div>
  );
}
