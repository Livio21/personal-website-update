"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
    project: ImagePlaceholder;
    isActive: boolean;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.3,
            duration: 0.5
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ProjectCard({ project, isActive }: ProjectCardProps) {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            variants={cardVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
        >
            <motion.div 
                className="p-6 md:p-8 rounded-xl bg-card/40 backdrop-blur-lg border border-white/10"
                variants={itemVariants}
            >
                <motion.h2 
                    className="text-2xl sm:text-3xl md:text-4xl font-headline font-light text-primary mb-3"
                    variants={itemVariants}
                >
                    {project.description.split('.')[0]}
                </motion.h2>
                <motion.p 
                    className="text-base text-muted-foreground mb-6 font-body"
                    variants={itemVariants}
                >
                    {project.description}
                </motion.p>
                <motion.div variants={itemVariants}>
                    <Button variant="default" asChild size="lg">
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                            View Project
                            <ExternalLink className="ml-2" />
                        </a>
                    </Button>
                </motion.div>
            </motion.div>
            
            <motion.div 
                className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black/30"
                variants={itemVariants}
            >
                {project.videoUrl ? (
                     <video
                        key={project.videoUrl}
                        src={project.videoUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <div className="w-full h-full bg-card/50 flex items-center justify-center">
                        <p className="text-muted-foreground">No preview available</p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
