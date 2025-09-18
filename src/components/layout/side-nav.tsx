"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/hobbies", label: "Hobbies" },
  { href: "/contact", label: "Contact" },
]

export function SideNav() {
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
    <>
      {/* Mobile Nav Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-zinc-900/50 backdrop-blur-lg border border-white/10"
      >
        <Menu className="size-6 text-white" />
      </button>

      {/* Side Nav Modal for Mobile */}
      <div 
        ref={navRef}
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-zinc-900/80 backdrop-blur-lg border-r border-white/10 shadow-lg p-6
        transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-8">
            <Link href="/" className="font-bold text-lg text-primary">Livio Macaj</Link>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-md hover:bg-secondary">
                <X className="size-6 text-white" />
            </button>
        </div>
        <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-lg font-medium transition-colors
                    ${pathname === item.href ? "bg-primary text-primary-foreground" : "text-gray-300 hover:bg-secondary/50"}`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
      </div>
      
      {/* Desktop Side Nav */}
      <div className="hidden md:flex flex-col w-16 fixed left-0 top-0 h-full items-center justify-center z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-zinc-900/50 backdrop-blur-lg border border-white/10 hover:bg-primary/20 transition-colors"
        >
          <Menu className="size-6 text-white" />
        </button>
      </div>

      {/* Desktop Nav Modal */}
      <div
        ref={navRef}
        className={`hidden md:flex flex-col fixed top-0 left-0 h-full w-64 bg-zinc-900/80 backdrop-blur-lg border-r border-white/10 shadow-lg p-6
          transition-transform duration-300 ease-in-out z-30 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-10">
            <h2 className="font-bold text-xl text-primary">Livio Macaj</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-md hover:bg-secondary">
                <X className="size-6 text-white" />
            </button>
        </div>
        <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-lg font-medium transition-colors
                    ${pathname === item.href ? "bg-primary text-primary-foreground" : "text-gray-300 hover:bg-secondary/50"}`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
      </div>

       {/* Overlay */}
       {isOpen && <div className="fixed inset-0 bg-black/60 z-20" onClick={() => setIsOpen(false)} />}

    </>
  )
}
