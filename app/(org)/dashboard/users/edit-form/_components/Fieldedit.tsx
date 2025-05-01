'use client'
import { Edit, Trash } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface Field {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  options?: string[];
}

interface FieldeditProps {
  defaultValue: Field;
  onUpdate: (value: Field) => void;
  deleteField: () => void;
}

const Fieldedit = ({ defaultValue, onUpdate, deleteField }: FieldeditProps) => {
  const [label, setLabel] = useState(defaultValue.label)
  const [placeholder, setPlaceholder] = useState(defaultValue.placeholder)
  
  return (
    <div className='flex gap-2'>
      <Popover>
        <PopoverTrigger><Edit className='w-5 h-5'/></PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Label Name</label>
            <Input type='text' value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>

          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Placeholder Text</label>
            <Input type='text' value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
          </div>
          <Button size='sm' className = "mt-3" onClick={() => onUpdate({
            label: label,
            placeholder: placeholder,
            type: defaultValue.type,
            name: defaultValue.name,
          })}>
            Update
          </Button>
        </PopoverContent>
      </Popover>

      <AlertDialog>
  <AlertDialogTrigger>
  <Trash className='w-5 h-5 text-red-500' />

  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={deleteField}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}

export default Fieldedit

