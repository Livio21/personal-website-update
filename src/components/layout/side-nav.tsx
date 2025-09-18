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
    <>
      {/* Nav Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-6 left-6 z-50 p-2 rounded-md bg-zinc-900/50 backdrop-blur-lg border border-white/10"
          aria-label="Open navigation"
        >
          <Menu className="size-6 text-white" />
        </button>
      )}

      {/* Side Nav Modal */}
      <div 
        ref={navRef}
        className={`fixed top-1/2 left-6 -translate-y-1/2 bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6
        transition-all duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center justify-between mb-8">
            <Link href="/" className="font-bold text-lg text-primary">Livio Macaj</Link>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-secondary" aria-label="Close navigation">
                <X className="size-5 text-white" />
            </button>
        </div>
        <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-lg font-medium transition-colors border border-transparent
                    ${pathname === item.href ? "bg-primary text-primary-foreground" : "text-gray-300 hover:bg-secondary/50 border-white/10"}`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
      </div>
      
       {/* Overlay */}
       {isOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
