"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "./data";
import { cn } from "@/lib/utils";
import * as Icons from "./timeline-icons";
import { Briefcase, GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    "Python/Odoo Developer": Icons.OdooIcon,
    "Canadian Institute of Technology": GraduationCap,
    "Freelance Web Developer": Briefcase,
};

const timelineEvents = [
    ...data.experience.map(item => ({ ...item, type: 'experience' as const })),
    ...data.education.map(item => ({ ...item, type: 'education' as const })),
].sort((a, b) => {
    const aYear = parseInt(a.date.split(' ')[1]);
    const bYear = parseInt(b.date.split(' ')[1]);
    return bYear - aYear;
});


export function Timeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                },
            });

            tl.fromTo(
                ".timeline-line",
                { scaleY: 0 },
                { scaleY: 1, duration: 1, ease: "power1.inOut" }
            );

            gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, index) => {
                tl.from(item, {
                    opacity: 0,
                    x: index % 2 === 0 ? -100 : 100,
                    duration: 0.5,
                    ease: "power2.out",
                }, "-=0.7"); // Staggered reveal
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef}>
            <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight text-primary mb-12 text-center">
                Career & Education
            </h2>
            <div ref={triggerRef} className="relative w-full max-w-4xl mx-auto p-4">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border timeline-line" style={{ transformOrigin: "top" }}></div>
                
                {timelineEvents.map((item, index) => {
                    const isLeft = index % 2 === 0;
                    const Icon = iconMap[item.title as keyof typeof iconMap] || (item.type === 'experience' ? Briefcase : GraduationCap);
                    
                    return (
                        <div key={index} className={cn("timeline-item relative flex items-center mb-12", isLeft ? "justify-start" : "justify-end")}>
                            <div className={cn("w-5/12", isLeft ? "pr-8 text-right" : "pl-8 text-left")}>
                                <p className="text-sm font-code text-muted-foreground mb-1">{item.date}</p>
                                <h3 className="font-headline text-lg font-medium text-foreground">{item.title}</h3>
                                <p className="text-sm text-muted-foreground font-body">{item.subtitle}</p>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-border">
                                <Icon className="w-4 h-4 text-primary" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}