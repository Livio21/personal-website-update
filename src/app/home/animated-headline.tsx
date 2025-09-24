"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const words = ['design', 'develop', 'make'];
const fonts = ['font-headline', 'font-serif', 'font-script', 'font-code'];

const Typewriter = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
        setFontIndex((prev) => (prev + 1) % fonts.length);
      }
    };

    const typingSpeed = isDeleting ? 100 : 200;
    const timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className={cn(
      "bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400 min-w-[220px] inline-block text-center md:text-left",
      fonts[fontIndex]
    )}>
      {text}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        className="inline-block"
      >
        _
      </motion.span>
    </span>
  );
};


export const AnimatedHeadline = () => {
  return (
    <h1 className="text-4xl md:text-5xl font-light tracking-tight flex flex-wrap items-baseline justify-center md:justify-start h-24 md:h-16">
      <span className="font-headline mr-2">Hello, I</span>
      <Typewriter />
      <span className="font-headline ml-2">websites &amp; web apps.</span>
    </h1>
  );
};
