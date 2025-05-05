"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useOrganizationStore } from "@/store/organizationStore"

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const { organization } = useOrganizationStore()

  if (!organization) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {organization.logo ? (
                  <img 
                    src={organization.logo} 
                    alt={organization.name} 
                    className="size-4" 
                  />
                ) : (
                  <span className="text-xs font-bold">
                    {organization.name?.substring(0, 2) || "ORG"}
                  </span>
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{organization.name}</span>
                <span className="truncate text-xs">{organization.industry}</span>
              </div>

            </SidebarMenuButton>

  
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
