import { Platform } from "react-native";
import RootLayoutAndroid from "../presentation/components/layout/rootlayout.android";
import RootLayoutiOS from "../presentation/components/layout/rootlayout.ios26";

export default function RootLayout() {
  const isIOS = Platform.OS === "ios" && Platform.Version >= "26";
  return isIOS ? <RootLayoutiOS /> : <RootLayoutAndroid />;
}
