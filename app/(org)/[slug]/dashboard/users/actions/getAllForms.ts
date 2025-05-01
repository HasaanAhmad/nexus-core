'use server'
import { prisma } from "@/server/prisma";

export const getAllForms = async (userId: string) => {

    if (!userId) {
        console.error('Error: User ID is required to fetch forms');
        throw new Error('User ID is required to fetch forms');
    }

    try {
        // Fetch all forms from the database
        const forms = await prisma.jsonForms.findMany({
            where: {
                createdBy: userId, // Filter forms by the authenticated user
            },
        });
        return forms;
    } catch (error) {
        console.error('Error fetching forms:', error);
        throw new Error('Forms fetching failed');
    }
};