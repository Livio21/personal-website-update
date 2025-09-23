"use client"

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TimelineEvent } from './timeline-event';
import { IntroCard } from './intro-card';
import { ExperienceCard } from './experience-card';
import { EducationCard } from './education-card';
import { SkillsGrid } from './skills-grid';
import { CheckCircle2 } from 'lucide-react';
import { experience, education, certifications } from './data';

const timelineEvents = [
  { type: 'intro', data: {} },
  ...experience.map(e => ({ type: 'experience', data: e })),
  ...education.map(e => ({ type: 'education', data: e })),
  ...certifications.map(c => ({ type: 'certification', data: c })),
  { type: 'skills', data: {} }
];

export function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: timelineRef });

  const pathLength = useTransform(scrollXProgress, [0, 1], [0.05, 1]);

  return (
    <div ref={timelineRef} className="relative w-full h-full p-12 flex items-center overflow-x-auto overflow-y-hidden no-scrollbar">
      <div className="flex items-center h-full min-w-max gap-24">
        {timelineEvents.map((event, index) => (
          <TimelineEvent key={index}>
            {event.type === 'intro' && <IntroCard />}
            {event.type === 'experience' && <ExperienceCard item={event.data} />}
            {event.type === 'education' && <EducationCard item={event.data} />}
            {event.type === 'certification' && <EducationCard item={event.data} isCertification />}
            {event.type === 'skills' && <SkillsGrid />}
          </TimelineEvent>
        ))}
         <div className="w-[20vw]"></div>
      </div>
      
       {/* Timeline Path */}
      <svg width="100%" height="100%" className="absolute top-0 left-0 -z-10" style={{ minWidth: `${(timelineEvents.length) * 500}px` }}>
        <motion.path
          d={`M 0 ${window.innerHeight / 2 - 80} H ${(timelineEvents.length) * 500}`}
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2"
          strokeDasharray="4 8"
        />
        <motion.path
          d={`M 0 ${window.innerHeight / 2 - 80} H ${(timelineEvents.length) * 500}`}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          style={{ pathLength }}
        />
         {timelineEvents.map((_, index) => {
            const xPos = 250 + index * 400;
            return (
              <motion.g key={index} initial={{ opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5 + index*0.2}}>
                  <circle cx={xPos} cy={window.innerHeight / 2 - 80} r="8" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="4" />
                  <CheckCircle2 x={xPos - 8} y={window.innerHeight / 2 - 80 - 8} size={16} className="text-background" />
              </motion.g>
            )
          })}
      </svg>
    </div>
  );
}
