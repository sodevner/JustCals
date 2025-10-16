// hooks/useOnboarding.ts
import { useState } from 'react';
import { OnboardingData } from '../../core/types/user-types';

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});

  const nextStep = (data?: Partial<OnboardingData>) => {
    if (data) {
      setOnboardingData(prev => ({ ...prev, ...data }));
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const resetOnboarding = () => {
    setCurrentStep(0);
    setOnboardingData({});
  };

  return {
    currentStep,
    onboardingData: onboardingData as OnboardingData,
    nextStep,
    prevStep,
    resetOnboarding,
    isComplete: currentStep >= 5 // Anzahl der Screens
  };
};