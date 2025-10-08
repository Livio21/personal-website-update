
"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Terminal } from './terminal';
import { AnimatedHeadline } from './animated-headline';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {

  return (
      <div className="w-full min-h-screen  flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="segment-1 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-8xl items-center pt-20 md:pt-0 h-screen">
          <div className="flex flex-col gap-8 text-center md:text-left">
            <header className="mb-4">
              <AnimatedHeadline />
              <p className="max-w-2xl mx-auto md:mx-0 text-lg text-muted-foreground font-body mt-8">
                I'm <span className="font-script text-xl font-thin text-primary underline underline-dashed underline-offset-2 decoration-1 italic">&nbsp;Livio Macaj&nbsp;</span>
                 a Software Engineer with a Bachelor's and Master's from the Canadian Institute of Technology. I specialize in building robust web applications with technologies like Python, Odoo, Vue.js, and React. I enjoy solving complex problems and collaborating with teams to deliver clean, efficient solutions. Let's connect to discuss new opportunities or bring your next idea to life!
              </p>
            </header>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" variant="glass">
                <Link href="/projects" >
                  View My Work
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
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
