import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Field {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    options?: string[];
}

interface FieldRendererProps {
    field: Field;
    value: string | string[] | boolean;
    onChange: (name: string, value: string | string[] | boolean) => void;
}

const FieldRenderer = ({ field, value, onChange }: FieldRendererProps) => {
    switch (field.type) {
        case 'text':
        case 'email':
        case 'tel':
        case 'date':
        case 'password':
        case 'number':
        case 'time':
        case 'year':
            return (
                <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={value as string || ''}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            );

        case 'textarea':
            return (
                <Textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    value={value as string || ''}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            );

        case 'select':
            return (
                <Select
                    value={value as string || ''}
                    onValueChange={(value) => onChange(field.name, value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {field.options?.map((option, idx) => (
                            <SelectItem key={idx} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );

        case 'checkbox':
            return field.options ? (
                <div className="flex flex-wrap gap-2">
                    {field.options.map((option, idx) => (
                        <label key={idx} className="inline-flex items-center">
                            <Checkbox
                                checked={(value as string[] || []).includes(option)}
                                onCheckedChange={(checked: boolean) => {
                                    const updatedValues = checked
                                        ? [...(value as string[]), option]
                                        : (value as string[]).filter(val => val !== option);

                                    onChange(field.name, updatedValues);
                                }}
                            />
                            <span className="ml-2">{option}</span>
                        </label>
                    ))}
                </div>
            ) : (
                <label className="inline-flex items-center">
                    <Checkbox
                        checked={value as boolean || false}
                        onCheckedChange={(checked: boolean) => onChange(field.name, checked)}
                    />
                    <span className="ml-2">{field.placeholder}</span>
                </label>
            );

        case 'radio':
            return (
                <RadioGroup
                    value={value as string || ''}
                    onValueChange={(value) => onChange(field.name, value)}
                >
                    {field.options?.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${field.name}-${option}`} />
                            <Label htmlFor={`${field.name}-${option}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            );
        case 'time':
            return (
                <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={value as string || ''}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            );

        default:
            return null;
    }
};

export default FieldRenderer;