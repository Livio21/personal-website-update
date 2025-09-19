import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="w-full p-8 md:p-24 md:pl-32">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400">
          Livio Macaj
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          I'm a Software Engineer with a Bachelor's and Master's from the Canadian Institute of Technology. I specialize in building robust web applications with technologies like Python, Odoo, Vue.js, and React. I enjoy solving complex problems and collaborating with teams to deliver clean, efficient solutions. Let's connect to discuss new opportunities or bring your next idea to life!
        </p>
      </header>
      
      <div className="flex flex-col items-start gap-8">
        <div className="flex gap-4">
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
    </div>
  );
}
