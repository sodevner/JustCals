import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { StateStyles as styles } from "../styles/state-styles";

interface LoadingStateProps {
  searchQuery: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ searchQuery }) => {
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingContent}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingTitle}>Suche läuft...</Text>
        <Text style={styles.loadingSubtitle}>
          Durchsuche OpenFoodFacts nach "{searchQuery}"
        </Text>
      </View>
    </View>
  );
};
