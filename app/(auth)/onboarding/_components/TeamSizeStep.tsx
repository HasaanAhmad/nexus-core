
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TeamSizeStepProps {
  data: {
    teamSize: string;
  };
  updateData: (data: { teamSize: string }) => void;
}

const teamSizes = [
  { id: '1-10', name: '1-10 employees' },
  { id: '11-50', name: '11-50 employees' },
  { id: '51-200', name: '51-200 employees' },
  { id: '201-500', name: '201-500 employees' },
  { id: '501-1000', name: '501-1000 employees' },
  { id: '1000+', name: '1000+ employees' },
];

const TeamSizeStep = ({ data, updateData }: TeamSizeStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">How big is your team?</h2>
        <p className="text-gray-500">Select the number of employees in your organization</p>
      </div>

      <RadioGroup
        value={data.teamSize}
        onValueChange={(value) => updateData({ teamSize: value })}
        className="space-y-3"
      >
        {teamSizes.map((size) => (
          <div key={size.id} className="flex items-center space-x-2">
            <RadioGroupItem id={size.id} value={size.id} />
            <Label
              htmlFor={size.id}
              className="cursor-pointer flex-1 p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              {size.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default TeamSizeStep;
