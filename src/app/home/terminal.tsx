"use client"

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const commands: { [key: string]: string | (() => string) } = {
  help: "Available commands: 'about', 'skills', 'contact', 'socials', 'projects', 'hobbies', 'date', 'ls', 'pwd', 'clear', and more to discover...",
  about: "I'm a Software Engineer specializing in building robust web applications.",
  skills: "My skills include: Python, Odoo, Vue.js, React, and more. Check out the 'About' page for a full list!",
  contact: "You can reach me via the contact page or at iamlivio@gmail.com.",
  socials: "You can find me on LinkedIn: https://www.linkedin.com/in/livio-macaj",
  projects: "Just navigate to the 'Projects' page to see my work. This terminal isn't *that* powerful... yet.",
  hobbies: "Head over to the 'Hobbies' page to see what I do for fun.",
  date: () => new Date().toLocaleString(),
  ls: "home.js  about.js  projects.js  hobbies.js  contact.js",
  pwd: "/Users/Livio/Portfolio",
  sudo: "User is not in the sudoers file. This incident will be reported.",
  whoami: "A very cool person, obviously.",
  matrix: "Wake up, Neo... The Matrix has you.",
  "open the pod bay doors": "I'm sorry, Dave. I'm afraid I can't do that.",
  ping: "pong",
  cat: "meow.",
};

export function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{ type: 'input' | 'output'; content: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [output]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newOutput = [...output, { type: 'input' as 'input', content: input }];
      const command = input.toLowerCase().trim();

      if (command === 'clear') {
        setOutput([]);
      } else if (commands[command]) {
        const result = commands[command];
        newOutput.push({ type: 'output', content: typeof result === 'function' ? result() : result });
      } else if (command !== '') {
        newOutput.push({ type: 'output', content: `command not found: ${command}. Type 'help' for a list of commands.` });
      }
      
      setOutput(newOutput);
      setInput('');
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl min-h-[350px] max-h-[80vh] bg-card/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col font-code"
    >
      <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-t-xl border-b border-white/10 group">
 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
 <motion.circle 
  cx="6" cy="6" r="6" fill="#3b1fb8"
  initial={{ scale: 1 }}
  whileHover={{ scale: 1.2 }}
  transition={{ duration: 0.2 }}
 />
 </svg>
 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
 <motion.rect 
  x="0" width="12" height="12" rx="3" fill="#821fb8"
  initial={{ scale: 1 }}
  whileHover={{ rotate: 90, scale: 1.2 }}
  transition={{ duration: 0.3 }}
 />
 </svg>
 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
 <motion.path 
  d="M6 0L12 12H0L6 0Z" fill="#1fb8b5"
  initial={{ scale: 1 }}
  whileHover={{ scale: 1.2, rotate: 360 }}
  transition={{ duration: 0.5 }}
 />
 </svg>
      </div>
      <div ref={containerRef} className="flex-1 p-4 overflow-y-auto no-scrollbar" onClick={handleClick}>
        <div className='pb-2 text-sm text-muted-foreground'>
          <p>Type `help` to see the list of available commands.</p>
        </div>
        {output.map((line, index) => (
          <div key={index}>
            {line.type === 'input' && (
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">~ $</span>
                <span>{line.content}</span>
              </div>
            )}
            {line.type === 'output' && (
              <p className="text-muted-foreground whitespace-pre-wrap">{line.content}</p>
            )}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">~ $</span>
          <input
            ref={inputRef}
            id="terminal-input"
            autoFocus={false}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/70"
            autoComplete="off"
          />
        </div>
      </div>
    </motion.div>
  );
}
