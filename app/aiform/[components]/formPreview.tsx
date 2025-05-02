'use client'
import React, { useState, useMemo } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FieldRenderer from '../../(org)/[slug]/dashboard/users/edit-form/_components/Fieldrenderer';
interface Field {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    options?: string[];
}

interface FormfieldsProps {
    jsonform: string;
}

const formPreview = ({ jsonform }: FormfieldsProps) => {
    const formData = jsonform ? JSON.parse(jsonform) : null;
    const formFields: Field[] = useMemo(() => formData?.fields || [], [jsonform]);
    const [formValues, setFormValues] = useState<{ [key: string]: unknown }>({});

    const handleChange = (name: string, value: string | string[] | boolean) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted with values:', formValues);
        // Handle form submission logic here, e.g., send data to an API
    }

    return (
        <div className='border p-5 md:w-[600px] rounded-lg'>
            <h2 className='font-bold text-center text-2xl'>{formData?.title}</h2>
            <h2 className='font-sm text-gray-400 text-center'>{formData?.subheading}</h2>

            {formFields.map((field: Field, index: number) => (
                <div key={index} className='mb-4'>
                    <Label className='block text-gray-700 text-sm font-bold mb-2'>{field.label}</Label>
                    <FieldRenderer
                        field={field}
                        value={formValues[field.name] as string | string[] | boolean}
                        onChange={handleChange}
                    />
                </div>
            ))}

            <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </div>
    );
};

export default formPreview;