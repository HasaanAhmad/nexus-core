import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Laptop, 
  Stethoscope, 
  DollarSign, 
  GraduationCap, 
  ShoppingBag, 
  Factory, 
  Utensils, 
  HelpCircle 
} from "lucide-react";

interface IndustryStepProps {
  data: {
    industry: string;
  };
  updateData: (data: { industry: string }) => void;
}

const industries = [
  { id: 'technology', name: 'Technology', icon: Laptop },
  { id: 'healthcare', name: 'Healthcare', icon: Stethoscope },
  { id: 'finance', name: 'Finance', icon: DollarSign },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'retail', name: 'Retail', icon: ShoppingBag },
  { id: 'manufacturing', name: 'Manufacturing', icon: Factory },
  { id: 'hospitality', name: 'Hospitality', icon: Utensils },
  { id: 'other', name: 'Other', icon: HelpCircle },
];

const IndustryStep = ({ data, updateData }: IndustryStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >

      <RadioGroup
        value={data.industry}
        onValueChange={(value) => updateData({ industry: value })}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {industries.map((industry) => {
          const Icon = industry.icon;
          
          return (
            <div key={industry.id} className="relative">
              <RadioGroupItem 
                id={industry.id} 
                value={industry.id} 
                className="peer absolute opacity-0" 
              />
              <Label
                htmlFor={industry.id}
                className="block aspect-square cursor-pointer rounded-lg overflow-hidden"
              >
                <div className="relative h-full w-full">
                  {/* Background Layer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-nexus-50 to-nexus-100
                    peer-checked:from-nexus-100 peer-checked:to-nexus-200 transition-colors duration-300"></div>
                  
                  {/* Bottom Border Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-nexus-200 
                    peer-checked:bg-nexus-500 transition-colors duration-300"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <motion.div 
                      className="h-16 w-16 rounded-full bg-white mb-3 flex items-center justify-center shadow-sm
                        peer-checked:shadow-md transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon 
                        size={32} 
                        className="text-nexus-300 peer-checked:text-nexus-500" 
                      />
                    </motion.div>
                    <span className="text-black font-medium text-center">{industry.name}</span>
                  </div>
                  
                  {/* Selection Overlay */}
                  <motion.div 
                    className="absolute inset-0 border-2 border-nexus-500 rounded-lg opacity-0 
                      peer-checked:opacity-100"
                    initial={false}
                    animate={data.industry === industry.id ? 
                      { scale: 1, opacity: 1 } : 
                      { scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
      
      {data.industry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-nexus-50 rounded-lg text-center text-black border border-nexus-100"
        >
          You selected: <span className="font-medium text-black">
            {industries.find(i => i.id === data.industry)?.name}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IndustryStep;