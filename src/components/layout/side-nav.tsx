
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
  const [menuPosition, setMenuPosition] = useState({ top: "auto", bottom: "auto", left: "auto", right: "auto" });
  const [position, setPosition] = useState({ x: 16, y: 16 });

  useEffect(() => {
    try {
      const savedPosition = localStorage.getItem('nav-button-position');
      if (savedPosition) {
        setPosition(JSON.parse(savedPosition));
      }
    } catch (error) {
      // If localStorage is not available or fails, use default
      console.error("Could not read from localStorage", error);
    }
  }, []);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    const newPos = { x: info.point.x, y: info.point.y };
    try {
      localStorage.setItem('nav-button-position', JSON.stringify(newPos));
      setPosition(newPos);
    } catch (error) {
      console.error("Could not write to localStorage", error);
    }
  };

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

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    const target = e.currentTarget.parentElement as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    
    const newMenuPosition: any = {};
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (rect.left + 224 > viewportWidth - 16) {
      newMenuPosition.right = viewportWidth - rect.right;
    } else {
      newMenuPosition.left = rect.left;
    }
    
    if (rect.top + 284 > viewportHeight - 16) {
      newMenuPosition.bottom = viewportHeight - rect.top;
    } else {
      newMenuPosition.top = rect.top + rect.height;
    }
    
    setMenuPosition(newMenuPosition);
    setIsOpen(!isOpen);
  };
  

  return (
    <div ref={navRef}>
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            drag
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={position}
            dragConstraints={{
              left: 16,
              top: 16,
              right: typeof window !== 'undefined' ? window.innerWidth - (56 + 16) : 0,
              bottom: typeof window !== 'undefined' ? window.innerHeight - (56 + 16) : 0,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[60] w-14 h-14 cursor-grab active:cursor-grabbing bg-card/80 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center"
            onClick={handleToggle}
            aria-label="Toggle navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={menuPosition}
            className="fixed z-50 w-56 p-4 bg-card/50 backdrop-blur-lg border border-white/10 rounded-2xl"
          >
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
                )})}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
