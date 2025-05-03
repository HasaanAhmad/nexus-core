'use client';
import React, { useEffect } from 'react';
import { getForm } from '../../(org)/[slug]/dashboard/users/actions/getForm';
import FormPreview from './formPreview';

interface pageProps {
    params: {
        formid: string;
    };
}

const FORMUI = ({ params }: pageProps) => {
    const formid = params.formid; // Correctly access formid
    interface FormObject {
        id: number;
        jsonform: string;
        createdBy: string;
        createdAt: string;
    }

    const [formObject, setFormObject] = React.useState<FormObject | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true); // Loading state
    console.log(formid);

    const getFormdata = async () => {
        try {
            const form = await getForm(Number(formid));
            setFormObject(form);
            console.log(form);
        } catch (error) {
            console.error('Error fetching form data:', error);
        } finally {
            setLoading(false); // Stop loading after data is fetched
        }
    };

    useEffect(() => {
        if (formid) {
            getFormdata();
        }
    }, [formid]);

    return (
        <div>
            <h1 className="text-2xl font-bold">Registration Form</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : (
                <FormPreview jsonform={formObject?.jsonform || ''}  formId={Number(formid)}/>
            )}
        </div>
    );
};

export default FORMUI;
