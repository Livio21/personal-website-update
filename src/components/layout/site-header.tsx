"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import {
  Home,
  UserCircle,
  Briefcase,
  Mail,
  Heart,
  Github,
  Linkedin,
  Menu,
  X,
} from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/about", icon: UserCircle, label: "About" },
  { href: "/projects", icon: Briefcase, label: "Projects" },
  { href: "/hobbies", icon: Heart, label: "Hobbies" },
  { href: "/contact", icon: Mail, label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [navRef])

  return (
    <header className="sticky top-0 z-50 w-full" ref={navRef}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-7"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          Prismfolio
        </Link>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-secondary"
        >
          <Menu className="size-6" />
        </button>

        {/* Floating Nav for Desktop */}
        <nav className="hidden md:flex items-center gap-1 p-2 rounded-full bg-zinc-900/50 backdrop-blur-lg border border-white/10 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${pathname === item.href ? "bg-primary text-primary-foreground" : "text-gray-300 hover:bg-secondary/50"}`}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary"><Github size={22}/></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={22}/></a>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-full bg-background transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-7"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    Prismfolio
                </Link>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-md hover:bg-secondary">
                    <X className="size-6" />
                </button>
            </div>
            <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium
                        ${pathname === item.href ? "bg-primary text-primary-foreground" : "text-gray-300 hover:bg-secondary/50"}`}
                    >
                        <item.icon className="size-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="mt-auto flex items-center justify-center gap-6 pt-8">
                <a href="#" className="text-muted-foreground hover:text-primary"><Github size={28}/></a>
                <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={28}/></a>
            </div>
        </div>
      </div>
    </header>
  )
}
