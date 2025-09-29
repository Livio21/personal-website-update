"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { data } from "./data";
import { cn } from "@/lib/utils";
import * as Icons from "./timeline-icons";
import { Briefcase, GraduationCap } from "lucide-react";

const iconMap = {
    "Python/Odoo Developer": Icons.OdooIcon,
    "Canadian Institute of Technology": GraduationCap,
    "Freelance Web Developer": Briefcase,
};

const timelineEvents = [
    ...data.experience.map(item => ({ ...item, type: 'experience' as const })),
    ...data.education.map(item => ({ ...item, type: 'education' as const })),
].sort((a, b) => {
    // Simple sort by year, assuming format "Month YYYY" or "YYYY - YYYY"
    const aYear = parseInt(a.date.slice(-4));
    const bYear = parseInt(b.date.slice(-4));
    if (isNaN(aYear) || isNaN(bYear)) return 0;
    return bYear - aYear;
});

const itemVariants = (isLeft: boolean) => ({
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.5, ease: "easeOut" } 
    },
});

export function Timeline() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start center", "end center"],
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section>
            <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight text-primary mb-20 text-center">
                Career & Education
            </h2>
            <div ref={targetRef} className="relative w-full max-w-4xl mx-auto p-4">
                <motion.div 
                    className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border" 
                    style={{ scaleY, transformOrigin: "top" }}
                />
                
                <div className="space-y-16">
                    {timelineEvents.map((item, index) => {
                        const isLeft = index % 2 === 0;
                        const Icon = iconMap[item.title as keyof typeof iconMap] || (item.type === 'experience' ? Briefcase : GraduationCap);
                        
                        return (
                            <motion.div
                                key={index} 
                                className={cn("relative flex items-center group", isLeft ? "justify-start" : "justify-end")}
                                variants={itemVariants(isLeft)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.8 }}
                            >
                                <div className={cn(
                                    "absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-border transition-all duration-300",
                                    "group-hover:bg-primary group-hover:scale-110"
                                )}>
                                    <Icon className="w-4 h-4 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                                </div>

                                <div className={cn("w-[calc(50%-2rem)]", isLeft ? "pr-8 text-right" : "pl-8 text-left")}>
                                    <p className="text-sm font-code text-muted-foreground mb-1">{item.date}</p>
                                    <h3 className="font-headline text-lg font-medium text-foreground">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground font-body">{item.subtitle}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
