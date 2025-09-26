"use client";

import { GitBranch, Figma, Database } from "lucide-react";
import { OdooIcon, VueIcon, ReactIcon, TailwindIcon, JavascriptIcon, TypescriptIcon, NextjsIcon, SanityIcon, DockerIcon, PythonIcon, AWSIcon, GoogleCloudIcon, FirebaseIcon, KotlinIcon, JetpackComposeIcon, GraphQLIcon, VercelIcon } from "./timeline-icons";

export const experience = [
    {
        role: "Freelance Web Developer",
        company: "Freelance",
        duration: "May 2025 - Present",
        description: "Created customized web pages using technologies such as React.js, TailwindCSS and Sanity.io. Ensured pages were responsive and optimized for SEO. Collaborated closely with clients to understand their needs and provide effective solutions."
    },
    {
        role: "Python/Odoo Developer",
        company: "Communication Progress",
        duration: "Apr 2024 - Feb 2025",
        description: "Developed and optimized back-end services in Odoo using Python. Assisted in implementing ERP functions to improve business processes. Improved security and access rights in various projects. Created document templates using ReportLab."
    },
    {
        role: "IT Intern",
        company: "Ministry of Justice",
        duration: "Apr 2024 - Sep 2024",
        description: "Provided IT support and maintenance for internal systems. Assisted in diagnosing software and hardware problems. Repaired computers and other office equipment. Managed computers."
    },
    {
        role: "Web Developer Intern",
        company: "AKKSHI (NASRI)",
        duration: "Apr 2022 - Sep 2022",
        description: "Assisted in designing responsive components for the company website. Updated the frontend with a different navigation structure."
    }
];

export const education = [
    {
        degree: "Master Software Engineering",
        institution: "Canadian Institute of Technology, Tirana, Albania",
        duration: "Oct 2022 - Jul 2024"
    },
    {
        degree: "Bachelor Software Engineering",
        institution: "Canadian Institute of Technology, Tirana, Albania",
        duration: "Oct 2019 - Jul 2022"
    }
];

export const skills = [
    { name: "Python", icon: <PythonIcon /> },
    { name: "JavaScript", icon: <JavascriptIcon /> },
    { name: "HTML/CSS", icon: <TailwindIcon /> },
    { name: "Kotlin", icon: <KotlinIcon /> },
    { name: "Odoo", icon: <OdooIcon /> },
    { name: "Vue.js", icon: <VueIcon /> },
    { name: "React", icon: <ReactIcon /> },
    { name: "TailwindCSS", icon: <TailwindIcon /> },
    { name: "Jetpack Compose", icon: <JetpackComposeIcon /> },
    { name: "ReportLab", icon: <PythonIcon /> },
    { name: "NoSQL (Firebase)", icon: <FirebaseIcon /> },
    { name: "SQL (PostgreSQL, MySQL)", icon: <Database /> },
    { name: "GraphQL", icon: <GraphQLIcon /> },
    { name: "GIT/GitLab/Github", icon: <GitBranch /> },
    { name: "Figma", icon: <Figma /> },
    { name: "Docker", icon: <DockerIcon /> },
    { name: "Vercel", icon: <VercelIcon /> },
];

export const certifications = [
    {
        name: "English Language (C1)",
        issuer: "UT Faculty of Foreign Languages",
        year: "2025"
    },
    {
        name: "IMPRO-ERP Systems Developer",
        issuer: "Communication Progress",
        year: "2024"
    }
];