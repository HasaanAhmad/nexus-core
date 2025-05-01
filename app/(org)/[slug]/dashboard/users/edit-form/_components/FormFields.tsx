import React, { useState, useMemo, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper'; // To easily handle array updates
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import Fieldedit from './Fieldedit';
import FieldRenderer from './Fieldrenderer';

interface Field {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    options?: string[];
}

interface FormfieldsProps {
    jsonform: string;
    onfieldUpdate: (value: Field, index: number) => void;
    deleteField: (index: number) => void;
    onReorderFields: (fields: Field[]) => void; // To update field order
}

const Formfields = ({ jsonform, onfieldUpdate, deleteField, onReorderFields }: FormfieldsProps) => {
    const formData = JSON.parse(jsonform);
    const formFields: Field[] = useMemo(() => formData?.fields || [], [jsonform]);
    const [formValues, setFormValues] = useState<{ [key: string]: unknown }>({});

    const moveField = useCallback((dragIndex: number, hoverIndex: number) => {
        const updatedFields = update(formFields, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, formFields[dragIndex]]],
        });
        onReorderFields(updatedFields); // Notify parent about the updated order
    }, [formFields, onReorderFields]);

    const handleChange = (name: string, value: string | string[] | boolean) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className='border p-5 md:w-[600px] rounded-lg'>
            <h2 className='font-bold text-center text-2xl'>{formData?.title}</h2>
            <h2 className='font-sm text-gray-400 text-center'>{formData?.subheading}</h2>

            {formFields.map((field: Field, index: number) => (
                <SortableField
                    key={index}
                    index={index}
                    field={field}
                    moveField={moveField}
                    handleChange={handleChange} // Pass handleChange
                    formValues={formValues}
                    onfieldUpdate={onfieldUpdate}
                    deleteField={deleteField}
                />
            ))}

            <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Submit
            </Button>
        </div>
    );
};

// SortableField Component
const SortableField = ({
    index,
    field,
    moveField,
    handleChange,
    formValues,
    onfieldUpdate,
    deleteField,
}: {
    index: number;
    field: Field;
    moveField: (dragIndex: number, hoverIndex: number) => void;
    handleChange: (name: string, value: string | string[] | boolean) => void;
    formValues: { [key: string]: unknown };
    onfieldUpdate: (value: Field, index: number) => void;
    deleteField: (index: number) => void;
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: 'FIELD',
        hover(item: { index: number }) {
            if (item.index !== index) {
                moveField(item.index, index);
                item.index = index;
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'FIELD',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className='mb-4'
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div className='flex items-center justify-between'>
                <Label className='block text-gray-700 text-sm font-bold mb-2'>{field.label}</Label>
                <Fieldedit defaultValue={field} onUpdate={(value) => onfieldUpdate(value, index)} deleteField={() => deleteField(index)} />
            </div>

            <FieldRenderer
                field={field}
                value={formValues[field.name] as string | string[] | boolean}
                onChange={handleChange}
            />
        </div>
    );
};


export default Formfields;
