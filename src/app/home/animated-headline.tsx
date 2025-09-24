"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const verbs = ['design', 'develop', 'make'];
const nouns = ['websites', 'web apps'];
const fonts = ['font-thin', 'font-bold', 'font-serif', 'font-script', 'font-body', 'font-code'];

const letterVariants = {
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 20 },
      opacity: { duration: 0.3 },
      delay: i * 0.05,
    },
  }),
  exit: (i: number) => ({
    y: -20,
    opacity: 0,
    transition: {
      y: { duration: 0.2 },
      opacity: { duration: 0.2 },
      delay: i * 0.05,
    },
  }),
};

const MorphingWord = ({ words }: { words: string[] }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [fontIndex, setFontIndex] =useState(0);

  useEffect(() => {
    const totalCycleTime = 3000; // Total time for one word cycle
    const letterAnimationDuration = (words[wordIndex].length * 0.05 + 0.3) * 1000;
    const holdTime = 300;

    const timeout = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setFontIndex((prev) => (prev + 1) % fonts.length);
    }, totalCycleTime);

    return () => clearTimeout(timeout);
  }, [wordIndex, words]);

  const currentWord = words[wordIndex];
  const letters = currentWord.split('');

  return (
    <div className="inline-block min-w-[200px] text-center">
        <AnimatePresence mode="wait">
            <motion.div key={wordIndex} className="flex justify-center">
                {letters.map((letter, i) => (
                    <motion.span
                        key={`${wordIndex}-${i}`}
                        custom={i}
                        variants={letterVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                        className={cn("inline-block", fonts[(fontIndex + i) % fonts.length], "bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400")}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>
        </AnimatePresence>
    </div>
  );
};

const FlippingWord = ({ words }: { words: string[] }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % words.length);
      setFontIndex(prev => (prev + 1) % fonts.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={`${wordIndex}-${fontIndex}`}
        initial={{ opacity: 0, rotateX: 90 }}
        animate={{ opacity: 1, rotateX: 0 }}
        exit={{ opacity: 0, rotateX: -90 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={cn("inline-block", fonts[fontIndex], "bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400")}
      >
        {words[wordIndex]}
      </motion.span>
    </AnimatePresence>
  );
};


export const AnimatedHeadline = () => {
  return (
    <h1 className="text-4xl md:text-5xl font-light tracking-tight uppercase min-h-[140px] md:min-h-[70px] flex flex-wrap items-baseline">
      <span className="font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400 mr-2">Hello, I</span> 
      <MorphingWord words={verbs} />
      <span className="mx-2"> </span>
      <FlippingWord words={nouns} />
    </h1>
  );
};