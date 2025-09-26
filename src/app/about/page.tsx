"use client"

import { AboutSections } from './about-sections';

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
        <AboutSections />
    </div>
  );
}
