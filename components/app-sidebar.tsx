"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { 
  Users, 
  Building, 
  CalendarCheck, 
  BarChart3, 
  MessageSquare, 
  Briefcase, 
  Package, 
  User, 
  MessageCircle, 
  Settings,
  Home
} from 'lucide-react';

import { useParams } from 'next/navigation'

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/store/userStore'

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      isActive: true
    },
    {
      title: 'Users & Roles',
      url: '/dashboard/users',
      icon: Users
    },
    {
      title: 'Website Builder',
      url: '/dashboard/website-builder',
      icon: Building
    },
    {
      title: 'Attendance',
      url: '/dashboard/attendance',
      icon: CalendarCheck
    },
    {
      title: 'Project Workflow',
      url: '/dashboard/projects',
      icon: BarChart3
    },
    {
      title: 'Communication',
      url: '/dashboard/communications',
      icon: MessageSquare
    },
    {
      title: 'CRM',
      url: '/dashboard/crm',
      icon: Briefcase
    },
    {
      title: 'Inventory',
      url: '/dashboard/inventory',
      icon: Package
    },
    {
      title: 'HR Management',
      url: '/dashboard/hr-management',
      icon: User
    },
    {
      title: 'Chatbot',
      url: '/dashboard/chatbot',
      icon: MessageCircle
    },
    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: Settings
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const params = useParams()
  const slug = params?.slug as string
  const { user } = useUserStore()

  // Update navMain URLs with organization slug
  const navMainWithSlug = data.navMain.map(item => ({
    ...item,
    url: `/${slug}${item.url}`,
    isActive: pathname === `/${slug}${item.url}`
  }))

  // Update projects URLs with organization slug
  const projectsWithSlug = data.projects.map(project => ({
    ...project,
    url: `/${slug}${project.url}`
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithSlug} />
        <NavProjects projects={projectsWithSlug} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
