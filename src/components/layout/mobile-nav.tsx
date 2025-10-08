"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, Star, Mail, Paintbrush } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";
import { useSnap } from "@/hooks/useSnap"; // Adjust the import path as needed

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/hobbies", label: "Hobbies", icon: Star },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/design", label: "Design", icon: Paintbrush },
];

export function MobileNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Find current active index based on pathname
  const currentIndex = navItems.findIndex(item => item.href === pathname);

  const { dragProps, snapTo, currentSnappointIndex } = useSnap({
    direction: 'x',
    ref: indicatorRef,
    constraints: navRef,
    snapPoints: {
      type: 'constraints-box',
      unit: 'percent',
      points: navItems.map((_, index) => ({ 
        x: (index / (navItems.length - 1)) // 0, 0.2, 0.4, 0.6, 0.8, 1 for 6 items
      }))
    },
    springOptions: { stiffness: 500, damping: 30 },
    dragElastic: 0.2,
    onDragEnd: (event, info) => {
      // Optional: Add any additional drag end logic here
      console.log('Drag ended', info);
    }
  });

  // Sync the snap position with the current route
  useEffect(() => {
    if (hasMounted && currentIndex !== -1 && currentSnappointIndex !== currentIndex) {
      snapTo(currentIndex);
    }
  }, [currentIndex, snapTo, currentSnappointIndex, hasMounted]);

  // Handle link click to update snap position
  const handleLinkClick = (index: number) => {
    snapTo(index);
  };

  return (
    <div 
      ref={navRef}
      className="md:hidden fixed bottom-0 m-4 left-0 right-0 z-50 rounded-full bg-black/20 border-2 border-white/10 p-2"
    >
      <nav className="flex justify-around items-center h-16 px-2 relative">
        {/* Snap Indicator */}
        <motion.div
          ref={indicatorRef}
          {...dragProps}
          layoutId="mobile-nav-indicator"
          className="absolute w-1/5 h-full pointer-events-auto" // w-1/5 because we have 5 items (20% width each)
          initial={false}
          animate={{ opacity: 1 }}
          style={{ 
            x: 0, // This will be controlled by the useSnap hook
          }}
        >
          <div className="liquidGlass w-full h-full">
            <div className="liquidGlass effect"></div>
            <div className="liquidGlass shine"></div>
          </div>
        </motion.div>

        {/* Navigation Links */}
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => handleLinkClick(index)}
              className="flex flex-col items-center justify-center w-1/5 h-full relative z-10 hover:scale-105 active:scale-110 transition-all duration-150"
            >
              <motion.div
                animate={{ y: isActive ? -2 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <item.icon className={cn(
                  "w-6 h-6 transition-colors", 
                  isActive ? "text-primary" : "text-gray-400"
                )} />
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
