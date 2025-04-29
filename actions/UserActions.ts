'use server'
import { prisma } from "@/server/prisma"
import bcrypt from "bcryptjs"

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

export { createUser }