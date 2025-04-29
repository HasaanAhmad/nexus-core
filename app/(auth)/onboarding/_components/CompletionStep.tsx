
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CompletionStepProps {
  data: {
    name: string;
    description: string;
    industry: string;
    teamSize: string;
  };
  onComplete: () => Promise<void> | void;
  loading: boolean;
}

const CompletionStep = ({ data, onComplete, loading }: CompletionStepProps) => {
  const isFormComplete = data.name && data.industry && data.teamSize;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
            className="bg-green-100 p-4 rounded-full"
          >
            <Check className="w-12 h-12 text-green-600" />
          </motion.div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your organization is ready!</h2>
        <p className="text-gray-500 mb-8">
          You've successfully completed the onboarding process
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Organization</span>
            <span className="font-medium">{data.name}</span>
          </div>
          {data.description && (
            <div className="flex justify-between">
              <span className="text-gray-500">Description</span>
              <span className="font-medium max-w-[60%] text-right">{data.description}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Industry</span>
            <span className="font-medium">{data.industry}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Team Size</span>
            <span className="font-medium">{data.teamSize}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={onComplete}
          disabled={!isFormComplete || loading}
          className="px-8 py-6 text-lg bg-purple-600 hover:bg-purple-700"
        >
          {loading ? 'Creating your workspace...' : 'Launch your workspace'}
        </Button>
      </div>
    </motion.div>
  );
};

export default CompletionStep;
