'use server'
import { prisma } from '@/server/prisma';
import moment from 'moment';
import { auth } from '@/server/auth';
import { AiModel } from '@/AiModel';
import { PROMPT } from '@/prompts/RegistrationPrompt';

export const saveData = async (createdByUser: string, userInput:string) => {
  const session = await auth();
  console.log('session', session);
  
  try {
    // Save data to the database
    const result = await AiModel.sendMessage("description: " + userInput + PROMPT);
    if (result.response.candidates && result.response.candidates.length > 0) {
      const formContent = result.response.candidates[0].content;
      const jsonForm = formContent?.parts[0]?.text || ''; // En
    const savedForm = await prisma.jsonForms.create({
      data: {
        jsonform: jsonForm,
        createdBy: createdByUser,
        createdAt: moment().format("DD,MM,yyyy"),
        Organization: session?.user?.organizationId ? {
          connect: {
            id: session.user.organizationId
          }
        } : undefined

      }
    });

    console.log('Data saved successfully:', savedForm);
    return savedForm;
  }
  } catch (error) {
    console.error('Error saving data:', error);
    throw new Error('Data saving failed');
  } finally {
    // Close the Prisma Client connection to avoid open connections
    await prisma.$disconnect();
  }
};
