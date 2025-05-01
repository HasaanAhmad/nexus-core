'use server'
import { prisma } from "@/server/prisma";
export const getForm = async (formId: number) => {
  try {
    // Fetch form data from the database
    const form = await prisma.jsonForms.findUnique({
      where: {
        id: formId,
      }
    });

    console.log('Form fetched successfully:');
    return form;
  } catch (error) {
    console.error('Error fetching form:', error);
    throw new Error('Form fetching failed');
  } 
};