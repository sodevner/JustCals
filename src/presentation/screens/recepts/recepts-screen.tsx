import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export const RECEPTS_ROUTE = "Recepts";

export default function ReceptsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Coming Soon! — Rezepte</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212", // Dark Mode
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12, color: "#fff" },
});
