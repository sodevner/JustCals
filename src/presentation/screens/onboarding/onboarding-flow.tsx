// components/OnboardingFlow.tsx
import { OnboardingData } from "@/src/core/types/user-types";
import React, { useEffect } from "react";
import { useOnboarding } from "../../../domain/hooks/useOnboarding";
import { useUser } from "../../../domain/hooks/useUser";
import { AgeScreen } from "../onboarding/age-screen";
import { WeightScreen } from "../onboarding/weight-screen";
import { WelcomeScreen } from "../onboarding/welcome-screen";
import { ActivityScreen } from "./activity-level-screen";
import { CompleteScreen } from "./complete-screen";
import { DietTypeScreen } from "./diet-type-screen";
import { GenderScreen } from "./gender-screen";
import { GoalScreen } from "./goal-screen";
import { HeightScreen } from "./height-screen";

export const OnboardingFlow: React.FC = () => {
  const { currentStep, nextStep, onboardingData } = useOnboarding();
  const { createUserProfile, user } = useUser();

  useEffect(() => {
    console.log("🎭 OnboardingFlow - User changed:", user);
    if (user?.hasCompletedOnboarding) {
      console.log(
        "🎉 Onboarding completed! Navigation should happen automatically."
      );
    }
  }, [user]);

  // Funktion die alle gesammelten Daten verwendet
  const handleCompleteOnboarding = async () => {
    try {
      console.log("🚀 Completing onboarding with data:", onboardingData);

      // Verwende die gesammelten Daten aus dem Onboarding State
      const completeOnboardingData: OnboardingData = {
        weight: onboardingData.weight || 0, // Fallback falls undefined
        birth_date: onboardingData.birth_date, // Default Wert oder später hinzufügen
        height: onboardingData.height || 0, // Fallback falls undefined
        gender: onboardingData.gender,
        diet_type: onboardingData.diet_type,
        activity_level: onboardingData.activity_level, // Korrektur: activityLevel statt activity_level
        goal: onboardingData.goal,
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
        nextStep({ weight });
      }}
    />,
    <HeightScreen
      key="height"
      onNext={async (height) => {
        console.log("⚡ HeightScreen next clicked with weight:", height);
        nextStep({ height });
      }}
    />,
    <AgeScreen
      key="date"
      onNext={async (birth_date) => {
        nextStep({ birth_date });
      }}
    />,
    <GenderScreen
      key="gender"
      onNext={async (gender) => {
        nextStep({ gender });
      }}
    />,
    <ActivityScreen
      key="activity_level"
      onNext={async (activity_level) => {
        nextStep({ activity_level });
      }}
    />,
    <GoalScreen
      key="goal"
      onNext={async (goal) => {
        nextStep({ goal });
      }}
    />,
    <DietTypeScreen // 👈 Neu - nach dem Goal Screen
      key="diet_type"
      onNext={async (diet_type) => {
        nextStep({ diet_type });
      }}
    />,
    <CompleteScreen
      key="complete"
      onComplete={handleCompleteOnboarding}
      userData={onboardingData}
    />,
  ];

  return screens[currentStep] || null;
};
