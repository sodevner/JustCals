import React from "react";
import { StyleSheet, Text, View } from "react-native";
export const PROFILE_ROUTE = "Profile";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>JustCals — Profile</Text>
      <Text>Willkommen! Hier siehst du deine Kalorienübersicht.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
});
