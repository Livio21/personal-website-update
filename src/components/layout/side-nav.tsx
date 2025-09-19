
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, useDragControls, AnimatePresence } from "framer-motion"

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
  const controls = useDragControls()
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [menuPosition, setMenuPosition] = useState({ top: "auto", bottom: "auto", left: "auto", right: "auto" });


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
    setIsOpen(!isOpen);
  };
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
      const newPos = { x: info.point.x, y: info.point.y };
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const menuWidth = 224; // w-56
      const menuHeight = 280; // h-[280px]

      const newMenuPosition: any = {};

      // Horizontal positioning
      if (newPos.x > viewportWidth / 2) {
          newMenuPosition.right = viewportWidth - newPos.x - 28;
      } else {
          newMenuPosition.left = newPos.x - 28;
      }

      // Vertical positioning
      if (newPos.y > viewportHeight / 2) {
          newMenuPosition.bottom = viewportHeight - newPos.y - 28;
      } else {
          newMenuPosition.top = newPos.y - 28;
      }
      
      setMenuPosition(newMenuPosition);
      setPosition(newPos);
  };

  return (
    <div ref={navRef}>
      <motion.div 
        drag
        dragListener={false}
        onPointerDown={(e) => controls.start(e)}
        dragControls={controls}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        dragConstraints={{
          left: 16,
          top: 16,
          right: typeof window !== 'undefined' ? window.innerWidth - (56 + 16) : 0,
          bottom: typeof window !== 'undefined' ? window.innerHeight - (56 + 16) : 0,
        }}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        className="fixed top-4 left-4 z-[60] w-14 h-14 cursor-grab active:cursor-grabbing bg-card/80 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center"
        onClick={handleToggle}
        aria-label="Toggle navigation"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={menuPosition}
            className="fixed z-50 w-56 h-[280px] p-4 bg-card/50 backdrop-blur-lg border border-white/10 rounded-2xl"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
