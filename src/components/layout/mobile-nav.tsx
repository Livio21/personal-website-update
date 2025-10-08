"use client";

import Link from "next/link";
import { useState, useRef, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, User, Briefcase, Star, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/hobbies", label: "Hobbies", icon: Star },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef<HTMLElement | null>(null);
  const lastHoveredRef = useRef<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [constraints, setConstraints] = useState<{ left: number; right: number } | undefined>(undefined);

  // simple haptic helper
  function vibrate(duration = 10) {
    if (navigator.vibrate) navigator.vibrate(duration);
  }

  useLayoutEffect(() => {
    function measure() {
      const navEl = navRef.current;
      const indEl = dragRef.current;
      if (!navEl || !indEl) return;

      const navRect = navEl.getBoundingClientRect();
      const indRect = indEl.getBoundingClientRect();
      const initialOffset = indRect.left - navRect.left;

      const left = -initialOffset;
      const right = navRect.width - indRect.width - initialOffset;

      setConstraints({ left, right });
    }

    measure();
    const ro = new ResizeObserver(() => measure());
    if (navRef.current) ro.observe(navRef.current);
    if (dragRef.current) ro.observe(dragRef.current);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  function setIndexFromClientX(clientX: number | undefined) {
    if (!navRef.current || typeof clientX !== "number") return;
    const rect = navRef.current.getBoundingClientRect();
    const rel = clientX - rect.left;
    if (rel < 0 || rel > rect.width) {
      setHoveredId(null);
      lastHoveredRef.current = null;
      return;
    }
    const idx = Math.floor((rel / rect.width) * navItems.length);
    if (idx !== lastHoveredRef.current) {
      vibrate(15); // short tap when moving over a new item
    }
    lastHoveredRef.current = idx;
    setHoveredId(idx);
  }

  function onDrag(e: any, info?: any) {
    const x = e?.clientX ?? info?.point?.x;
    setIndexFromClientX(x);
  }

  function onDragEnd() {
    const idx = lastHoveredRef.current;
    if (idx != null && navItems[idx]) {
      vibrate(25); // stronger feedback on select
      router.push(navItems[idx].href);
    }
    lastHoveredRef.current = null;
    setHoveredId(null);
  }

  return (
    <div className="md:hidden fixed bottom-0 m-4 left-0 right-0 z-50 rounded-full bg-black/20 border-2 border-white/10 p-2">
      <nav ref={navRef as any} className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-nav-index={i}
              className={cn(
                "flex flex-col items-center justify-center w-1/5 h-full relative transition-all duration-150",
                hoveredId === i ? "opacity-90" : ""
              )}
            >
              {isActive && (
                <motion.div
                  ref={(el) => (dragRef.current = el as any)}
                  drag="x"
                  dragDirectionLock
                  whileDrag={{ scale: 1.2 }}
                  dragConstraints={constraints}
                  dragElastic={0}
                  onDrag={(e, info) => onDrag(e, info)}
                  onDragEnd={onDragEnd}
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0"
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

              <motion.div animate={{ y: isActive ? -2 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Icon className={cn("w-6 h-6 transition-colors", isActive ? "text-primary" : "text-gray-400")} />
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
