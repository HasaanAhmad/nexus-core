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
import { useRouter, useParams } from 'next/navigation'

const CreateForm = (session: { user: any }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const params = useParams()
    const slug = params?.slug as string
    const user = session?.user?.user || null

    const onCreateClick = async () => {
        setLoading(true);

        try {
            const savedForm = await saveData(user.email, userInput);
            if (!savedForm) {
                throw new Error('Failed to save form data');
            }
            const formId = savedForm.id;
            const formUrl = `/users/edit-form/${formId}`;
            
            if(formId){
                router.push(formUrl);
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
