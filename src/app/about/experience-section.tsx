"use client"

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience } from './data';
import { ExperienceCard } from './experience-card';

export function ExperienceSection() {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start'],
    });

    // Translate vertical scroll into horizontal movement
    // Adjust the multiplier (-2000) to control the scroll speed.
    // This value should be experimented with to get the right feel.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
    
    // This defines the total height of the scrollable area.
    // 300vh means it will take 3 "screens" of scrolling to finish the horizontal animation.
    const height = "300vh";

    return (
        <section ref={targetRef} style={{ height }} className="relative">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-12 px-12">
                     <div className="flex-shrink-0 w-screen flex flex-col items-center justify-center text-center px-8">
                        <h2 className="text-4xl md:text-6xl font-light font-headline mb-4">
                            Professional Experience
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl">
                            A journey through my roles and responsibilities in the tech industry. Keep scrolling to explore.
                        </p>
                    </div>
                    {experience.map((exp, index) => (
                        <div key={index} className="flex-shrink-0 w-[400px] h-[400px] flex items-center justify-center p-4">
                            <ExperienceCard item={exp} />
                        </div>
                    ))}
                    <div className="flex-shrink-0 w-[20vw]"></div>
                </motion.div>
            </div>
        </section>
    );
}
