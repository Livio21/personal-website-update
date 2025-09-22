import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Terminal } from './terminal';

export default function Home() {
  return (
    <div className="w-full min-h-screen snap-start flex items-center justify-center p-4 sm:p-8 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl items-center pt-20 md:pt-0">
        {/* Left Column: Intro */}
        <div className="flex flex-col gap-8 md:text-left">
          <header className="mb-4">
            <h1 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400">
              Livio Macaj
            </h1>
            <p className="max-w-2xl mx-auto md:mx-0 text-lg text-muted-foreground font-body">
              I'm a Software Engineer with a Bachelor's and Master's from the Canadian Institute of Technology. I specialize in building robust web applications with technologies like Python, Odoo, Vue.js, and React. I enjoy solving complex problems and collaborating with teams to deliver clean, efficient solutions. Let's connect to discuss new opportunities or bring your next idea to life!
            </p>
          </header>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg">
              <Link href="/projects">
                View My Work
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <Terminal />
        </div>
      </div>
    </div>
  );
}
