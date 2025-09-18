"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Home,
  UserCircle,
  Briefcase,
  Mail,
  Heart,
  Github,
  Linkedin,
} from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/about", icon: UserCircle, label: "About" },
  { href: "/projects", icon: Briefcase, label: "Projects" },
  { href: "/hobbies", icon: Heart, label: "Hobbies" },
  { href: "/contact", icon: Mail, label: "Contact" },
]

export function SiteSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      side="left"
      variant="floating"
      collapsible="icon"
      className="[&>div]:bg-sidebar/80 [&>div]:backdrop-blur-lg"
    >
      <SidebarHeader className="items-center justify-center text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-8"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="font-bold text-lg group-data-[collapsible=icon]:hidden duration-300">
          Prismfolio
        </span>
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>

      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{
                children: item.label,
                className: "bg-primary text-primary-foreground",
              }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter className="items-center">
        <div className="flex gap-4 group-data-[collapsible=icon]:flex-col">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github />
            </Link>
             <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin />
            </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
