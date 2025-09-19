"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/hobbies", label: "Hobbies" },
    { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
    const pathname = usePathname();

    return (
        <header className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <nav className="flex items-center gap-2 p-2 rounded-full bg-zinc-900/50 backdrop-blur-lg border border-white/10 shadow-lg">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary",
                                isActive ? "text-primary-foreground" : "text-gray-300"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="desktop-nav-active-pill"
                                    className="absolute inset-0 bg-primary"
                                    style={{ borderRadius: 9999 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}
