"use client"

import { motion } from "framer-motion"
import { education, certifications } from './data';
import { EducationCard } from "./education-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function EducationSection() {
    return (
        <motion.div 
            className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
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
                       <EducationCard item={edu} />
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
                         <EducationCard item={cert} isCertification />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}
