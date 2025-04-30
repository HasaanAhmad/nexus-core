'use client'
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

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
    <div className="w-full p-6 mb-8 bg-nexus-50 rounded-xl">
      <div className="flex justify-between items-center w-full relative">
        {/* Progress connection */}
        <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 -z-10">
          <div className="w-full h-full bg-white rounded-full shadow-inner"></div>
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-nexus-400 to-nexus-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {steps.map((step, index) => {
          const isAccessible = index <= currentStep;
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <div 
              key={step.id} 
              className="flex flex-col items-center relative z-0"
              onClick={() => isAccessible && setCurrentStep(index)}
            >
              <motion.div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-3 cursor-pointer",
                  isCompleted
                    ? "bg-gradient-to-br from-nexus-500 to-nexus-700 text-white shadow-lg" 
                    : isActive
                      ? "bg-white border-4 border-nexus-400 text-nexus-600 shadow-xl" 
                      : "bg-white text-nexus-300 shadow-md",
                  "transition-all duration-200"
                )}
                style={{
                  boxShadow: isActive 
                    ? '6px 6px 12px rgba(175, 165, 220, 0.5), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                    : isCompleted
                      ? '4px 4px 8px rgba(105, 39, 205, 0.3)'
                      : '4px 4px 8px rgba(210, 205, 230, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.8)'
                }}
                whileHover={{ 
                  scale: isAccessible ? 1.05 : 1,
                  boxShadow: isAccessible 
                    ? '8px 8px 16px rgba(175, 165, 220, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.9)'
                    : '4px 4px 8px rgba(210, 205, 230, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.8)'
                }}
                whileTap={{ 
                  scale: isAccessible ? 0.98 : 1,
                  boxShadow: isAccessible 
                    ? '3px 3px 6px rgba(175, 165, 220, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)'
                    : '4px 4px 8px rgba(210, 205, 230, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.8)'
                }}
              >
                {isCompleted ? (
                  <Check size={28} className="text-white" />
                ) : (
                  <span className={cn(
                    "text-xl font-bold",
                    isActive ? "text-nexus-600" : "text-nexus-300"
                  )}>
                    {index + 1}
                  </span>
                )}
              </motion.div>
              
              <div className={cn(
                "text-center transition-colors duration-200",
                isActive ? "text-nexus-800" : isCompleted ? "text-nexus-600" : "text-nexus-300"
              )}>
                <span className="font-medium text-sm">
                  {step.title}
                </span>
                
                {step.required && isActive && (
                  <span className="block text-xs text-red-500 mt-1">Required</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Current step details */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mt-10 p-6 bg-white rounded-lg"
        style={{
          boxShadow: '5px 5px 10px rgba(175, 165, 220, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.8)'
        }}
      >
        <h3 className="font-semibold text-nexus-700 mb-2">
          Step {currentStep + 1}: {steps[currentStep].title}
        </h3>
        <p className="text-nexus-600">
          {steps[currentStep].description}
        </p>
      </motion.div>
    </div>
  );
};

export default StepIndicator;