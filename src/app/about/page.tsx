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
    <div className="w-full">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">About Me</h1>
        <p className="text-lg text-muted-foreground">My story, skills, and professional journey.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="md:col-span-2 lg:col-span-3 bg-card/60 backdrop-blur-sm border-white/10">
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
        
        <Card className="lg:col-span-1 bg-card/60 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
              <Code className="text-primary" />
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-md py-1 px-3">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2 space-y-6">
            {experience.map((exp) => (
                <Card key={exp.company} className="bg-card/60 backdrop-blur-sm border-white/10">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-baseline">
                            <span className="text-xl">{exp.role}</span>
                            <span className="text-sm font-normal text-muted-foreground">{exp.period}</span>
                        </CardTitle>
                        <p className="text-md text-primary font-medium">{exp.company}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

      </div>
    </div>
  )
}
