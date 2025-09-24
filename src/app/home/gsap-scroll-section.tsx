"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const words = [
  { text: "BOLD", font: "font-stardos" },
  { text: "UNIQUE", font: "font-script" },
  { text: "COOL", font: "font-melodrama" },
  { text: "FUNCTIONAL", font: "font-code" }
];

export function GsapScrollSection() {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray<HTMLDivElement>(".panel", slider.current!);
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + slider.current!.offsetWidth
        }
      });
      
      // BOLD animation
      const boldChars = gsap.utils.toArray<HTMLSpanElement>('.bold-char');
      gsap.from(boldChars, {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: panels[0],
          containerAnimation: gsap.getTweensOf(panels)[0],
          start: 'left center',
          toggleActions: 'play none none reverse',
        },
      });

      // UNIQUE animation
      const uniqueChars = gsap.utils.toArray<HTMLSpanElement>('.unique-char');
      gsap.from(uniqueChars, {
        y: 100,
        opacity: 0,
        stagger: {
          each: 0.05,
          from: "random"
        },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: panels[1],
          containerAnimation: gsap.getTweensOf(panels)[0],
          start: 'left center',
          toggleActions: 'play none none reverse',
        },
      });

      // COOL animation
      const coolChars = gsap.utils.toArray<HTMLSpanElement>('.cool-char');
      gsap.from(coolChars, {
        y: 'random(-50, 50)',
        opacity: 0,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: panels[2],
          containerAnimation: gsap.getTweensOf(panels)[0],
          start: 'left center',
          toggleActions: 'play none none reverse',
        },
      });

      // FUNCTIONAL animation
      const functionalChars = gsap.utils.toArray<HTMLSpanElement>('.functional-char');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panels[3],
          containerAnimation: gsap.getTweensOf(panels)[0],
          start: 'left center',
          toggleActions: 'play none none reverse',
        },
      })
      .from(functionalChars, {
        x: -50,
        opacity: 0,
        stagger: 0.05,
        ease: 'power3.out'
      })
      .from(functionalChars, {
        filter: 'blur(5px)',
        duration: 0.5
      }, "-=0.8");


    }, component);
    return () => ctx.revert();
  }, []);
  
  const renderWord = (word: string, baseClass: string, font: string) => (
    <h2 className={cn("text-6xl md:text-8xl lg:text-9xl tracking-tight text-center", font)}>
      {word.split("").map((char, i) => (
        <span key={i} className={`inline-block ${baseClass}-char`}>{char}</span>
      ))}
    </h2>
  );

  return (
    <div ref={component} className="w-full">
      <div ref={slider} className="flex w-full h-screen overflow-x-hidden">
        {words.map((word, index) => (
          <div key={word.text} className="panel w-full h-full flex-shrink-0 flex items-center justify-center">
            {renderWord(word.text, word.text.toLowerCase(), word.font)}
          </div>
        ))}
      </div>
    </div>
  );
}
