"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ArrowRight } from "lucide-react"

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
      duration: 0.6
    }
  },
};

export function AboutContent() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-main');

  return (
    <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl items-center px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.div 
          className="relative w-full aspect-square md:aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black/30"
          variants={itemVariants}
        >
            {aboutImage && (
                 <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={aboutImage.imageHint}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            )}
        </motion.div>

        <motion.div className="flex flex-col gap-6" variants={containerVariants}>
            <motion.h1 
                className="text-4xl md:text-6xl font-headline font-light tracking-tight"
                variants={itemVariants}
            >
                About Me
            </motion.h1>
            <motion.p 
                className="text-lg text-muted-foreground font-body"
                variants={itemVariants}
            >
                Hello! I'm a passionate developer and designer with a knack for creating engaging and user-friendly digital experiences. My journey into the world of tech began with a fascination for how things work, which quickly evolved into a love for building and designing applications.
            </motion.p>
            <motion.p className="text-lg text-muted-foreground font-body" variants={itemVariants}>
                I thrive on solving complex problems and am constantly learning new technologies to push the boundaries of what's possible on the web. From crafting sleek user interfaces to architecting robust back-end systems, I bring a commitment to quality and a creative spark to every project.
            </motion.p>
             <motion.div variants={itemVariants}>
                <Button asChild size="lg">
                    <Link href="/contact">
                        Get In Touch <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </motion.div>
        </motion.div>
    </motion.div>
  );
}
