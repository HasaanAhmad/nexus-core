import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PlusIcon, Trash } from 'lucide-react';

// Define the Field interface
interface Field {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  options?: string[];
  required?: boolean;
}

interface FieldControllerProps {
  addField: (field: Field) => void;
}

const FieldController: React.FC<FieldControllerProps> = ({ addField }) => {
  const [field, setField] = useState<Field>({
    label: '',
    type: 'text',
    name: '',
    placeholder: '',
    options: [],
    required: false,
  });

  const [optionInput, setOptionInput] = useState('');
  const [optionsList, setOptionsList] = useState<string[]>([]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding new option for select, radio, or checkbox fields
  const handleAddOption = () => {
    if (optionInput.trim() !== '') {
      setOptionsList((prev) => [...prev, optionInput.trim()]);
      setOptionInput('');
    }
  };

  // Handle removing an option
  const handleRemoveOption = (index: number) => {
    setOptionsList((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle adding the field
  const handleAddField = () => {
    if (!field.label || !field.name || !field.type) {
      toast.error('Please fill in the required fields');
      return;
    }

    const newField = { ...field };
    if (['select', 'radio', 'checkbox'].includes(field.type)) {
      if (optionsList.length === 0) {
        toast.error('Please add options for this field type');
        return;
      }
      newField.options = optionsList;
    }

    addField(newField);

    // Reset the form
    setField({
      label: '',
      type: 'text',
      name: '',
      placeholder: '',
      options: [],
      required: false,
    });
    setOptionsList([]);
  };

  return (
    <div className="space-y-4">
      {/* Label Field */}
      <div>
        <Label htmlFor="label" className="flex items-center">
          Label
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="ml-2">
                <span>ℹ️</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Display name for the field</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Input
          id="label"
          name="label"
          value={field.label}
          onChange={handleChange}
        />
      </div>

      {/* Name Field */}
      <div>
        <Label htmlFor="name" className="flex items-center">
          Name
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="ml-2">
                <span>ℹ️</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Unique identifier for the field</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Input
          id="name"
          name="name"
          value={field.name}
          onChange={handleChange}
        />
      </div>

      {/* Field Type Selection */}
      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          value={field.type}
          onValueChange={(value) =>
            setField((prev) => ({ ...prev, type: value }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a field type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="textarea">Textarea</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="password">Password</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="select">Select</SelectItem>
            <SelectItem value="radio">Radio Buttons</SelectItem>
            <SelectItem value="checkbox">Checkboxes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Options for select, radio, and checkbox */}
      {['select', 'radio', 'checkbox'].includes(field.type) && (
        <div>
          <Label className="flex items-center">
            Options
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="ml-2">
                  <span>ℹ️</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add options for select, radio, or checkbox fields</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              placeholder="Add an option"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAddOption}
              aria-label="Add option"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-1">
            {optionsList.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded"
              >
                <span>{option}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveOption(index)}
                  aria-label="Remove option"
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder Field */}
      <div>
        <Label htmlFor="placeholder">Placeholder</Label>
        <Input
          id="placeholder"
          name="placeholder"
          value={field.placeholder}
          onChange={handleChange}
        />
      </div>

      {/* Required Field Switch */}
      <div className="flex items-center">
        <Switch
          id="required"
          name="required"
          checked={field.required}
          onCheckedChange={(checked) =>
            setField((prev) => ({ ...prev, required: checked }))
          }
        />
        <Label htmlFor="required" className="ml-2">
          Required
        </Label>
      </div>

      {/* Add Field Button */}
      <Button onClick={handleAddField} className="w-full">
        Add Field
      </Button>
    </div>
  );
};

export default FieldController;
