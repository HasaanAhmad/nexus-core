"use client"

import { useEffect } from "react"
import { useUserStore } from "@/store/userStore"
import { useOrganizationStore } from "@/store/organizationStore"
import { User, Organization } from "@/types"

interface StoreProviderProps {
  userData: any // Session user data
  organizationData: any // Organization data
  children: React.ReactNode
}

export function StoreProvider({ userData, organizationData, children }: StoreProviderProps) {
  // Call hooks at the top level of the component
  const { setUser } = useUserStore()
  const { setOrganization } = useOrganizationStore()
  
  useEffect(() => {
    if (userData) {
      setUser(userData as User)
    }
    
    if (organizationData) {
      setOrganization(organizationData as Organization)
    }
  }, [userData, organizationData, setUser, setOrganization])

  return <>{children}</>
} 