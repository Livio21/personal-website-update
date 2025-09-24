"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const words = ['design', 'develop', 'make'];
const fonts = ['font-headline', 'font-serif', 'font-script', 'font-code', 'font-stardos', 'font-melodrama'];
const weights = ['font-light', 'font-normal', 'font-bold'];
const styles = ['italic', 'not-italic'];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const Typewriter = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentFont, setCurrentFont] = useState(fonts[0]);
  const [currentWeight, setCurrentWeight] = useState(weights[0]);
  const [currentStyle, setCurrentStyle] = useState(styles[0]);


  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const type = () => {
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentWord) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        setCurrentFont(getRandomItem(fonts));
        setCurrentWeight(getRandomItem(weights));
        setCurrentStyle(getRandomItem(styles));
      }
    };

    const typingSpeed = isDeleting ? 100 : 200;
    const timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className={cn(
      "bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400 min-w-[250px] inline-block text-center",
      currentFont,
      currentWeight,
      currentStyle
    )}>
      {text}
    </span>
  );
};


export const AnimatedHeadline = () => {
  return (
    <h1 className="text-4xl md:text-5xl font-light tracking-tight flex-wrap justify-center text-center">
      <span className="font-headline">Hello, I&nbsp;</span>
      <Typewriter />
      <span className="font-headline">&nbsp;websites.</span>
    </h1>
  );
};
