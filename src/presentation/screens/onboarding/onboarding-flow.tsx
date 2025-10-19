// components/OnboardingFlow.tsx
import { OnboardingData } from "@/src/core/types/user-types";
import React, { useEffect } from "react";
import { useOnboarding } from "../../../domain/hooks/useOnboarding";
import { useUser } from "../../../domain/hooks/useUser";
import { SwipeGesture } from "../../components/ui/swipe-gesture"; // 👈 Import
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
  const { currentStep, nextStep, prevStep, onboardingData } = useOnboarding();
  const { createUserProfile, user } = useUser();

  useEffect(() => {
    console.log("🎭 OnboardingFlow - User changed:", user);
    if (user?.hasCompletedOnboarding) {
      console.log(
        "🎉 Onboarding completed! Navigation should happen automatically."
      );
    }
  }, [user]);

  const handleCompleteOnboarding = async () => {
    try {
      console.log("🚀 Completing onboarding with data:", onboardingData);

      if (!onboardingData.birth_date || !onboardingData.gender) {
        console.error("❌ Missing required onboarding data");
        return;
      }

      const completeOnboardingData: OnboardingData = {
        weight: onboardingData.weight || 0,
        birth_date: onboardingData.birth_date,
        height: onboardingData.height || 0,
        gender: onboardingData.gender,
        diet_type: onboardingData.diet_type || "balanced",
        activity_level: onboardingData.activity_level || "moderate",
        goal: onboardingData.goal || "maintain",
      };

      await createUserProfile(completeOnboardingData);
      console.log("🎉 Onboarding completed successfully!");
    } catch (error) {
      console.error("💥 Error completing onboarding:", error);
    }
  };

  // Definiere auf welchen Screens Swipe enabled sein soll
  const isSwipeBackEnabled = currentStep > 0 && currentStep < 8; // Nicht auf Welcome und Complete
  const isSwipeForwardEnabled = currentStep > 0 && currentStep < 7; // Nur bis vor Complete

  const showBackButton = currentStep > 0 && currentStep < 8;

  const handleSwipeRight = () => {
    if (isSwipeBackEnabled) {
      prevStep();
    }
  };

  const handleSwipeLeft = () => {
    if (isSwipeForwardEnabled) {
      // Hier könntest du automatisch zum nächsten Screen gehen
      // oder eine Bestätigung anzeigen
      console.log("Swipe forward detected - implement logic if needed");
    }
  };

  const screens = [
    <WelcomeScreen
      key="welcome"
      onNext={() => nextStep()}
      onBack={prevStep}
      showBackButton={false}
    />,
    <WeightScreen
      key="weight"
      onNext={(weight) => {
        console.log("⚡ WeightScreen next clicked with weight:", weight);
        nextStep({ weight });
      }}
      onBack={prevStep}
      showBackButton={showBackButton}
    />,
    <HeightScreen
      key="height"
      onNext={(height) => {
        console.log("⚡ HeightScreen next clicked with height:", height);
        nextStep({ height });
      }}
      onBack={prevStep}
      showBackButton={showBackButton}
    />,
    <AgeScreen
      key="date"
      onNext={(birth_date) => {
        nextStep({ birth_date });
      }}
      onBack={prevStep}
      showBackButton={showBackButton}
    />,
    <GenderScreen
      key="gender"
      onNext={(gender) => {
        nextStep({ gender });
      }}
      onBack={prevStep}
      showBackButton={showBackButton}
    />,
    <ActivityScreen
      key="activity_level"
      onNext={(activity_level) => {
        nextStep({ activity_level });
      }}
      onBack={prevStep}
      showBackButton={showBackButton}
    />,
    <GoalScreen
      key="goal"
      onNext={(goal) => {
        nextStep({ goal });
      }}
      onBack={prevStep}
      showBackButton={showBackButton}
    />,
    <DietTypeScreen
      key="diet_type"
      onNext={(diet_type) => {
        nextStep({ diet_type });
      }}
      onBack={prevStep}
      showBackButton={showBackButton}
    />,
    <CompleteScreen
      key="complete"
      onComplete={handleCompleteOnboarding}
      onBack={prevStep}
      userData={onboardingData}
      showBackButton={true}
    />,
  ];

  const currentScreen = screens[currentStep];

  return (
    <SwipeGesture
      onSwipeRight={handleSwipeRight}
      onSwipeLeft={handleSwipeLeft}
      enabled={isSwipeBackEnabled || isSwipeForwardEnabled}
    >
      {currentScreen || null}
    </SwipeGesture>
  );
};
