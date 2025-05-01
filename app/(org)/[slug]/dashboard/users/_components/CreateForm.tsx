'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AiModel } from '@/AiModel'
import { saveData } from '../actions/createForm'
import { useRouter } from 'next/navigation'


const CreateForm = (session: { user: any }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const user = session?.user?.user || null
    
    // Updated PROMPT for better consistency
   

    const router = useRouter(); // Initialize the router


    const onCreateClick = async () => {
        setLoading(true);

        try {
            const savedForm = await saveData(user.email, userInput);
            if (!savedForm) {
                throw new Error('Failed to save form data');
            }
            const formId = savedForm.id; // Get the ID of the newly created form
            const formUrl = `/dashboard/users/edit-form/${formId}`; // Construct the URL for the new form
            if(formId){
                router.push(formUrl); // Redirect to the new form page
            }

            setIsOpen(false);
        } catch (error) {
            console.error('Error creating form:', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <Button variant={'default'} onClick={() => setIsOpen(true)}>Create Form</Button>
            <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new Form</DialogTitle>
                        <DialogDescription>
                            <Textarea
                                placeholder='Enter the prompt to create form'
                                onChange={(e) => { setUserInput(e.target.value) }}
                            />
                            <div className='flex justify-between items-center gap-2 p-2'>
                                <Button
                                    variant={'default'}
                                    onClick={onCreateClick}
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Create Form'}
                                </Button>
                                <Button
                                    variant={'destructive'}
                                    onClick={() => { setIsOpen(false) }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateForm
