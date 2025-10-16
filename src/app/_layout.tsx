// _layout.tsx
import { Platform } from "react-native";
import { useUser } from "../domain/hooks/useUser";
import RootLayoutAndroid from "../presentation/components/layout/rootlayout.android";
import RootLayoutiOS from "../presentation/components/layout/rootlayout.ios26";
import { OnboardingFlow } from "../presentation/screens/onboarding/onboarding-flow";

export default function RootLayout() {
  const { user, isLoading } = useUser();
  const isIOS = Platform.OS === "ios" && Platform.Version >= "26";

  console.log("=== ROOT LAYOUT STATE ===");
  console.log("isLoading:", isLoading);
  console.log("hasCompletedOnboarding:", user?.hasCompletedOnboarding);

  if (isLoading) {
    console.log("🔄 Showing loading screen");
    return null;
  }

  const showOnboarding = !user?.hasCompletedOnboarding;
  console.log("🎯 Decision - Show onboarding:", showOnboarding);

  // Wenn Onboarding nicht completed, zeige Onboarding Flow
  if (showOnboarding) {
    return <OnboardingFlow />;
  }

  // Ansonsten zeige die normale App mit Expo Router
  return isIOS ? <RootLayoutiOS /> : <RootLayoutAndroid />;
}
