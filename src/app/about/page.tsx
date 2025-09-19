import { AboutContent } from "./about-content"

const skills = [
  "Vue.js", "React", "Odoo", "Python", "Remix", "React Router",
  "Sanity CMS", "Firebase", "Front-End Development", "English", "Italian"
]

const experience = [
    {
        role: "Web Developer",
        company: "Freelance",
        period: "March 2025 - Present",
        description: "Continuing to build modern web solutions for various clients."
    },
    {
        role: "Python Developer",
        company: "Communication Progress",
        period: "April 2024 - February 2025",
        description: "Developed and maintained Python-based applications, contributing to backend systems and services."
    },
    {
        role: "Information Technology Intern",
        company: "Ministry of Justice of Albania",
        period: "April 2024 - September 2024",
        description: "Assisted the IT department with various tasks, gaining exposure to governmental technology infrastructure."
    },
    {
        role: "Web Developer",
        company: "AKKSHI (NASRI)",
        period: "March 2022 - August 2022",
        description: "Contributed to the development of web applications, focusing on front-end features and user experience."
    }
]

export default function AboutPage() {
  return (
    <div className="w-full p-8 md:p-24 md:pl-32">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">About Me</h1>
        <p className="text-lg text-muted-foreground">My story, skills, and professional journey.</p>
      </header>

      <AboutContent skills={skills} experience={experience} />
    </div>
  )
}
