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

  const introTransitions = useTransition(true, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    trail: 150
  });
  
  const skillsTransitions = useTransition(skills, {
    from: { opacity: 0, transform: 'scale(0.8)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    trail: 50,
    keys: item => item,
  });

  const experienceTransitions = useTransition(experience, {
    from: { opacity: 0, transform: 'translateX(-30px)' },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    trail: 200,
    keys: item => item.company + item.role,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {introTransitions((style, item) => item && (
          <animated.div style={style} className="md:col-span-3">
            <Card className="bg-card/60 backdrop-blur-sm border-white/10 h-full">
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
            </Card>
          </animated.div>
        ))}

        {introTransitions((style, item) => item && (
          <animated.div style={style} className="md:col-span-2">
            <Card className="bg-card/60 backdrop-blur-sm border-white/10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
                  <Code className="text-primary" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillsTransitions((style, skill) => (
                    <animated.div style={style}>
                       <Badge variant="secondary" className="text-md py-1 px-3 rounded-full">
                        {skill}
                      </Badge>
                    </animated.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </animated.div>
        ))}
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3"><Briefcase className="text-primary" /> Professional Experience</h2>
        <div className="relative pl-6 after:absolute after:inset-y-0 after:left-8 after:w-0.5 after:bg-border">
          {experienceTransitions((style, exp, t, index) => (
            <animated.div style={style} className="relative mb-8 pl-8">
              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-background" />
              <Card className="bg-card/60 backdrop-blur-sm border-white/10">
                <CardHeader>
                    <div className="flex justify-between items-baseline">
                      <CardTitle className="text-xl">{exp.role}</CardTitle>
                      <p className="text-sm font-normal text-muted-foreground">{exp.period}</p>
                    </div>
                    <p className="text-md text-primary font-medium pt-1">{exp.company}</p>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
}
