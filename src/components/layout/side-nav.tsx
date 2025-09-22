
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

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

  return (
    <div
      ref={navRef}
      className={cn(
        "md:hidden fixed inset-0 z-40",
        !isOpen && "pointer-events-none"
      )}
    >
      <motion.button
        className="fixed bottom-4 right-4 z-[60] w-14 h-14 bg-card/80 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center pointer-events-auto"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`fixed bottom-20 right-4  ${isOpen ? ' w-56 z-50':'w-0 h-0 z-0'}  p-4 bg-card/50 backdrop-blur-lg border border-white/10 rounded-2xl pointer-events-auto`}
          >
            <nav className={`flex flex-col gap-3 >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-2 rounded-md text-left text-lg font-medium transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-gray-300"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-active-pill"
                        className="absolute inset-0 bg-primary"
                        style={{ borderRadius: 8 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className={cn("relative z-10", isActive && "mix-blend-exclusion")}>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
