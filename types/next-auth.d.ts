import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            name: string
            fullName: string
            userType: "ADMIN" | "USER"
            onboardingCompleted: boolean
            organizationId: string | null
        }
    }

    interface User {
        id: string
        email: string
        name: string
        fullName: string
        userType: "ADMIN" | "USER"
        onboardingCompleted: boolean
        organizationId: string | null
    }
}