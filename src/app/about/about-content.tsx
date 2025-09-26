"use client"

import { motion } from "framer-motion"
import { HighlightedWord } from "./highlighted-word"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

export function AboutContent() {
  return (
    <motion.article 
      className="w-full max-w-3xl mx-auto py-16 sm:py-24 px-8 sm:px-12 bg-card/20 backdrop-blur-lg border border-white/10 rounded-xl font-serif text-lg leading-relaxed text-muted-foreground"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-headline font-light tracking-tight text-primary mb-2">
          Livio Macaj
        </h1>
        <p className="text-xl text-muted-foreground mb-12 border-b border-white/10 pb-4">
          Software Engineer & Web Developer
        </p>
      </motion.header>

      <motion.p variants={itemVariants} className="mb-6">
        My journey into the world of technology began at the Canadian Institute of Technology, where a spark of curiosity evolved into a full-fledged passion. I first pursued a Bachelor's degree in <HighlightedWord>Software Engineering</HighlightedWord>, graduating in 2022. This foundational period was defined by late-night coding sessions and a growing fascination with how abstract logic could build tangible, interactive experiences. It was here I first dove into languages like <HighlightedWord>Python</HighlightedWord> and frameworks that would shape my career.
      </motion.p>
      
      <motion.p variants={itemVariants} className="mb-6">
        Driven by a desire to deepen my expertise, I immediately continued with a Master's degree, completing it in 2024. This advanced chapter of my education was less about learning what to do, and more about understanding why. I specialized in architecting complex systems and mastering development workflows, from conception to deployment.
      </motion.p>
      
      <motion.p variants={itemVariants} className="mb-6">
        My professional career began in parallel with my studies. As a freelance developer, I honed my skills in creating bespoke web pages using modern technologies like <HighlightedWord>React.js</HighlightedWord>, <HighlightedWord>TailwindCSS</HighlightedWord>, and headless CMS solutions like <HighlightedWord>Sanity.io</HighlightedWord>. This role taught me the art of client communication and the discipline of delivering pixel-perfect, responsive, and SEO-optimized products.
      </motion.p>

      <motion.p variants={itemVariants} className="mb-6">
        I then joined Communication Progress as a <HighlightedWord>Python/Odoo Developer</HighlightedWord>. This position was a deep dive into the world of ERP systems, where I developed and optimized back-end services, managed complex business logic, and secured critical data. It was a formative experience in understanding how software powers the core operations of a business. My work with <HighlightedWord>Odoo</HighlightedWord>, an open-source suite of business apps, gave me a unique perspective on building scalable, integrated solutions.
      </motion.p>

      <motion.p variants={itemVariants} className="mb-6">
        Throughout my career, I've cultivated a versatile skill set. On the frontend, I'm proficient in <HighlightedWord>Vue.js</HighlightedWord> and <HighlightedWord>React</HighlightedWord>, and I have a keen eye for design and user experience. On the backend, my expertise lies in <HighlightedWord>Python</HighlightedWord> and both NoSQL (<HighlightedWord>Firebase</HighlightedWord>) and SQL (<HighlightedWord>PostgreSQL</HighlightedWord>, <HighlightedWord>MySQL</HighlightedWord>) databases. I'm comfortable with the entire development lifecycle, from version control with <HighlightedWord>GIT</HighlightedWord> to deployment on platforms like <HighlightedWord>Vercel</HighlightedWord>.
      </motion.p>

      <motion.p variants={itemVariants} className="mb-6">
        Today, I stand as a developer who is not just a coder, but a problem-solver. I thrive on translating complex requirements into clean, efficient, and user-friendly applications. My story is one of continuous learning and a relentless drive to build things that are not only functional but also elegant and impactful.
      </motion.p>
      
    </motion.article>
  );
}
