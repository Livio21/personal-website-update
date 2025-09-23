"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import PrismShape from "@/components/prism-shape"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
};

export function IntroSection() {
  return (
    <motion.div 
        className="grid grid-cols-1 md:grid-cols-5 gap-12 w-full max-w-6xl items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.div className="md:col-span-3" variants={itemVariants}>
            <Card className="bg-transparent border-none">
                <CardHeader>
                    <motion.h1 
                        className="text-4xl md:text-6xl font-headline font-light tracking-tight mb-4"
                        variants={itemVariants}
                    >
                        About Me
                    </motion.h1>
                    <motion.p 
                        className="text-lg md:text-xl text-muted-foreground font-body"
                        variants={itemVariants}
                    >
                        My story, skills, and professional journey.
                    </motion.p>
                </CardHeader>
                <CardContent>
                    <motion.p className="text-lg text-muted-foreground font-body" variants={itemVariants}>
                        Hello! I'm a passionate developer and designer with a knack for creating engaging and user-friendly digital experiences. My journey into the world of tech began with a fascination for how things work, which quickly evolved into a love for building and designing applications. I thrive on solving complex problems and am constantly learning new technologies to push the boundaries of what's possible on the web.
                    </motion.p>
                </CardContent>
            </Card>
        </motion.div>
        <motion.div 
            className="md:col-span-2 flex items-center justify-center" 
            variants={itemVariants}
        >
          <div className="w-full max-w-[250px] mx-auto">
            <PrismShape />
          </div>
        </motion.div>
    </motion.div>
  );
}