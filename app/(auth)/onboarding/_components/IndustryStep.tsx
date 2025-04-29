
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface IndustryStepProps {
  data: {
    industry: string;
  };
  updateData: (data: { industry: string }) => void;
}

const industries = [
  { id: 'technology', name: 'Technology' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'finance', name: 'Finance' },
  { id: 'education', name: 'Education' },
  { id: 'retail', name: 'Retail' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'other', name: 'Other' },
];

const IndustryStep = ({ data, updateData }: IndustryStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select your industry</h2>
        <p className="text-gray-500">What industry does your organization operate in?</p>
      </div>

      <RadioGroup
        value={data.industry}
        onValueChange={(value) => updateData({ industry: value })}
        className="grid grid-cols-2 gap-4"
      >
        {industries.map((industry) => (
          <div key={industry.id} className="flex items-start space-x-2">
            <RadioGroupItem id={industry.id} value={industry.id} className="mt-1" />
            <Label
              htmlFor={industry.id}
              className="cursor-pointer flex-1 p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              {industry.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default IndustryStep;
