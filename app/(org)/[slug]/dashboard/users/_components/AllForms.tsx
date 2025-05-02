'use client'
import React, { useEffect } from 'react';
import { getAllForms } from '../actions/getAllForms';
import { useRouter } from 'next/navigation';
import { deleteForm } from '../actions/deleteForm';
import { toast, Toaster } from 'sonner';
import { useParams } from 'next/navigation';

const AllForms = (session: { user: any }) => {
    const userId = session?.user?.user?.email;
    const isLoaded = session?.user !== undefined;
    const [forms, setForms] = React.useState<{ id: number; jsonform: string; createdBy: string; createdAt: string; }[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const params = useParams()
    const { slug } = params as { slug: string }    
    const router = useRouter();
    
    const getForms = async () => {
        try {
            if (!userId) {
                throw new Error('User ID is required to fetch forms.');
            }
            const allForms = await getAllForms(userId);
            setForms(allForms);
        } catch (error) {
            console.error('Error fetching forms:', error);
            toast.error('Failed to load forms');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (isLoaded && userId) {
            getForms();
        }
    }, [isLoaded, userId]);

    const handleEdit = (id: number) => {
        router.push(`/${slug}/dashboard/users/edit-form/${id}`);
    };

    const handleDelete = (id: number) => {
        toast.promise(
            deleteForm(id).then(() => {
                setForms((prevForms) => prevForms.filter((form) => form.id !== id));
            }),
            {
                loading: 'Deleting form...',
                success: 'Form deleted successfully!',
                error: 'Failed to delete form'
            }
        );
    };

    return (
        <div>
            <Toaster position="top-right" />
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : forms.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="text-gray-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">No forms found</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't created any forms yet.</p>
                    
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {forms.map((form) => {
                        const formJson = JSON.parse(form.jsonform);
                        return (
                            <div key={form.id} className='border p-4 rounded shadow-md'>
                                <h2 className='font-bold'>Title: {formJson.title}</h2>
                                <p>Created By: {form.createdBy}</p>
                                <p>Created At: {form.createdAt}</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                                        onClick={() => handleEdit(form.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                        onClick={() => handleDelete(form.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AllForms;