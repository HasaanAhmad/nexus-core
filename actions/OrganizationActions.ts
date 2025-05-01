'use server'

import { auth } from "@/server/auth"
import { prisma } from "@/server/prisma"
import { revalidatePath } from "next/cache"

interface CreateOrgFormData {
  name: string
  description?: string
  industry: string
  teamSize: string
  location: {
    lat: number
    lng: number
  }
}

export async function createOrganization(data: CreateOrgFormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Not authenticated"
      }
    }

    // Create slug from organization name
    const slug = data.name.toLowerCase().replace(/\s+/g, '-')

    // Create organization
    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        description: data.description,
        industry: data.industry,
        teamSize: data.teamSize,
        location: data.location, // Prisma will automatically stringify the JSON
        slug: slug,
        users: {
          connect: {
            id: session.user.id
          }
        }
      }
    })

    // Update user's onboardingCompleted and link organization
    await prisma.user.update({
      where: {
        id: session?.user?.id
      },
      data: {
        onboardingCompleted: true,
        organizationId: organization.id
      }
    })

    revalidatePath('/dashboard')

    return {
      success: true,
      message: "Organization created successfully",
      data: organization
    }
  } catch (error) {
    console.error('Organization creation error:', error)
    return {
      success: false,
      message: "Failed to create organization"
    }
  }
}



export const getLandingPage = async () => {
  const session = await auth()
  if (!session?.user?.id) {
    return {
      success: false,
      message: "Not authenticated"
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      include: {
        organization: {
          select: {
            landingPage: true,
            slug: true,
            landingPageHTML: true
          }
        }
      }
    })

    if (!user?.organization) {
      return {
        success: false,
        message: "Organization not found"
      }
    }

    return {
      success: true,
      data: {
        hasLandingPage: user.organization.landingPage,
        slug: user.organization.slug,
        landingPageHTML: user.organization.landingPageHTML
      }
    }
  } catch (error) {
    console.error('Landing page error:', error)
    return {
      success: false,
      message: "Failed to get landing page data"
    }
  }
}