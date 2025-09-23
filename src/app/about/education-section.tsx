"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { GraduationCap, Award } from "lucide-react"

const education = [
    {
        degree: "Master of Science in Information Technology",
        institution: "Canadian Institute of Technology",
        period: "2023 - 2025",
        details: "Focused on advanced software engineering principles, database management, and network security. Completed a thesis on scalable web architectures.",
    },
    {
        degree: "Bachelor of Science in Software Engineering",
        institution: "Canadian Institute of Technology",
        period: "2020 - 2023",
        details: "Gained a strong foundation in computer science, object-oriented programming, and web development. Graduated with honors.",
    }
];

const certifications = [
    {
        name: "Odoo 15 Certified Developer",
        issuer: "Odoo",
        year: "2024",
    },
    {
        name: "Google IT Support Professional Certificate",
        issuer: "Coursera / Google",
        year: "2024",
    },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function EducationSection() {
    return (
        <motion.div 
            className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Education Column */}
            <motion.div className="space-y-8" variants={containerVariants}>
                <motion.h2 
                    className="text-4xl md:text-5xl font-light text-center font-headline mb-8"
                    variants={itemVariants}
                >
                    Education
                </motion.h2>
                {education.map((edu, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Card className="bg-card/40 backdrop-blur-sm border-white/10 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                             <CardHeader>
                                <div className="flex items-start gap-4">
                                    <GraduationCap className="h-8 w-8 text-primary mt-1" />
                                    <div>
                                        <CardTitle className="text-xl font-light font-headline">{edu.degree}</CardTitle>
                                        <CardDescription className="font-body text-primary">{edu.institution}</CardDescription>
                                        <p className="font-code text-sm text-muted-foreground mt-1">{edu.period}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground font-body pl-12">{edu.details}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Certifications Column */}
            <motion.div className="space-y-8" variants={containerVariants}>
                <motion.h2 
                    className="text-4xl md:text-5xl font-light text-center font-headline mb-8"
                    variants={itemVariants}
                >
                    Certifications
                </motion.h2>
                {certifications.map((cert, index) => (
                    <motion.div key={index} variants={itemVariants}>
                         <Card className="bg-card/40 backdrop-blur-sm border-white/10 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                             <CardHeader>
                                <div className="flex items-start gap-4">
                                    <Award className="h-8 w-8 text-primary mt-1" />
                                    <div>
                                        <CardTitle className="text-xl font-light font-headline">{cert.name}</CardTitle>
                                        <CardDescription className="font-body">{cert.issuer}</CardDescription>
                                        <p className="font-code text-sm text-muted-foreground mt-1">{cert.year}</p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}