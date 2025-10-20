import React from "react";
import { Text, View } from "react-native";
import { StateStyles as styles } from "../styles/state-styles";

interface EmptyStateProps {
  searchQuery: string;
  type: "initial" | "no-results";
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  type,
}) => {
  if (type === "initial") {
    return (
      <View style={styles.initialState}>
        <Text style={styles.initialStateIcon}>🍎</Text>
        <Text style={styles.initialStateTitle}>OpenFoodFacts Suche</Text>
        <Text style={styles.initialStateText}>
          Gib einen Produktnamen ein, um Nährwertinformationen zu finden
        </Text>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tipps:</Text>
          <Text style={styles.tip}>• Vollständige Produktnamen verwenden</Text>
          <Text style={styles.tip}>• Marken mit angeben</Text>
          <Text style={styles.tip}>• Auf Rechtschreibung achten</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.noResults}>
      <Text style={styles.noResultsIcon}>🔍</Text>
      <Text style={styles.noResultsTitle}>Keine Produkte gefunden</Text>
      <Text style={styles.noResultsText}>
        Keine Ergebnisse für "{searchQuery}" gefunden.
      </Text>
      <Text style={styles.noResultsHint}>
        Versuche es mit einem anderen Suchbegriff
      </Text>
    </View>
  );
};
