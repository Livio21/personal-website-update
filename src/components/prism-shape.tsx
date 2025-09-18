"use client"

import { useState, useEffect, useRef } from 'react';

const PrismShape = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const x = (mouseY / height - 0.5) * 20; // Max rotation 10deg
      const y = (mouseX / width - 0.5) * -20; // Max rotation 10deg
      setRotate({ x, y });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        <polygon points="100,10 190,75 160,190 40,190 10,75" fill="url(#grad2)" stroke="hsl(var(--border))" strokeWidth="2" />
        <polygon points="100,10 190,75 100,100" fill="url(#grad1)" opacity="0.7" />
        <polygon points="100,10 10,75 100,100" fill="url(#grad1)" opacity="0.6" />
        <polygon points="10,75 40,190 100,100" fill="url(#grad2)" opacity="0.5" />
        <polygon points="190,75 160,190 100,100" fill="url(#grad2)" opacity="0.8" />
      </svg>
    </div>
  );
};

export default PrismShape;
