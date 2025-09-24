"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const verbs = ['design', 'develop', 'make'];
const nouns = ['websites', 'web apps'];
const fonts = ['font-thin', 'font-bold', 'font-serif', 'font-script', 'font-body', 'font-code'];

const RotatingLetter = ({ letter }: { letter: string }) => {
  const [fontIndex, setFontIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFontIndex(prev => (prev + 1) % fonts.length);
    }, 400 + Math.random() * 200); // Stagger font changes
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={fontIndex}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        <span className={cn(fonts[fontIndex], "bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400")}>
          {letter}
        </span>
      </motion.span>
    </AnimatePresence>
  );
};

const FlippingWord = ({ words }: { words: string[] }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % words.length);
      setFontIndex(prev => (prev + 1) % fonts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={`${wordIndex}-${fontIndex}`}
        initial={{ opacity: 0, rotateX: 90 }}
        animate={{ opacity: 1, rotateX: 0 }}
        exit={{ opacity: 0, rotateX: -90 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn("inline-block", fonts[fontIndex], "bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400")}
      >
        {words[wordIndex]}
      </motion.span>
    </AnimatePresence>
  );
};

const AnimatedVerb = ({ verbs }: { verbs: string[] }) => {
  const [verbIndex, setVerbIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVerbIndex(prev => (prev + 1) % verbs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [verbs.length]);
  
  const currentVerb = verbs[verbIndex];

  return (
    <AnimatePresence mode="wait">
        <motion.div
         key={currentVerb}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.2 }}
         className="inline-block"
        >
            {currentVerb.split('').map((letter, i) => (
                <RotatingLetter key={`${currentVerb}-${i}`} letter={letter} />
            ))}
        </motion.div>
    </AnimatePresence>
  );
};

export const AnimatedHeadline = () => {
  return (
    <h1 className="text-4xl md:text-5xl font-light tracking-tight uppercase min-h-[140px] md:min-h-[70px]">
      <span className="font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400">Hello, I </span> 
      <AnimatedVerb verbs={verbs} />
      <span> </span>
      <FlippingWord words={nouns} />
    </h1>
  );
};
