"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
}

interface AboutContentProps {
  skills: string[];
  experience: Experience[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function AboutContent({ skills, experience }: AboutContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left Column */}
      <motion.div 
        className="lg:col-span-2 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="bg-card/40 backdrop-blur-sm border-white/10 h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-light font-headline">
                My Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground font-body">
                Hello! I'm a passionate developer and designer with a knack for creating engaging and user-friendly digital experiences. My journey into the world of tech began with a fascination for how things work, which quickly evolved into a love for building and designing applications. I thrive on solving complex problems and am constantly learning new technologies to push the boundaries of what's possible on the web.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/40 backdrop-blur-sm border-white/10 h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-light font-headline">
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={containerVariants}
              >
                {skills.map((skill) => (
                  <motion.div key={skill} variants={itemVariants}>
                     <Badge variant="secondary" className="text-md py-1 px-3 rounded-full font-code">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Right Column */}
      <motion.div 
        className="lg:col-span-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-3xl font-light mb-8 font-headline"
          variants={itemVariants}
        >
          Professional Experience
        </motion.h2>
         <motion.div className="space-y-6" variants={containerVariants}>
            {experience.map((exp) => (
                <motion.div key={exp.company + exp.role} variants={itemVariants}>
                  <Card className="bg-card/40 backdrop-blur-sm border-white/10">
                      <CardHeader>
                          <div className="flex justify-between items-baseline">
                          <CardTitle className="text-xl font-light font-headline">{exp.role}</CardTitle>
                          <p className="text-sm font-normal text-muted-foreground font-code">{exp.period}</p>
                          </div>
                          <p className="text-md text-primary font-medium pt-1 font-body">{exp.company}</p>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground font-body">{exp.description}</p>
                      </CardContent>
                  </Card>
                </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
