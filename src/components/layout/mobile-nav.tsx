
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, User, Briefcase, Star, Mail, Paintbrush } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSnap } from "@/hooks/useSnap";
import { useRef, useEffect, useState } from "react";

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
  const router = useRouter();
  const { ref, snapTo, onDragEnd: useSnapOnDragEnd, hasMeasured } = useSnap<HTMLDivElement>({
    snapPoints: [0, 1, 2, 3, 4, 5],
  });
  const hoveredIndexRef = useRef<number | null>(null);

  const currentIndex = navItems.findIndex(
    (item) => item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href))
  );

  useEffect(() => {
    if (hasMeasured && currentIndex !== -1) {
      snapTo(currentIndex);
    }
  }, [pathname, snapTo, currentIndex, hasMeasured]);
  

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    useSnapOnDragEnd(event, info);
    if (hoveredIndexRef.current !== null) {
      const newRoute = navItems[hoveredIndexRef.current].href;
      if (pathname !== newRoute) {
        router.push(newRoute);
      }
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="relative flex justify-around items-center h-16 px-2 rounded-full bg-black/20 border-2 border-white/10">
        <motion.div
          ref={ref}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute w-1/6 h-full top-0 left-0 z-10"
        >
          <div className="liquidGlass w-full h-full">
            <div className="liquidGlass effect"></div>
            <div className="liquidGlass shine"></div>
          </div>
        </motion.div>

        {navItems.map((item, i) => {
          const isActive = i === currentIndex;
          return (
            <Link
              id={`${i}`}
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-1/6 h-full relative z-20 hover:scale-105 active:scale-110 transition-all duration-150"
              onMouseOver={() => {
                hoveredIndexRef.current = i;
              }}
            >
              <motion.div
                animate={{ y: isActive ? -2 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isActive ? "text-primary" : "text-gray-400"
                  )}
                />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
