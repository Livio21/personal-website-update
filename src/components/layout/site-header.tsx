"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground"
                                : "text-gray-300 hover:bg-secondary/50"
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
