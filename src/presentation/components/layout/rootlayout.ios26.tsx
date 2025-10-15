import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayoutiOS() {
  return (
    <SafeAreaProvider>
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf="house.fill" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="settings">
          <Label>Settings</Label>
          <Icon sf="gear" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="profile">
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
