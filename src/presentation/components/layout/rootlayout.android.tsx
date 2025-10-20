import { MaterialIcons } from "@expo/vector-icons";
import { router, Tabs, usePathname } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayoutAndroid() {
  const pathname = usePathname();

  const showFab = pathname === "/";

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#121212", // Hintergrundfarbe der TabBar
            borderTopColor: "#121212", // optional: obere Linie entfernen
          },
          tabBarActiveTintColor: "#007AFF", // Farbe für aktive Icons/Text
          tabBarInactiveTintColor: "#888", // Farbe für inaktive Icons/Text
        }}
      >
        <Tabs.Screen
          name="(tabs)/index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/recepts"
          options={{
            title: "Recepts",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="book" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            href: null,
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>

      {/* Floating Action Button */}
      {showFab && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/search")}
        >
          <MaterialIcons name="search" size={28} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 90,
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
