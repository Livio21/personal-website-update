"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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
            isOpen ? 'w-56 h-auto p-4 bg-card/50 backdrop-blur-lg border border-white/10 rounded-2xl' : 'w-14 h-14'
        )}
      >
        {/* Button */}
        <button
            onClick={handleToggle}
            className={cn(
                "absolute top-0 left-0 flex items-center justify-center w-14 h-14 bg-card/80 backdrop-blur-lg border border-white/10 rounded-full z-10 transition-transform duration-300",
                isOpen && 'scale-0'
            )}
            aria-label="Open navigation"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>

        {/* Modal content */}
        <div className={cn("transition-opacity duration-200", isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="flex items-center justify-end mb-4">
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-secondary" aria-label="Close navigation">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            <nav className="flex flex-col gap-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "relative px-3 py-2 rounded-full text-center text-lg font-medium transition-colors hover:text-primary",
                          isActive ? "text-primary" : "text-gray-300"
                        )}
                    >
                         {isActive && (
                            <motion.div
                                layoutId="mobile-nav-active-pill"
                                className="absolute inset-0 bg-primary"
                                style={{ borderRadius: 9999 }}
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                        )}
                        <span className={cn("relative z-10", isActive && "mix-blend-exclusion")}>{item.label}</span>
                    </Link>
                )})}
            </nav>
        </div>
      </div>
    </>
  )
}
