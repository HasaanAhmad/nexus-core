'use server'
import { prisma } from "@/server/prisma"
import bcrypt from "bcryptjs"
import { auth, signIn } from "@/server/auth"

const createUser = async (formData: FormData) => {

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: formData.get('email') as string
            }
        })
        if (existingUser) {
            return {
                success: false,
                message: "User already exists"
            }
        }

        const password = formData.get('password') as string
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log('Creating user with hash:', hashedPassword); // Debug line

        const data = await prisma.user.create({
            data: {
                fullName: formData.get('fullName') as string,
                email: formData.get('email') as string,
                password: hashedPassword,
                userType: "ADMIN"

            }
        })

        return {
            success: true,
            message: "User created successfully"
        }

    } catch (error) {
        console.error('User creation error:', error); // Debug line

        return {
            success: false,
            message: "Failed to create user"
        }
    }
}

const getOnboardingState = async () => {
    const session = await auth()
    if (!session?.user?.id) {
        return {
            success: false,
            message: "Not authenticated"
        }
    }
    // Check if the user exists
    const userId = session.user.id
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                onboardingCompleted: true,
            }
        })

        return {
            onboardingCompleted: user?.onboardingCompleted
        }
    } catch (error) {
        console.error('Error fetching user:', error)
        return {
            success: false,
            message: "Failed to fetch user"
        }
    }
}

  
       

export { createUser, getOnboardingState }