"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { OdooIcon, VueIcon, ReactIcon, DockerIcon, PythonIcon, JsIcon, KotlinIcon, TailwindIcon, FirebaseIcon, PostgresIcon, GraphqlIcon, FigmaIcon } from './timeline-icons';

const skills = [
    { name: "Python", icon: <PythonIcon /> },
    { name: "JavaScript", icon: <JsIcon /> },
    { name: "Kotlin", icon: <KotlinIcon /> },
    { name: "Vue.js", icon: <VueIcon /> },
    { name: "React", icon: <ReactIcon /> },
    { name: "TailwindCSS", icon: <TailwindIcon /> },
    { name: "Odoo", icon: <OdooIcon /> },
    { name: "Jetpack Compose", icon: <Image src="/jc-logo.svg" width={48} height={48} alt="Jetpack Compose" /> },
    { name: "Firebase", icon: <FirebaseIcon /> },
    { name: "PostgreSQL", icon: <PostgresIcon /> },
    { name: "GraphQL", icon: <GraphqlIcon /> },
    { name: "Figma", icon: <FigmaIcon /> },
    { name: "Docker", icon: <DockerIcon /> },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.05,
    },
  }),
};

const breathingVariants = {
    breathe: (i: number) => ({
        scale: [1, 1.05, 1],
        boxShadow: [
            "0px 5px 15px hsla(var(--primary), 0.1)",
            "0px 8px 25px hsla(var(--primary), 0.2)",
            "0px 5px 15px hsla(var(--primary), 0.1)",
        ],
        transition: {
            delay: i * 0.1,
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut"
        }
    })
}

export function SkillsSection() {
    return (
        <div className="w-[80vw] max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-10 font-headline">
                Technical Skills
            </h2>
            <motion.div 
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {skills.map((skill, i) => (
                    <motion.div 
                        key={skill.name} 
                        custom={i}
                        variants={itemVariants}
                        className="relative group"
                    >
                         <motion.div
                            className="p-4 rounded-2xl bg-card/30 backdrop-blur-xl border border-white/10 aspect-square flex flex-col items-center justify-center gap-3 shadow-lg transition-all duration-300"
                            whileHover={{ scale: 1.2, zIndex: 10, y: -10, boxShadow: "0px 15px 40px hsla(var(--primary), 0.3)" }}
                            variants={breathingVariants}
                            animate="breathe"
                            custom={i}
                         >
                            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center drop-shadow-lg">
                                {skill.icon}
                            </div>
                            <p className="font-code text-xs text-center text-muted-foreground absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity">{skill.name}</p>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
