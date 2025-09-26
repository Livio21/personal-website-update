"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ArrowRight } from "lucide-react"
import { Section } from "./section"
import { experience, education, skills, certifications } from "./data"
import { Badge } from "@/components/ui/badge"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        {/* --- INTRO SECTION --- */}
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center bg-card/40 backdrop-blur-lg border border-white/10 rounded-lg p-8 mb-16"
            variants={itemVariants}
        >
            <motion.div 
              className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-2xl bg-black/30 md:col-span-1"
            >
                {aboutImage && (
                     <Image
                        src={aboutImage.imageUrl}
                        alt={aboutImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={aboutImage.imageHint}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                    />
                )}
            </motion.div>

            <motion.div className="flex flex-col gap-6 md:col-span-2" variants={containerVariants}>
                <motion.h1 
                    className="text-4xl md:text-6xl font-headline font-light tracking-tight text-primary" 
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
                    <Button asChild size="lg" variant="glass">
                        <Link href="/contact">
                            Get In Touch <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
        
        {/* --- EXPERIENCE & EDUCATION SECTION --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Section title="Work Experience">
                <div className="flex flex-col gap-8">
                    {experience.map((job, index) => (
                        <motion.div key={index} className="flex flex-col gap-2" variants={itemVariants}>
                            <p className="font-code text-sm text-muted-foreground">{job.duration}</p>
                            <h3 className="text-xl font-headline font-medium text-primary">{job.role}</h3>
                            <p className="text-lg font-body text-muted-foreground mb-2">{job.company}</p>
                            <p className="font-body text-foreground/80 leading-relaxed">{job.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>
            
            <Section title="Education">
                <div className="flex flex-col gap-8">
                    {education.map((edu, index) => (
                        <motion.div key={index} className="flex flex-col gap-2" variants={itemVariants}>
                            <p className="font-code text-sm text-muted-foreground">{edu.duration}</p>
                            <h3 className="text-xl font-headline font-medium text-primary">{edu.degree}</h3>
                            <p className="text-lg font-body text-muted-foreground">{edu.institution}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
        
        {/* --- SKILLS & CERTIFICATIONS SECTION --- */}
        <div className="grid grid-cols-1 gap-8">
            <Section title="Skills">
                <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
                    {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 bg-card/40 backdrop-blur-sm border border-white/10 rounded-lg p-3 hover:bg-card/60 transition-colors">
                        {skill.icon && <div className="w-6 h-6 text-primary">{skill.icon}</div>}
                        <span className="font-code text-sm font-medium">{skill.name}</span>
                    </div>
                    ))}
                </motion.div>
            </Section>
             <Section title="Certifications">
                <motion.div className="flex flex-col gap-4" variants={itemVariants}>
                    {certifications.map((cert, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-card/40 backdrop-blur-sm border border-white/10 rounded-lg">
                            <div>
                                <p className="font-body font-medium text-primary">{cert.name}</p>
                                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                            </div>
                            <Badge variant="secondary" className="font-code mt-2 sm:mt-0">{cert.year}</Badge>
                        </div>
                    ))}
                </motion.div>
            </Section>
        </div>
        
    </motion.div>
  );
}