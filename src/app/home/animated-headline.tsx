"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const verbs = ['design', 'develop', 'make'];
const nouns = ['websites', 'web apps'];
const fonts = ['font-thin', 'font-bold', 'font-serif', 'font-script', 'font-body', 'font-code'];

const letterVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};


const MorphingWord = ({ words }: { words: string[] }) => {
    const [wordIndex, setWordIndex] = useState(0);
    const [letters, setLetters] = useState(words[0].split('').map((char, i) => ({ char, font: fonts[i % fonts.length] })));
    const [fontStartIndex, setFontStartIndex] = useState(0);

    useEffect(() => {
        const currentWord = words[wordIndex];
        const nextWord = words[(wordIndex + 1) % words.length];

        const morphTimeout = setTimeout(() => {
            // Morph letter by letter
            for (let i = 0; i < Math.max(currentWord.length, nextWord.length); i++) {
                setTimeout(() => {
                    setLetters(prevLetters => {
                        const newLetters = [...prevLetters];
                        newLetters[i] = {
                            char: nextWord[i] || '',
                            font: fonts[(fontStartIndex + 1 + i) % fonts.length]
                        };
                        return newLetters;
                    });
                }, i * 100); 
            }
        }, 300); // Hold the word for 300ms

        const nextWordTimeout = setTimeout(() => {
            setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            setFontStartIndex((prevIndex) => (prevIndex + 1) % fonts.length);
        }, 300 + Math.max(currentWord.length, nextWord.length) * 100 + 300); // Total animation cycle

        return () => {
            clearTimeout(morphTimeout);
            clearTimeout(nextWordTimeout);
        };
    }, [wordIndex, words, fontStartIndex]);

    return (
        <div className="inline-flex justify-center min-w-[240px]">
            <AnimatePresence>
                {letters.map(({ char, font }, i) => (
                    <motion.span
                        key={`${wordIndex}-${i}-${char}`}
                        variants={letterVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={cn("inline-block", font, "bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400")}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
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
    <h1 className="text-4xl md:text-5xl font-light tracking-tight uppercase min-h-[140px] md:min-h-[70px] flex flex-wrap items-baseline justify-center md:justify-start">
      <span className="font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400 mr-2">Hello, I</span> 
      <MorphingWord words={verbs} />
      <span className="mx-2"> </span>
      <FlippingWord words={nouns} />
    </h1>
  );
};
