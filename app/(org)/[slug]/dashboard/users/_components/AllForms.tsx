'use client'
import React, { useEffect, useState } from 'react';
import { getAllForms } from '../actions/getAllForms';
import { useRouter } from 'next/navigation';
import { deleteForm } from '../actions/deleteForm';
import { toast, Toaster } from 'sonner';
import { useParams } from 'next/navigation';
import { Share2, Edit, Trash2 } from 'lucide-react';
import ShareModal from '../edit-form/_components/shareModal';

const AllForms = (session: { user: any }) => {
    const userId = session?.user?.user?.email;
    const isLoaded = session?.user !== undefined;
    const [forms, setForms] = React.useState<{ id: number; jsonform: string; createdBy: string; createdAt: string; }[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const params = useParams()
    const { slug } = params as { slug: string }    
    const router = useRouter();
    
    // State for share modal
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [currentFormId, setCurrentFormId] = useState<number | null>(null);
    
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
    
    const handleShare = (id: number) => {
        setCurrentFormId(id);
        setIsShareModalOpen(true);
    };
    
    const closeShareModal = () => {
        setIsShareModalOpen(false);
        setCurrentFormId(null);
    };

    return (
        <div>
            <Toaster position="bottom-right" />
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
                        const formUrl = `https://localhost:3000/aiform/${form.id}`;
                        
                        return (
                            <div key={form.id} className='border p-4 rounded shadow-md hover:shadow-lg transition-shadow'>
                                <h2 className='font-bold text-lg mb-2'>Title: {formJson.title}</h2>
                                <p className="text-sm text-gray-600">Created By: {form.createdBy}</p>
                                <p className="text-sm text-gray-600 mb-4">Created At: {form.createdAt}</p>
                                
                                <div className="flex justify-between items-center mt-4">
                                    {/* Invite User Button (Left) */}
                                    <button
                                        className="flex items-center gap-1.5 bg-white shadow-sm hover:shadow hover:text-nexus-500 cursor-pointer text-blue-600 font-medium py-1.5 px-3 rounded-md text-sm transition-all border border-gray-100"
                                        onClick={() => handleShare(form.id)}
                                    >
                                        <Share2 className="h-4 w-4" />
                                        <span>Share</span>
                                    </button>
                                    
                                    {/* Edit and Delete Buttons (Right) */}
                                    <div className="flex gap-2">
                                        <button
                                            className="flex items-center gap-1.5 bg-white shadow-sm hover:shadow hover:text-yellow-500 cursor-pointer text-gray-700 font-medium py-1.5 px-3 rounded-md text-sm transition-all border border-gray-100 "
                                            onClick={() => handleEdit(form.id)}
                                        >
                                            <Edit className="h-4 w-4" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className="flex items-center gap-1.5 bg-white shadow-sm hover:shadow hover:text-red-500 cursor-pointer text-gray-700 font-medium py-1.5 px-3 rounded-md text-sm transition-all border border-gray-100"
                                            onClick={() => handleDelete(form.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            
            {/* Share Modal */}
            {currentFormId && (
                <ShareModal 
                    isOpen={isShareModalOpen} 
                    onClose={closeShareModal}
                    formUrl={`http://localhost:3000/aiform/${currentFormId}`}
                    formId={currentFormId}
                />
            )}
        </div>
    );
};

export default AllForms;