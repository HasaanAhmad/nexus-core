'use server'
import { prisma } from "@/server/prisma";
export async function getAllUsers(organizationId:string) {
    try {
        const users = await prisma.user.findMany({
        where: {
            organizationId: organizationId,
        }
        });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
}