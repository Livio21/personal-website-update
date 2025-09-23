import { Code, Database, Wind, GitBranch, Figma, Component, MonitorSmartphone } from "lucide-react";
import { OdooIcon, VueIcon, ReactIcon, TailwindIcon, JavascriptIcon, TypescriptIcon, NextjsIcon, SanityIcon, DockerIcon, PythonIcon, AWSIcon, GoogleCloudIcon, FirebaseIcon } from "./timeline-icons";

export const experience = [
    {
        role: "Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "2021 - Present",
        description: "Developed and maintained web applications using React, Next.js, and Python. Collaborated with cross-functional teams to deliver high-quality software solutions. Specialized in building scalable backend services and responsive user interfaces."
    },
    {
        role: "Junior Developer",
        company: "Web Wizards",
        duration: "2019 - 2021",
        description: "Assisted in the development of client websites using Vue.js and Odoo. Gained experience in version control with Git and contributed to UI/UX design processes with Figma."
    }
];

export const education = [
    {
        degree: "Master of Science in Software Engineering",
        institution: "Canadian Institute of Technology",
        duration: "2020 - 2022"
    },
    {
        degree: "Bachelor of Science in Software Engineering",
        institution: "Canadian Institute of Technology",
        duration: "2017 - 2020"
    }
];

export const skills = [
    { name: "Python", icon: <PythonIcon /> },
    { name: "JavaScript", icon: <JavascriptIcon /> },
    { name: "TypeScript", icon: <TypescriptIcon /> },
    { name: "React", icon: <ReactIcon /> },
    { name: "Next.js", icon: <NextjsIcon /> },
    { name: "Vue.js", icon: <VueIcon /> },
    { name: "Odoo", icon: <OdooIcon /> },
    { name: "TailwindCSS", icon: <TailwindIcon /> },
    { name: "Sanity.io", icon: <SanityIcon /> },
    { name: "Docker", icon: <DockerIcon /> },
    { name: "Git", icon: <GitBranch /> },
    { name: "Figma", icon: <Figma /> },
    { name: "SQL", icon: <Database /> },
    { name: "AWS", icon: <AWSIcon /> },
    { name: "GCP", icon: <GoogleCloudIcon /> },
    { name: "Firebase", icon: <FirebaseIcon /> },
];

export const certifications = [
    {
        name: "AWS Certified Developer - Associate",
        year: "2023"
    },
    {
        name: "Google Cloud Certified - Associate Cloud Engineer",
        year: "2022"
    }
];
