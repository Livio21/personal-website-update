"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Code, Briefcase } from "lucide-react"
import { useTransition, animated } from '@react-spring/web'

interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
}

interface AboutContentProps {
  skills: string[];
  experience: Experience[];
}

export function AboutContent({ skills, experience }: AboutContentProps) {
  const cards = [
    <Card key="story" className="md:col-span-3 lg:col-span-3 row-span-2 bg-card/60 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
          <User className="text-primary" />
          My Story
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground">
          Hello! I'm a passionate developer and designer with a knack for creating engaging and user-friendly digital experiences. My journey into the world of tech began with a fascination for how things work, which quickly evolved into a love for building and designing applications. I thrive on solving complex problems and am constantly learning new technologies to push the boundaries of what's possible on the web.
        </p>
      </CardContent>
    </Card>,
    <Card key="skills" className="md:col-span-3 lg:col-span-2 row-span-2 bg-card/60 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
          <Code className="text-primary" />
          Skills & Expertise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-md py-1 px-3 rounded-full">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>,
    ...experience.map((exp, index) => (
      <Card key={exp.company} className="bg-card/60 backdrop-blur-sm border-white/10 md:col-span-1 lg:col-span-1 row-span-2 flex flex-col">
          <CardHeader>
              <CardTitle className="text-xl">{exp.role}</CardTitle>
              <p className="text-md text-primary font-medium pt-1">{exp.company}</p>
              <p className="text-sm font-normal text-muted-foreground pt-1">{exp.period}</p>
          </CardHeader>
          <CardContent className="flex-grow">
              <p className="text-muted-foreground">{exp.description}</p>
          </CardContent>
      </Card>
    ))
  ];

  const transitions = useTransition(cards, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    trail: 150,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 auto-rows-fr pl-8">
      {transitions((style, item) => (
        <animated.div style={style} className={item.props.className}>
          {item}
        </animated.div>
      ))}
    </div>
  );
}
