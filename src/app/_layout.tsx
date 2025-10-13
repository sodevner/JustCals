import { MaterialIcons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
const isIOS = Platform.OS === "ios";


  return (
    <>
      {isIOS ? (
        // NativeTabs für iOS 26+
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
      ) : (
        // Tabs + Floating Button für Android / ältere iOS
        <SafeAreaProvider>
          <Tabs>
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="home" size={24} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: "Settings",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="settings" size={24} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="person" size={24} color={color} />
                ),
              }}
            />
          </Tabs>

          {/* Floating Action Button */}
          <TouchableOpacity
            style={styles.fab}
            onPress={() => router.push("/search")}
          >
            <MaterialIcons name="search" size={28} color="white" />
          </TouchableOpacity>
        </SafeAreaProvider>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
