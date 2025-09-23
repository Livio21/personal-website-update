"use client";

import { motion } from "framer-motion";
import { AnimatedTitle } from "./animated-title";

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  },
};

export function Section({ title, children }: SectionProps) {
    return (
        <motion.section 
          className="py-16" 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
            <div className="flex items-center gap-4 mb-8">
                <AnimatedTitle 
                  text={title} 
                  className="text-2xl md:text-3xl font-headline font-light tracking-tight text-primary" 
                  wordSpacing="0.2em"
                />
                <div className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            {children}
        </motion.section>
    );
}
