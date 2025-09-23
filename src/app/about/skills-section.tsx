"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Code, Database, Wind, GitBranch, Figma, Component } from "lucide-react"

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
    { name: "Docker", icon: <DockerIcon /> },
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

function DockerIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.99 9.01992C21.99 8.36992 21.62 7.78992 21.05 7.49992L17.84 5.92992C17.59 5.80992 17.3 5.75992 17 5.75992H7.21C6.18 5.75992 5.34 6.53992 5.23 7.55992L4.02 17.5299C3.95 18.2399 4.41 18.8999 5.12 18.9999C5.2 19.0099 5.28 19.0099 5.36 19.0099H17.23C18.15 19.0099 18.93 18.3199 19.02 17.4099L19.23 15.4899C19.23 15.4899 21.32 14.5499 21.35 14.5299C21.78 14.2499 22 13.7599 22 13.2599V11.2899C22 10.5199 21.48 9.94992 20.72 9.83992C20.94 9.68992 21.11 9.50992 21.25 9.29992C21.32 9.18992 21.72 9.07992 21.99 9.01992ZM8 10.0001H6V11.0001H8V10.0001ZM8 12.0001H6V13.0001H8V12.0001ZM8 14.0001H6V15.0001H8V14.0001ZM10 10.0001H9V11.0001H10V10.0001ZM10 12.0001H9V13.0001H10V12.0001ZM10 14.0001H9V15.0001H10V14.0001ZM12 10.0001H11V11.0001H12V10.0001ZM12 12.0001H11V13.0001H12V12.0001ZM12 14.0001H11V15.0001H12V14.0001ZM14 10.0001H13V11.0001H14V10.0001ZM14 12.0001H13V13.0001H14V12.0001ZM14 14.0001H13V15.0001H14V14.0001ZM16 10.0001H15V11.0001H16V10.0001ZM16 12.0001H15V13.0001H16V12.0001Z" fill="currentColor"/>
        </svg>
    )
}
