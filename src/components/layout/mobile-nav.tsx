"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, Star, Mail, Paintbrush } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

  return (
    <div className="md:hidden fixed bottom-0 m-4 left-0 right-0 z-50  rounded-full bg-black/10 border border-white/10 p-2">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center w-1/5 h-full relative  hover:scale-105 active:scale-110 transition-all duration-150">
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute h-full w-full p-4 rounded-full"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
             
                  <div className="liquidGlass">
                  <div className="liquidGlass effect"></div>
                  <div className="liquidGlass shine"></div>
                  </div>



                </motion.div>
              )}
              <motion.div
                animate={{ y: isActive ? -2 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <item.icon className={cn("w-6 h-6 transition-colors", isActive ? "text-primary" : "text-gray-400")} />
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
