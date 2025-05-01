'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getForm } from '../../actions/getForm';
import { ArrowLeft, PlusIcon, Share2, SquareArrowOutUpRight } from 'lucide-react';
import Formfields from './FormFields';
import { updateForm } from '../../actions/updateForm';
import FieldController from './Fieldcontroller';
import { toast } from "sonner"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from "next-auth/react"

interface Field {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  options?: string[];
}

const Formui = () => {
  const router = useRouter();
  const params = useParams();
  const formId = params.formId;
  const { data: session } = useSession(); // Use NextAuth's useSession hook to get user session data
  const user = session?.user || null; // Extract user data from the session
  const isLoaded = session?.user !== undefined; // Check if user data is loaded
  const isSignedIn = session?.user !== null; // Check if the user is signed in
  const [formData, setFormData] = useState<{
    id: number;
    jsonform: string;
    createdBy: string;
    createdAt: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState<number>(0); // Initialize updateTrigger

  const onFieldUpdate = (value: Field, index: number) => {
    setFormData(prevFormData => {
      if (prevFormData) {
        const parsedJsonForm = JSON.parse(prevFormData.jsonform);
        parsedJsonForm.fields[index] = { ...parsedJsonForm.fields[index], label: value.label, placeholder: value.placeholder };

        // Deep copy to ensure React triggers a re-render
        const updatedFormData = {
          ...prevFormData,
          jsonform: JSON.stringify(parsedJsonForm)
        };

        setUpdateTrigger(Date.now());
        toast('Field Updated Successfully') // Update updateTrigger with a new timestamp
        return updatedFormData;
      }
      return prevFormData;
    });
  };
  const handleReorderFields = (updatedFields: Field[]) => {
    setFormData((prevFormData) => {
      if (prevFormData) {
        const parsedJsonForm = JSON.parse(prevFormData.jsonform);
        parsedJsonForm.fields = updatedFields; // Update the field order

        // Create the updated form data with the reordered fields
        const updatedFormData = {
          ...prevFormData,
          jsonform: JSON.stringify(parsedJsonForm),
        };

        // Set the updated form data
        setUpdateTrigger(Date.now()); // Update updateTrigger with a new timestamp
        return updatedFormData;
      }
      return prevFormData;
    });
  };
  const deleteField = (index: number) => {
    setFormData(prevFormData => {
      if (prevFormData) {
        const parsedJsonForm = JSON.parse(prevFormData.jsonform);
        parsedJsonForm.fields.splice(index, 1);

        // Deep copy to ensure React triggers a re-render
        const updatedFormData = {
          ...prevFormData,
          jsonform: JSON.stringify(parsedJsonForm)
        };

        setUpdateTrigger(Date.now());
        toast("Field Deleted Successfully") // Update updateTrigger with a new timestamp
        return updatedFormData;
      }
      return prevFormData;
    });
  }
  const addField = (newField: Field) => {
    setFormData((prevFormData) => {
      if (prevFormData) {
        const parsedJsonForm = JSON.parse(prevFormData.jsonform);
        parsedJsonForm.fields.push(newField);

        // Create the updated form data with the new field
        const updatedFormData = {
          ...prevFormData,
          jsonform: JSON.stringify(parsedJsonForm),
        };

        // Set the updated form data
        setUpdateTrigger(Date.now()); // Update updateTrigger with a new timestamp
        toast("Field Added Successfully"); // Show a toast message
        return updatedFormData;
      }
      return prevFormData;
    });
  };


  useEffect(() => {
    // Wait until user data is loaded and formId is available
    if (!isLoaded || !formId || !user) return; 
  
    const fetchData = async () => {
      try {
        setLoading(true);  // Make sure loading is set to true before fetching
        const form = await getForm(Number(formId));
  
        if (!form) {
          setError('No form found');
        } else if (form.createdBy !== user?.email) {
          setUnauthorized(true);
        } else {
          setFormData(form);
        }
      } catch (err) {
        setError('Error fetching form data.');
        console.error('Error fetching form:', err);
      } finally {
        setLoading(false);  // Ensure loading is set to false after fetching
      }
    };
  
    fetchData();
  }, [user]);  // Re-run when these dependencies change
  

  // Add this useEffect for updating the UI when updateTrigger changes
  useEffect(() => {
    if (updateTrigger) {
      updateForm(Number(formId), formData?.jsonform || '');
      // Additional logic if needed when form is updated
    }
  }, [updateTrigger]); // Depend on updateTrigger to update UI components

  // Loading state until the user is fully loaded
  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-xl">Loading form data...</p>
      </div>
    );
  }

  // Handle if user is not signed in
  if (!isSignedIn) {
    return (
      <div className="text-center text-red-600 mt-10">
        You must be signed in to view this form.
      </div>
    );
  }

  // Authorization Error
  if (unauthorized) {
    return (
      <div className="text-center text-red-600 mt-10">
        You do not have permission to access this form.
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        {error}
      </div>
    );
  }

  // Form Data Rendering
  if (!formData) {
    return (
      <div className="text-center mt-10">
        No form found for ID: {formId}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-2 bg-white shadow-md rounded-lg mt-10">
      <div className="p-4">
        {/* Back Button */}
        <div className='flex justify-between items-center gap-1'>

          <h2
            className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
            onClick={() => router.back()}
          >
            <ArrowLeft /> Back
          </h2>
          <div className='flex gap-2'>
            <Link href={`/aiform/${formId}`} passHref target='_blank'>
            <Button className='gap-2 '> <SquareArrowOutUpRight className='w-5 h-5'/> Live Preview</Button>
            </Link>
            <Button className='gap-2 bg-blue-500 hover:bg-blue-400'> <Share2 className='w-5 h-5'/> Share</Button>
          </div>

        </div>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          
          {/* FieldController Container */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-6 border border-blue-200 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105">
      
      {/* Header Section */}
      <h3 className="text-2xl font-semibold text-blue-600 flex items-center gap-2">
        <PlusIcon className="h-6 w-6 text-blue-500 animate-bounce" aria-hidden="true" />
        Add New Field
      </h3>
      
      {/* FieldController Component */}
      <div className="w-full">
        <FieldController addField={addField} />
      </div>
      
      {/* Optional: Help Text or Tooltip */}
      <p className="text-sm text-blue-500 text-center">
        Drag and drop fields from the library or create custom ones.
      </p>
    </div>
          
          {/* Formfields Container */}
          <div className="md:col-span-2 border rounded-lg p-4 flex items-center justify-center">
            <Formfields
              jsonform={formData.jsonform}
              onfieldUpdate={onFieldUpdate}
              deleteField={deleteField}
              onReorderFields={handleReorderFields}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
  
};

export default Formui;
