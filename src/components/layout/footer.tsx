"use client"

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const socialLinks = [
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/livio-macaj",
    label: "LinkedIn"
  },
  {
    icon: <Github size={20} />,
    href: "https://github.com/Livio21",
    label: "GitHub"
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:iamlivio@gmail.com",
    label: "Email"
  }
];

export function Footer() {
  return (
    <footer className="w-full mt-auto bg-card/40 backdrop-blur-sm border-t border-white/10 p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="font-body text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Livio Macaj. All Rights Reserved.</p>
        </div>
        <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
                <Button key={link.label} variant="ghost" size="icon" asChild>
                    <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                        {link.icon}
                    </Link>
                </Button>
            ))}
        </div>
      </div>
    </footer>
  );
}
