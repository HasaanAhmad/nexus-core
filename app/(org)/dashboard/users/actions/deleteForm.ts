'use server'
import { prisma } from "@/server/prisma";

export const deleteForm = async (formId: number) => {
    try {
        // Delete form data from the database
        const deletedForm = await prisma.jsonForms.delete({
        where: {
            id: formId,
        },
        });
    
        console.log('Form deleted successfully:', deletedForm);
        return deletedForm;
    } catch (error) {
        console.error('Error deleting form:', error);
        throw new Error('Form deletion failed');
    } finally {
        // Close the Prisma Client connection to avoid open connections
        await prisma.$disconnect();
    }
}