'use server'
import { prisma } from "@/server/prisma";
export const updateForm = async (formId: number, jsonform: string) => {
  try {
    // Update form data in the database
    const form = await prisma.jsonForms.update({
      where: {
        id: formId,
      },
      data: {
        jsonform: jsonform,
      }
    });

    console.log('Form updated successfully:', form);
    return form;
  } catch (error) {
    console.error('Error updating form:', error);
    throw new Error('Form updating failed');
  } 
}