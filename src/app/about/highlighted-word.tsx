"use client";

import { motion } from "framer-motion";

const svgVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeInOut",
        },
    },
};

export function HighlightedWord({ children }: { children: React.ReactNode }) {
    return (
        <motion.span
            className="relative inline-block whitespace-nowrap text-primary font-bold"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
        >
            {children}
            <motion.svg
                className="absolute left-0 top-full w-full h-auto mt-[-2px] overflow-visible"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <motion.path
                    d="M 1 4 C 15 8, 30 1, 45 4 S 70 8, 85 4, 99 4"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={svgVariants}
                />
            </motion.svg>
        </motion.span>
    );
}
