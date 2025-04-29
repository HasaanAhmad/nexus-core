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
        }
    }

    interface User {
        id: string
        email: string
        name: string
        fullName: string
        userType: "ADMIN" | "USER"
        onboardingCompleted: boolean
    }
}