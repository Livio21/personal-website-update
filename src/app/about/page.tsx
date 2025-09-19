import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Code, Briefcase } from "lucide-react"
import { AboutContent } from "./about-content"

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
    <div className="w-full ">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">About Me</h1>
        <p className="text-lg text-muted-foreground">My story, skills, and professional journey.</p>
      </header>

      <AboutContent skills={skills} experience={experience} />
    </div>
  )
}
