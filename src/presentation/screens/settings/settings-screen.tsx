import React from "react";
import { StyleSheet, Text, View } from "react-native";
export const SETTINGS_ROUTE = "Settings";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>JustCals — Settings</Text>
      <Text>Willkommen! Hier kannst du deine Einstellungen anpassen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
});
