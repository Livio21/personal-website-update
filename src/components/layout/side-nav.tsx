"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

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
      if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, navRef])
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      {/* Nav Container */}
      <div 
        ref={navRef}
        className={cn(
            "fixed top-4 left-4 z-50 transition-all duration-300 ease-in-out",
            isOpen ? 'w-56 h-auto p-4 bg-blue-950/50 backdrop-blur-lg border border-white/10 rounded-2xl' : 'w-14 h-14'
        )}
      >
        {/* Button */}
        <button
            onClick={handleToggle}
            className={cn(
                "absolute top-0 left-0 flex items-center justify-center w-14 h-14 bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-full z-10 transition-transform duration-300",
                isOpen && 'scale-0'
            )}
            aria-label="Open navigation"
        >
            <Menu className="size-6 text-white" />
        </button>

        {/* Modal content */}
        <div className={cn("transition-opacity duration-200", isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="flex items-center justify-end mb-4">
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-secondary" aria-label="Close navigation">
                    <X className="size-5 text-white" />
                </button>
            </div>
            <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(`px-3 py-2 rounded-full text-center text-lg font-medium transition-colors border border-transparent`,
                        pathname === item.href ? "bg-primary text-primary-foreground" : "text-gray-300 hover:bg-secondary/50 border-white/10"
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
      </div>
    </>
  )
}
