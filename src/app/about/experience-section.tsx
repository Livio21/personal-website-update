"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const experience = [
    {
        role: "Freelance Web Developer",
        company: "Freelance",
        period: "May 2025 - Present",
        description: "Creating customized web pages using technologies such as React.js, TailwindCSS and Sanity.io, ensuring pages are responsive and optimized for SEO, and collaborating closely with clients."
    },
    {
        role: "Python/Odoo Developer",
        company: "Communication Progress",
        period: "April 2024 - Feb 2025",
        description: "Developed and optimized back-end services in Odoo using Python. Assisted in implementing ERP functions, improved security, and created document templates using ReportLab."
    },
    {
        role: "IT Intern",
        company: "Ministry of Justice",
        period: "April 2024 - Sep 2024",
        description: "Provided IT support and maintenance for internal systems, assisted in diagnosing software and hardware problems, and managed computer equipment."
    },
    {
        role: "Web Developer Intern",
        company: "AKKSHI (NASRI)",
        period: "April 2022 - Sep 2022",
        description: "Assisted in designing responsive components for the company website and updated the frontend with a different navigation structure."
    }
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

export function ExperienceSection() {
    return (
        <motion.div 
            className="w-full max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2 
                className="text-4xl md:text-5xl font-light mb-10 text-center font-headline"
                variants={itemVariants}
            >
                Professional Experience
            </motion.h2>
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8" 
                variants={containerVariants}
            >
                {experience.map((exp) => (
                    <motion.div key={exp.company + exp.role} variants={itemVariants}>
                        <Card className="bg-card/40 backdrop-blur-sm border-white/10 h-full shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
                                    <CardTitle className="text-xl font-light font-headline">{exp.role}</CardTitle>
                                    <p className="text-sm font-normal text-muted-foreground font-code flex-shrink-0">{exp.period}</p>
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
    )
}