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

    const cardCount = experience.length;
    // Calculation:
    // We want the horizontal scroll to end when the last card is fully visible.
    // The container has padding, and there are gaps between cards.
    // Total width of cards area: cardCount * cardWidth
    // A simpler approach that works well is to transform based on the number of items.
    // We have an initial screen view, plus `cardCount` items. Let's scroll `cardCount` "screens".
    // A transform of `-${100 * (cardCount / (cardCount + 1))}%` often works well.
    // Let's try a simpler approach: `calc(-100% + 100vw)` is a common pattern.
    // But given the dynamic content, let's stick to a multiplier.
    // If we have 4 cards, we want to scroll past the intro (1 screen width) and see all cards.
    const x = useTransform(scrollYProgress, [0, 0.9], ["0%", `calc(-100% + 100vw - 12rem)`]);
    
    // This defines the total height of the scrollable area.
    // 300vh means it will take 3 "screens" of scrolling to finish the horizontal animation.
    const height = "400vh";

    return (
        <section ref={targetRef} style={{ height }} className="relative">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex items-stretch gap-12 pl-[5vw]">
                     <div className="flex-shrink-0 w-[90vw] flex flex-col items-center justify-center text-center px-8">
                        <h2 className="text-4xl md:text-6xl font-light font-headline mb-4">
                            Professional Experience
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl">
                            A journey through my roles and responsibilities in the tech industry. Keep scrolling to explore.
                        </p>
                    </div>
                    {experience.map((exp, index) => (
                        <div key={index} className="flex-shrink-0 w-[400px] flex items-center justify-center p-4">
                            <ExperienceCard item={exp} />
                        </div>
                    ))}
                    <div className="flex-shrink-0 w-[5vw]"></div>
                </motion.div>
            </div>
        </section>
    );
}
