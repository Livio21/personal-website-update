
"use client";
import { Suspense } from 'react';
import { ProjectScroller } from './project-scroller';

export default function ProjectsPage() {
  return (
    <main className="w-full h-full">
      <Suspense fallback={<div>Loading...</div>}>
         <ProjectScroller />
      </Suspense>
    </main>
  );
}
