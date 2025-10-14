import { Platform } from "react-native";
import RootLayoutAndroid from "../presentation/components/layout/rootlayout.android";
import RootLayoutiOS from "../presentation/components/layout/rootlayout.ios";

export default function RootLayout() {
  const isIOS = Platform.OS === "ios";
  return isIOS ? <RootLayoutiOS /> : <RootLayoutAndroid />;
}
