"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className=""
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
              <Link href={item.url} className="w-full">
                <SidebarMenuButton 
                  tooltip={item.title}
                  className={cn(
                    "transition-all duration-200 hover:bg-sidebar-accent/80 hover:text-nexus-500 cursor-pointer",
                    item.isActive && "bg-sidebar-accent text-nexus-500 font-medium "
                  )}
                >
                  {item.icon && (
                    <item.icon 
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 group-hover:scale-110",
                        item.isActive && "text-nexus-500 "
                      )}
                    />
                  )}
                  <span>{item.title}</span>
                  {item.isActive && (
                    <div className="ml-auto h-5 w-1 rounded-full bg-nexus-500 " />
                  )}
                </SidebarMenuButton>
                </Link>
              </CollapsibleTrigger>
              <CollapsibleContent>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
