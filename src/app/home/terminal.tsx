"use client"

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const commands: { [key: string]: string | (() => string) } = {
  help: "Available commands: 'about', 'skills', 'contact', 'clear'",
  about: "I'm a Software Engineer specializing in building robust web applications.",
  skills: "My skills include: Python, Odoo, Vue.js, React, and more. Check out the 'About' page for a full list!",
  contact: "You can reach me via the contact page or at iamlivio@gmail.com.",
  sudo: "User is not in the sudoers file. This incident will be reported.",
};

export function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{ type: 'input' | 'output'; content: string }[]>([]);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
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
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl h-[450px] bg-card/40 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl flex flex-col font-code"
    >
      <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-t-xl border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar" onClick={() => document.getElementById('terminal-input')?.focus()}>
        <div className='pb-2 text-muted-foreground'>
          <p>Welcome to my interactive terminal!</p>
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
            id="terminal-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50"
            autoFocus
            autoComplete="off"
          />
        </div>
        <div ref={endOfTerminalRef} />
      </div>
    </motion.div>
  );
}
