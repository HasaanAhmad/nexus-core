
'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrganizationDetails from './OrganizationDetails';
import LocationStep from './LocationStep';
import IndustryStep from './IndustryStep';
import TeamSizeStep from './TeamSizeStep';
import CompletionStep from './CompletionStep';
import { toast } from 'sonner';
import StepIndicator from './StepIndicator';
import { createOrganization } from '@/actions/OrganizationActions';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [organizationData, setOrganizationData] = useState({
    name: '',
    description: '',
    location: { lat: 40.7128, lng: -74.0060 },
    industry: '',
    teamSize: ''
  });
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      id: 'organization',
      title: 'Organization Details',
      description: 'Let\'s start with the basics',
      component: OrganizationDetails,
      required: true
    },
    {
      id: 'location',
      title: 'Location',
      description: 'Where are you based?',
      component: LocationStep,
      required: false
    },
    {
      id: 'industry',
      title: 'Industry',
      description: 'What industry do you operate in?',
      component: IndustryStep,
      required: true
    },
    {
      id: 'team-size',
      title: 'Team Size',
      description: 'How many people work with you?',
      component: TeamSizeStep,
      required: true
    },
    {
      id: 'completion',
      title: 'All Set!',
      description: 'Your organization is ready',
      component: CompletionStep,
      required: true
    }
  ];

  const updateFormData = (data: Partial<typeof organizationData>) => {
    setOrganizationData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const response = await createOrganization(organizationData);
      if (!response.success) {
        toast.error("Failed to create organization", {
          description: response.message,
        });
        return;
      }
      toast.success("Organization created successfully", {
        description: "Your organization has been created successfully.",
      });

    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const isLastStep = currentStep === steps.length - 1;

  // Determine if the current step is complete
  const isCurrentStepComplete = () => {
    const currentStepData = steps[currentStep];
    if (!currentStepData.required) return true;
    
    switch (currentStepData.id) {
      case 'organization':
        return !!organizationData.name;
      case 'industry':
        return !!organizationData.industry;
      case 'team-size':
        return !!organizationData.teamSize;
      case 'completion':
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="relative">
            <div className="absolute top-0 left-0 h-1 bg-gray-100 w-full">
              <motion.div 
                className="h-full bg-purple-500"
                initial={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="pt-8 px-8 pb-6">
              <StepIndicator 
                steps={steps} 
                currentStep={currentStep} 
                setCurrentStep={setCurrentStep} 
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[currentStep].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[400px]"
                >
                  <CurrentStepComponent 
                    data={organizationData}
                    updateData={updateFormData}
                    onSkip={!steps[currentStep].required ? handleNext : undefined}
                    onComplete={isLastStep ? handleComplete : () => {}}
                    loading={loading}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={currentStep === 0 ? 'opacity-0' : ''}
                >
                  Back
                </Button>

                {!isLastStep ? (
                  <Button 
                    onClick={handleNext}
                    disabled={steps[currentStep].required && !isCurrentStepComplete()}
                  >
                    Continue
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Onboarding;
