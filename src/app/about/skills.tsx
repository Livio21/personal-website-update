"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import * as Icons from "./timeline-icons";

type Skill = {
    name: string;
    Icon: React.ComponentType<{ className?: string }>;
};

interface SkillsProps {
    skills: Skill[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
};

export function Skills({ skills }: SkillsProps) {
  return (
    <section>
        <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight text-primary mb-12 text-center">
            My Tech Stack
        </h2>
        <TooltipProvider>
            <motion.div 
                className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {skills.map(({ name, Icon }) => (
                    <Tooltip key={name} delayDuration={100}>
                        <TooltipTrigger asChild>
                            <motion.div
                                className="aspect-square bg-card/30 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center p-4"
                                variants={itemVariants}
                                whileHover={{ scale: 1.1, backgroundColor: "hsla(var(--card) / 0.6)" }}
                            >
                                <Icon className="w-full h-full text-muted-foreground transition-colors duration-300 hover:text-primary" />
                            </motion.div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-card/80 backdrop-blur-lg border-white/10 text-foreground">
                            <p className="font-code">{name}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </motion.div>
        </TooltipProvider>
    </section>
  );
}
