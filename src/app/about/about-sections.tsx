"use client";

import { motion } from "framer-motion";
import { AboutContent } from "./about-content";
import { Skills } from "./skills";
import { Timeline } from "./timeline";
import { data } from "./data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export function AboutSections() {
  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto py-16 sm:py-24 space-y-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <AboutContent />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Skills skills={data.skills} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Timeline />
      </motion.div>
    </motion.div>
  );
}
