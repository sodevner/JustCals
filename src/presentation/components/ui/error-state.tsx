import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StateStyles as styles } from "../styles/state-styles";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Fehler bei der Suche</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Erneut versuchen</Text>
      </TouchableOpacity>
    </View>
  );
};
