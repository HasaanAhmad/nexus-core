"use server"
import { prisma } from "@/server/prisma";
export const saveResponse = async (formId: number, response: any) => {
  try {
    // Save the response to the database
    const savedResponse = await prisma.formResponses.create({
      data: {
        formId,
        response: JSON.stringify(response),
      },
    });

    console.log('Response saved successfully:', savedResponse);
    return savedResponse;
  } catch (error) {
    console.error('Error saving response:', error);
    throw new Error('Response saving failed');
  }
}

export const getResponse = async (formId: number) => {
    try {
        // Fetch the response from the database
        const response = await prisma.formResponses.findMany({
        where: { formId },
        });
    
        console.log('Response fetched successfully:', response);
        return response;
    } catch (error) {
        console.error('Error fetching response:', error);
        throw new Error('Response fetching failed');
    }
}
export const patchResponseStatus = async (responseId: number, status: string) => {
  try {
    const updatedResponse = await prisma.formResponses.update({
      where: { id: responseId },
      data: { status },
    });

    console.log('Response status updated successfully:', updatedResponse);
    return updatedResponse;
  } catch (error) {
    console.error('Error updating response status:', error);
    throw new Error('Response status update failed');
  }
}