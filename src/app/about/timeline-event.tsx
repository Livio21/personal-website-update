"use client"

import { motion } from 'framer-motion';

const eventVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function TimelineEvent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={eventVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}
