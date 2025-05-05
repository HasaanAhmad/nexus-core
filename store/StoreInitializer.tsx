"use client"
import { User as PrismaUser, Organization as PrismaOrganization } from '@prisma/client'
import { useEffect } from 'react'
import { useUserStore } from './userStore'
import { useOrganizationStore } from './organizationStore'
import { User, Organization } from '@/types'

const StoreInitializer = ({user, organization}: {user: PrismaUser, organization: PrismaOrganization}) => {
    useEffect(() => {
        const { setUser } = useUserStore()
        const { setOrganization } = useOrganizationStore()
        
        // Convert Prisma types to app types by handling null/undefined differences
        const appUser: User = {
            ...user,
            organizationId: user.organizationId || undefined
        }
        
        const appOrganization: Organization = {
            ...organization,
            logo: organization.logo || undefined,
            description: organization.description || undefined,
            servicesAssigned: organization.servicesAssigned || undefined,
            landingPageHTML: organization.landingPageHTML || undefined
        }
        
        setUser(appUser)
        setOrganization(appOrganization)
    }, [user, organization])
    
    return null
}

export default StoreInitializer
