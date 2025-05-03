"use server";
import { prisma } from "@/server/prisma";
import moment from "moment";
export const saveInvitation = async (formId:number, email: string) => {
    try{
        const savedInvitation = await prisma.formInvitation.create({
            data:{
                formId: formId,
                email,
                sentAt: moment().toDate(),
                hasResponded: false,
            },
        });
        console.log('Invitation saved successfully:', savedInvitation);
        return savedInvitation;
    }catch (error) {
        console.error('Error saving invitation:', error);
        throw new Error('Invitation saving failed');
    }

}