import { OnboardingData } from "@/src/core/types/user-types";
import { useState } from "react";

// domain/hooks/useOnboarding.ts
export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  const [history, setHistory] = useState<number[]>([]); // Track navigation history

  const nextStep = (data?: Partial<OnboardingData>) => {
    // Zur History hinzufügen bevor wir weiter gehen
    setHistory(prev => [...prev, currentStep]);
    
    if (data) {
      setOnboardingData(prev => ({ ...prev, ...data }));
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (history.length > 0) {
      const previousStep = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1)); // Letzten Eintrag entfernen
      setCurrentStep(previousStep);
    } else {
      // Fallback: Einfach einen Schritt zurück
      setCurrentStep(prev => Math.max(0, prev - 1));
    }
  };

  const goToStep = (step: number) => {
    setHistory(prev => [...prev, currentStep]);
    setCurrentStep(step);
  };

  const resetOnboarding = () => {
    setCurrentStep(0);
    setOnboardingData({});
    setHistory([]);
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    onboardingData,
    resetOnboarding,
  };
};