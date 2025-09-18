import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Code, Briefcase } from "lucide-react"

const skills = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Tailwind CSS",
  "Figma", "UI/UX Design", "GraphQL", "PostgreSQL", "Docker", "Git"
]

const experience = [
    {
        role: "Senior Frontend Developer",
        company: "Tech Innovators Inc.",
        period: "2020 - Present",
        description: "Leading the development of a large-scale web application using Next.js and TypeScript. Responsible for architecture design, code reviews, and mentoring junior developers."
    },
    {
        role: "UI/UX Designer",
        company: "Creative Solutions LLC",
        period: "2018 - 2020",
        description: "Designed user-centric interfaces for mobile and web applications. Conducted user research and usability testing to inform design decisions."
    }
]

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">About Me</h1>
        <p className="text-lg text-muted-foreground">A little bit about my journey, skills, and experience.</p>
      </header>

      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-2xl font-semibold">
            <div className="flex items-center gap-3">
              <User className="text-primary" />
              My Story
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground p-4">
            Hello! I&apos;m a passionate developer and designer with a knack for creating engaging and user-friendly digital experiences. My journey into the world of tech began with a fascination for how things work, which quickly evolved into a love for building and designing applications. I thrive on solving complex problems and am constantly learning new technologies to push the boundaries of what&apos;s possible on the web.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-2xl font-semibold">
            <div className="flex items-center gap-3">
              <Code className="text-primary" />
              Skills & Expertise
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-md py-1 px-3 bg-secondary/70">
                  {skill}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-2xl font-semibold">
            <div className="flex items-center gap-3">
              <Briefcase className="text-primary" />
              Work Experience
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 space-y-6">
            {experience.map((exp) => (
                <Card key={exp.company} className="bg-card/60 backdrop-blur-lg border-border/20">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-baseline">
                            <span>{exp.role}</span>
                            <span className="text-sm font-normal text-muted-foreground">{exp.period}</span>
                        </CardTitle>
                        <p className="text-md text-primary font-medium">{exp.company}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>
                </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
