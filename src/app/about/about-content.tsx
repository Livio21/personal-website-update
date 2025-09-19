"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

  const cardTransitions = useTransition(true, {
    from: { opacity: 0, transform: 'translateY(40px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    trail: 200,
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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-8">
        {cardTransitions((style, item) => item && (
          <animated.div style={style}>
            <Card className="bg-card/40 backdrop-blur-sm border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-light font-headline">
                  My Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground font-body">
                  Hello! I'm a passionate developer and designer with a knack for creating engaging and user-friendly digital experiences. My journey into the world of tech began with a fascination for how things work, which quickly evolved into a love for building and designing applications. I thrive on solving complex problems and am constantly learning new technologies to push the boundaries of what's possible on the web.
                </p>
              </CardContent>
            </Card>
          </animated.div>
        ))}

        {cardTransitions((style, item) => item && (
          <animated.div style={style}>
            <Card className="bg-card/40 backdrop-blur-sm border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-light font-headline">
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillsTransitions((style, skill) => (
                    <animated.div style={style}>
                       <Badge variant="secondary" className="text-md py-1 px-3 rounded-full font-code">
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

      {/* Right Column */}
      <div className="lg:col-span-3">
        {cardTransitions((style, item) => item && (
            <animated.div style={style}>
                <h2 className="text-3xl font-light mb-8 font-headline">Professional Experience</h2>
                 <div className="space-y-6">
                    {experienceTransitions((style, exp) => (
                        <animated.div style={style}>
                        <Card className="bg-card/40 backdrop-blur-sm border-white/10">
                            <CardHeader>
                                <div className="flex justify-between items-baseline">
                                <CardTitle className="text-xl font-light font-headline">{exp.role}</CardTitle>
                                <p className="text-sm font-normal text-muted-foreground font-code">{exp.period}</p>
                                </div>
                                <p className="text-md text-primary font-medium pt-1 font-body">{exp.company}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground font-body">{exp.description}</p>
                            </CardContent>
                        </Card>
                        </animated.div>
                    ))}
                </div>
            </animated.div>
        ))}
      </div>
    </div>
  );
}
