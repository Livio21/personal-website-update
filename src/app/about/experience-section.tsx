"use client"

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience } from './data';
import { ExperienceCard } from './experience-card';

export function ExperienceSection() {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    const cardWidth = 400;
    const gap = 48; // Corresponds to gap-12
    const introCardWidthVW = 90; // w-[90vw]
    const marginVW = 5; // pl-[5vw] + w-[5vw]
    
    // Total width of all experience cards and gaps
    const totalCardsWidth = experience.length * (cardWidth + gap);

    // We calculate the total width needed for the horizontal scroll area
    // It's the width of the intro card (as a percentage of vw) plus the pixel width of all experience cards
    // We express this in a calc() function for CSS
    const totalWidth = `calc(${introCardWidthVW}vw + ${totalCardsWidth}px + ${marginVW * 2}vw)`;
    
    // The transformation will move the container from its starting position (0)
    // to a final position where the end of the last card is aligned with the right edge of the viewport.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", `calc(-100% + 100vw)`]);
    
    // The height of the scrollable area determines the scroll "speed".
    // A larger height means you have to scroll more vertically to move the content horizontally.
    const height = `${experience.length * 125}vh`;

    return (
        <section ref={targetRef} style={{ height }} className="relative">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x, width: totalWidth }} className="flex items-stretch gap-12 pl-[5vw]">
                     <div className="flex-shrink-0 w-[90vw] flex flex-col items-center justify-center text-center px-8">
                        <h2 className="text-4xl md:text-6xl font-light font-headline mb-4">
                            Professional Experience
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl">
                            A journey through my roles and responsibilities in the tech industry. Keep scrolling to explore.
                        </p>
                    </div>
                    {experience.map((exp, index) => (
                        <div key={index} className="flex-shrink-0 flex items-center justify-center" style={{width: `${cardWidth}px`}}>
                            <ExperienceCard item={exp} />
                        </div>
                    ))}
                    <div className="flex-shrink-0 w-[5vw]"></div>
                </motion.div>
            </div>
        </section>
    );
}
