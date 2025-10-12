import React from "react";
import { StyleSheet, Text, View } from "react-native";
export const SEARCH_ROUTE = "Search";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>JustCals — Suche</Text>
      <Text>Willkommen! Hier kannst du deine Einstellungen anpassen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
});
