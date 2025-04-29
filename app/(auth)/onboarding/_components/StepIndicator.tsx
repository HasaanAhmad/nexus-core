
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const StepIndicator = ({ steps, currentStep, setCurrentStep }: StepIndicatorProps) => {
  return (
    <div className="flex justify-between items-center w-full relative mb-8">
      {/* Progress bar underneath the step indicators */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2">
        <motion.div
          className="h-full bg-purple-600"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {steps.map((step, index) => {
        // Determine if this step is accessible based on current progress
        const isAccessible = index <= currentStep;
        
        return (
          <div 
            key={step.id} 
            className="flex flex-col items-center relative z-10 cursor-pointer"
            onClick={() => isAccessible && setCurrentStep(index)}
          >
            <motion.div 
              className={cn(
                "rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium border-2",
                index < currentStep 
                  ? "border-purple-600 bg-white text-purple-600" 
                  : index === currentStep
                    ? "border-purple-600 bg-purple-600 text-white" 
                    : "border-gray-300 bg-white text-gray-500"
              )}
              whileHover={{ scale: isAccessible ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {index + 1}
            </motion.div>
            
            <div className={cn(
              "mt-2 text-center",
              "text-xs font-medium transition-colors duration-200",
              index <= currentStep ? "text-purple-700" : "text-gray-400"
            )}>
              {step.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
