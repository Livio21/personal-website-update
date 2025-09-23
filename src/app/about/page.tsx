"use client"

import { AboutContent } from './about-content';

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen flex items-start justify-center p-4 sm:p-8 overflow-y-auto">
      <AboutContent />
    </div>
  );
}
