'use server'
import { prisma } from '@/server/prisma';
import moment from 'moment';
import { auth } from '@/server/auth';
import { AiModel } from '@/AiModel';
import { PROMPT } from '@/Prompts/RegistrationPrompt';
import { getOrganization } from '@/actions/OrganizationActions';

export const saveData = async (createdByUser: string, userInput:string) => {
  const session = await auth();
  const organization = await getOrganization();
  
  try {
    // Save data to the database
    const result = await AiModel.sendMessage("description: " + userInput + PROMPT);
    if (result.response.candidates && result.response.candidates.length > 0) {
      const formContent = result.response.candidates[0].content;
      const jsonForm = formContent?.parts[0]?.text || ''; 
      
      if (!organization?.data?.id) {
        throw new Error('Organization ID is required');
      }

      const savedForm = await prisma.jsonForms.create({
        data: {
          jsonform: jsonForm,
          createdBy: createdByUser,
          createdAt: moment().format("YYYY-MM-DD"),
          organizationId: organization.data.id
        }
      });

      return savedForm;
    } else {
      console.error('No response candidates found');
      throw new Error('AI model did not return expected response format');
    }
  } catch (error) {
    console.error('Error saving data:', error);
    throw new Error('Data saving failed');
  } finally {
    // Close the Prisma Client connection to avoid open connections
    await prisma.$disconnect();
  }
};
