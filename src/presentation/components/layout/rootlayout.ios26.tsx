import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayoutiOS() {
  return (
    <SafeAreaProvider>
      <NativeTabs>
        <NativeTabs.Trigger name="(tabs)/index">
          <Label>Home</Label>
          <Icon sf="house.fill" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="(tabs)/recepts">
          <Label>Recepts</Label>
          <Icon sf="book" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="(tabs)/profile">
          <Label>Profile</Label>
          <Icon sf="person.fill" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="search" role="search">
          <Label>Search</Label>
          <Icon sf="magnifyingglass" />
        </NativeTabs.Trigger>
      </NativeTabs>
    </SafeAreaProvider>
  );
}
