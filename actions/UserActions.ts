'use server'
import { prisma } from "@/server/prisma"

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

        const data = await prisma.user.create({
            data: {
                fullName: formData.get('fullName') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                userType: "ADMIN"
            }
        })
        return {
            success: true,
            message: "User created successfully"
        }

    } catch (error) {

        return {
            success: false,
            message: "Failed to create user"
        }
    }
}

export { createUser }