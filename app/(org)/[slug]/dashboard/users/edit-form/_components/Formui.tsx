'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const { data: session, status } = useSession();
  const user = session?.user || null;
  const isLoaded = status !== 'loading';
  const isSignedIn = !!user;
  
  // Reference to track if data has been fetched
  const dataFetched = useRef(false);
  
  const [formData, setFormData] = useState<{
    id: number;
    jsonform: string;
    createdBy: string;
    createdAt: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formChanged, setFormChanged] = useState(false);

  // Fetch form data only once when user and formId are available
  useEffect(() => {
    if (!isLoaded || !formId || dataFetched.current) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const form = await getForm(Number(formId));
  
        if (!form) {
          setError('No form found');
        } else if (user && form.createdBy !== user.email) {
          setUnauthorized(true);
        } else {
          setFormData(form);
        }
        
        // Mark that we've fetched the data
        dataFetched.current = true;
      } catch (err) {
        setError('Error fetching form data.');
        console.error('Error fetching form:', err);
      } finally {
        setLoading(false);
      }
    };
  
    if (isSignedIn) {
      fetchData();
    }
  }, [formId, isLoaded, isSignedIn, user]);

  // Memoized form update function with debouncing logic
  const saveFormChanges = useCallback(async () => {
    if (formData && formId && formChanged) {
      try {
        await updateForm(Number(formId), formData.jsonform);
        setFormChanged(false);
        toast.success('Changes saved');
      } catch (err) {
        console.error('Error updating form:', err);
        toast.error('Failed to save changes');
      }
    }
  }, [formData, formId, formChanged]);

  // Debounce form changes before saving
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (formChanged) {
      timer = setTimeout(() => {
        saveFormChanges();
      }, 1000); // Increased debounce time
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [formChanged, saveFormChanges]);

  // Field update handler
  const onFieldUpdate = (value: Field, index: number) => {
    setFormData(prevFormData => {
      if (!prevFormData) return null;
      
      const parsedJsonForm = JSON.parse(prevFormData.jsonform);
      parsedJsonForm.fields[index] = { 
        ...parsedJsonForm.fields[index], 
        label: value.label, 
        placeholder: value.placeholder 
      };

      return {
        ...prevFormData,
        jsonform: JSON.stringify(parsedJsonForm)
      };
    });
    
    setFormChanged(true);
    toast('Field Updated Successfully');
  };

  // Field reordering handler
  const handleReorderFields = (updatedFields: Field[]) => {
    setFormData((prevFormData) => {
      if (!prevFormData) return null;
      
      const parsedJsonForm = JSON.parse(prevFormData.jsonform);
      parsedJsonForm.fields = updatedFields;

      return {
        ...prevFormData,
        jsonform: JSON.stringify(parsedJsonForm),
      };
    });
    
    setFormChanged(true);
  };

  // Field deletion handler
  const deleteField = (index: number) => {
    setFormData(prevFormData => {
      if (!prevFormData) return null;
      
      const parsedJsonForm = JSON.parse(prevFormData.jsonform);
      parsedJsonForm.fields.splice(index, 1);

      return {
        ...prevFormData,
        jsonform: JSON.stringify(parsedJsonForm)
      };
    });
    
    setFormChanged(true);
    toast("Field Deleted Successfully");
  };

  // Add field handler
  const addField = (newField: Field) => {
    setFormData((prevFormData) => {
      if (!prevFormData) return null;
      
      const parsedJsonForm = JSON.parse(prevFormData.jsonform);
      parsedJsonForm.fields.push(newField);

      return {
        ...prevFormData,
        jsonform: JSON.stringify(parsedJsonForm),
      };
    });
    
    setFormChanged(true);
    toast("Field Added Successfully");
  };

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
              <Button className='gap-2'> 
                <SquareArrowOutUpRight className='w-5 h-5'/> Live Preview
              </Button>
            </Link>
            <Button className='gap-2 bg-blue-500 hover:bg-blue-400'> 
              <Share2 className='w-5 h-5'/> Share
            </Button>
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