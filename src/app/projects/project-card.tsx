"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { ExternalLink, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className="w-full"
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
                
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="mb-6">
                                {project.technologies && (
                                    <div className="mb-4">
                                        <h4 className="font-headline text-lg text-primary mb-2">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map(tech => (
                                                <Badge key={tech} variant="secondary" className="font-code">{tech}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {project.timeline && (
                                     <div>
                                        <h4 className="font-headline text-lg text-primary mb-2">Timeline</h4>
                                        <p className="font-code text-sm text-muted-foreground">{project.timeline}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                     <Button variant="default" asChild size="lg">
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                            View Project
                            <ExternalLink className="ml-2" />
                        </a>
                    </Button>
                    <Button variant="secondary" size="lg" onClick={() => setIsExpanded(!isExpanded)}>
                        More Info
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="ml-2" />
                        </motion.div>
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
