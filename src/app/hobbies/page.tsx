
"use client"

import { useState } from 'react';
import { PhotographySection } from './photography-section';
import { MusicSection } from './music-section';
import { BlogSection } from './blog-section';
import { HobbiesNav } from './hobbies-nav';
import { AnimatePresence, motion } from 'framer-motion';

const sections = [
  { id: 'Photography', component: <PhotographySection /> },
  { id: 'Music', component: <MusicSection /> },
  { id: 'Blog', component: <BlogSection /> },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export default function HobbiesPage() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setPage(page + newDirection);
  };
  
  const setSection = (newIndex: number) => {
      if (newIndex > page) {
          setDirection(1);
      } else {
          setDirection(-1);
      }
      setPage(newIndex);
  }

  const sectionIndex = page;

  return (
    <div className="relative h-screen w-full overflow-hidden pt-24">
      <HobbiesNav currentSection={sectionIndex} setCurrentSection={setSection} />
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full"
        >
          {sections[sectionIndex].component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
