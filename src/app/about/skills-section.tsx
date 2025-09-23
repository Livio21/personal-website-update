"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Code, Database, Wind, GitBranch, Figma, Docker, Component } from "lucide-react"

const skills = [
    { name: "Python", icon: <Code /> },
    { name: "JavaScript", icon: <Code /> },
    { name: "Kotlin", icon: <Code /> },
    { name: "Vue.js", icon: <VueIcon /> },
    { name: "React", icon: <ReactIcon /> },
    { name: "TailwindCSS", icon: <Wind /> },
    { name: "Odoo", icon: <OdooIcon /> },
    { name: "Jetpack Compose", icon: <Component /> },
    { name: "Firebase", icon: <Database /> },
    { name: "PostgreSQL", icon: <Database /> },
    { name: "GraphQL", icon: <GitBranch /> },
    { name: "Figma", icon: <Figma /> },
    { name: "Docker", icon: <Docker /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

export function SkillsSection() {
    return (
        <motion.div 
            className="w-full max-w-4xl text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2 
                className="text-4xl md:text-5xl font-light mb-10 font-headline"
                variants={itemVariants}
            >
                Technical Skills
            </motion.h2>
            <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                variants={containerVariants}
            >
                {skills.map((skill) => (
                    <motion.div key={skill.name} variants={itemVariants}>
                        <Card className="bg-card/40 backdrop-blur-sm border-white/10 aspect-square flex flex-col items-center justify-center gap-3 p-4 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                             <div className="w-12 h-12 text-primary">
                                {skill.icon}
                             </div>
                             <p className="font-code text-sm text-center text-muted-foreground">{skill.name}</p>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

// Custom SVG Icons for specific technologies
function OdooIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.23 4.21a.5.5 0 0 1 .54 0l8 5a.5.5 0 0 1 .23.42v10a.5.5 0 0 1-.23.43l-8 5a.5.5 0 0 1-.54 0l-8-5a.5.5 0 0 1-.23-.43v-10a.5.5 0 0 1 .23-.42l8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M7.74 15.5v-3.5a.5.5 0 0 1 .5-.5h3.53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.27 8.5v3.5a.5.5 0 0 1-.5.5H8.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

function VueIcon() {
    return (
        <svg viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
            <path d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36z" fill="currentColor"/>
            <path d="M0 0l128 220.8L256 0h-51.2L128 132.48 50.56 0H0z" fill="currentColor"/>
        </svg>
    )
}

function ReactIcon() {
    return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
        </svg>
    )
}