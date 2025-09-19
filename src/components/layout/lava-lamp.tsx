// src/components/layout/lava-lamp.tsx
"use client";

import React, { useEffect, useState } from 'react';

const inRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

interface Blob {
  key: number;
  speed: number;
  delay: number;
  height: number;
  width: number;
  skewX: number;
  skewY: number;
  x: number;
  direction: 'alternate' | 'alternate-reverse';
}

const generateBlobs = (amount: number, offset: number = 0): Blob[] => {
  return Array.from({ length: amount }, (_, i) => {
    const height = inRange(40, 120);
    return {
      key: i + offset,
      speed: inRange(15, 40),
      delay: inRange(0, 10) - 10,
      height: height,
      width: inRange(40, 120),
      skewX: inRange(0, 20) - 10,
      skewY: inRange(0, 20) - 10,
      x: inRange(0, 100),
      direction: Math.random() > 0.5 ? 'alternate' : 'alternate-reverse',
    };
  });
};

const LavaLayer = ({ blobs }: { blobs: Blob[] }) => (
  <div className="lava-lamp__lava">
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="w-full h-full absolute top-0 left-0">
      {blobs.map(blob => (
        <circle
          key={blob.key}
          r={blob.height / 2}
          cx={`${blob.x}%`}
          cy="150" // Start below the viewport
          className="blob"
          style={{
            '--skewX': blob.skewX,
            '--skewY': blob.skewY,
            '--height': blob.height,
            '--speed': blob.speed,
            '--delay': blob.delay,
            '--direction': blob.direction,
          } as React.CSSProperties}
        />
      ))}
    </svg>
  </div>
);

export function LavaLamp() {
  const [isMounted, setIsMounted] = useState(false);
  const [blobLayers, setBlobLayers] = useState<Blob[][]>([]);

  useEffect(() => {
    setIsMounted(true);
    setBlobLayers([
      generateBlobs(5, 0),
      generateBlobs(5, 5),
      generateBlobs(5, 10),
    ]);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none w-screen h-screen overflow-hidden">
      {blobLayers.map((blobs, i) => (
        <LavaLayer key={i} blobs={blobs} />
      ))}
      <svg className="absolute left-full">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="BLUR" />
            <feColorMatrix in="BLUR" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="GOO" />
            <feBlend in="SourceGraphic" in2="GOO" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
