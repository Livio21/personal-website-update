
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import React, { useState } from "react";

const navItems = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { 
      href: "/projects", 
      label: "projects",
      sublinks: PlaceHolderImages.filter(p => p.id.startsWith('project-')).map((project) => ({
        href: `/projects?project=${project.id}`,
        label: project.description.split('.')[0]
      }))
    },
    { 
      href: "/hobbies", 
      label: "hobbies",
      sublinks: [
        { href: "/hobbies?section=Photography", label: "Photography" },
        { href: "/hobbies?section=Music", label: "Music" },
        { href: "/hobbies?section=Blog", label: "Blog" },
      ] 
    },
    { href: "/contact", label: "contact" },
];

interface HoverDropdownProps {
  item: typeof navItems[0];
  isActive: boolean;
  children: React.ReactNode;
}

function HoverDropdown({ item, isActive, children }: HoverDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div 
        className="flex items-center"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Link
            href={item.href}
            className={cn(
                "relative px-4 py-2 rounded-l-full text-sm font-medium transition-colors hover:text-primary uppercase",
                isActive ? "text-primary underline decoration-wavy underline-offset-2 italic" : "text-gray-300"
            )}
        >
            {isActive && (
                <motion.div
                    layoutId="desktop-nav-active-pill"
                    className="absolute inset-0 bg-primary"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
            )}
            <span className={cn("relative z-10", isActive && "mix-blend-exclusion")}>{item.label}</span>
        </Link>
        <DropdownMenuTrigger asChild>
            <div className={cn(
                "relative pl-1 pr-3 py-2 rounded-r-full text-sm font-medium transition-colors hover:text-primary cursor-pointer flex items-center gap-1 uppercase",
                isActive ? "text-primary" : "text-gray-300"
              )}
            >
              <ChevronDown className={cn("relative z-10 h-4 w-4 transition-transform", isActive && "mix-blend-exclusion")} />
            </div>
        </DropdownMenuTrigger>
      </div>
      {children}
    </DropdownMenu>
  );
}


export function SiteHeader() {
    const pathname = usePathname();

    return (
        <header className="hidden fixed top-2 w-full md:flex justify-between items-center px-24 z-50">
            <div className="text-center text-3xl uppercase">
                {pathname === '/' ? "" : <Link href="/">livio macaj</Link>}
            </div>
            <nav className="flex items-center gap-1 p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-900/90 backdrop-blur-lg border border-white/10 shadow-lg">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    
                    if (item.sublinks) {
                        return (
                          <HoverDropdown key={item.href} item={item} isActive={isActive}>
                            <DropdownMenuContent className="bg-zinc-900/80 backdrop-blur-xl border-white/10 text-gray-200 w-56">
                                {item.sublinks.map((sublink) => (
                                    <DropdownMenuItem key={sublink.href} asChild className="cursor-pointer focus:bg-zinc-700/80">
                                        <Link href={sublink.href}>{sublink.label}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                          </HoverDropdown>
                        )
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary uppercase",
                                isActive ? "text-primary underline decoration-wavy underline-offset-2 italic" : "text-gray-300"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="desktop-nav-active-pill"
                                    className="absolute inset-0 bg-primary"
                                    style={{ borderRadius: 9999 }}
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}
                            <span className={cn("relative z-10", isActive && "mix-blend-exclusion")}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}
