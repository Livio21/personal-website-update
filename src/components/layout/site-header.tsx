
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

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { 
      href: "/hobbies", 
      label: "Hobbies",
      sublinks: [
        { href: "/hobbies?section=Photography", label: "Photography" },
        { href: "/hobbies?section=Music", label: "Music" },
        { href: "/hobbies?section=Blog", label: "Blog" },
      ] 
    },
    { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
    const pathname = usePathname();

    return (
        <header className="hidden md:block fixed top-2 left-1/2 -translate-x-1/2 z-50">
            <nav className="flex items-center gap-1 p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-900/90 backdrop-blur-lg border border-white/10 shadow-lg">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    
                    if (item.sublinks) {
                        return (
                            <DropdownMenu key={item.href}>
                                <DropdownMenuTrigger asChild>
                                    <div
                                        className={cn(
                                            "relative px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary cursor-pointer flex items-center gap-1",
                                            isActive ? "text-primary" : "text-gray-300"
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
                                        <ChevronDown className={cn("relative z-10 h-4 w-4 transition-transform", isActive && "mix-blend-exclusion")} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-zinc-800/80 backdrop-blur-lg border-white/10 text-gray-200">
                                    {item.sublinks.map((sublink) => (
                                        <DropdownMenuItem key={sublink.href} asChild className="cursor-pointer focus:bg-zinc-700/80">
                                            <Link href={sublink.href}>{sublink.label}</Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary",
                                isActive ? "text-primary" : "text-gray-300"
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
