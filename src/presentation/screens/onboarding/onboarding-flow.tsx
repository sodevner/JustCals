// components/OnboardingFlow.tsx
import { OnboardingData } from "@/src/core/types/user-types";
import React, { useEffect } from "react";
import { useOnboarding } from "../../../domain/hooks/useOnboarding";
import { useUser } from "../../../domain/hooks/useUser";
import { WeightScreen } from "../onboarding/weight-screen";
import { WelcomeScreen } from "../onboarding/welcome-screen";

export const OnboardingFlow: React.FC = () => {
  const { currentStep, nextStep } = useOnboarding();
  const { createUserProfile, user } = useUser();

  useEffect(() => {
    console.log("🎭 OnboardingFlow - User changed:", user);
    if (user?.hasCompletedOnboarding) {
      console.log(
        "🎉 Onboarding completed! Navigation should happen automatically."
      );
    }
  }, [user]);

  const handleComplete = async (weight: number) => {
    try {
      console.log("🚀 Starting onboarding completion with weight:", weight);

      const completeOnboardingData: OnboardingData = {
        weight: weight,
        age: 30,
        height: 170,
        gender: "male" as const,
        activity_level: "moderate" as const, // Korrektur: activityLevel statt activity_level
      };

      await createUserProfile(completeOnboardingData);
      console.log("🎉 Onboarding completed successfully!");
    } catch (error) {
      console.error("💥 Error completing onboarding:", error);
    }
  };

  const screens = [
    <WelcomeScreen key="welcome" onNext={() => nextStep()} />,
    <WeightScreen
      key="weight"
      onNext={async (weight) => {
        console.log("⚡ WeightScreen next clicked with weight:", weight);
        await handleComplete(weight);
      }}
    />,
  ];

  return screens[currentStep] || null;
};
