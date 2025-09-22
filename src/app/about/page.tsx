"use client";

import { AboutContent } from "./about-content"

const skills = [
  "Python", "JavaScript", "HTML/CSS", "Kotlin", "Odoo", "VueJS", "ReactJS", 
  "TailwindCSS", "Jetpack Compose", "ReportLab", "NoSQL (Firebase)", 
  "SQL (PostgreSQL, MySQL)", "GraphQL", "GIT", "Figma", "Docker", "Vercel"
]

const experience = [
    {
        role: "Freelance Web Developer",
        company: "Freelance",
        period: "May 2025 - Present",
        description: "Creating customized web pages using technologies such as React.js, TailwindCSS and Sanity.io, ensuring pages are responsive and optimized for SEO, and collaborating closely with clients."
    },
    {
        role: "Python/Odoo Developer",
        company: "Communication Progress",
        period: "April 2024 - Feb 2025",
        description: "Developed and optimized back-end services in Odoo using Python. Assisted in implementing ERP functions, improved security, and created document templates using ReportLab."
    },
    {
        role: "IT Intern",
        company: "Ministry of Justice",
        period: "April 2024 - Sep 2024",
        description: "Provided IT support and maintenance for internal systems, assisted in diagnosing software and hardware problems, and managed computer equipment."
    },
    {
        role: "Web Developer Intern",
        company: "AKKSHI (NASRI)",
        period: "April 2022 - Sep 2022",
        description: "Assisted in designing responsive components for the company website and updated the frontend with a different navigation structure."
    }
]

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen p-8 md:p-16 pt-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-light tracking-tight mb-4">About Me</h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body">My story, skills, and professional journey.</p>
      </header>

      <AboutContent skills={skills} experience={experience} />
    </div>
  )
}
