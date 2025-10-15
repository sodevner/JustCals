import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { supabase } from "../core/utils/supabase";
import { ensureGuestUser } from "../data/services/guestUserService";
import RootLayoutAndroid from "../presentation/components/layout/rootlayout.android";
import RootLayoutiOS from "../presentation/components/layout/rootlayout.ios26";
import OnboardingScreen from "../presentation/screens/onboarding/onboarding-screen";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  const isIOS = Platform.OS === "ios" && Platform.Version >= "26";

  useEffect(() => {
    const init = async () => {
      try {
        const userId = await ensureGuestUser();
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        setHasProfile(!!profile?.weight);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!hasProfile) return <OnboardingScreen />;

  return isIOS ? <RootLayoutiOS /> : <RootLayoutAndroid />;
}
