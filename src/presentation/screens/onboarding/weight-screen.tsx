// screens/onboarding/WeightScreen.tsx
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface WeightScreenProps {
  onNext: (weight: number) => void;
  initialValue?: number;
  onBack: () => void; // 👈 Neue Prop
  showBackButton?: boolean; // 👈 Optional um Back Button zu steuern
}

export const WeightScreen: React.FC<WeightScreenProps> = ({
  onNext,
  onBack,
  initialValue,
  showBackButton = true,
}) => {
  const [weight, setWeight] = useState<string>(initialValue?.toString() || "");

  const handleNext = () => {
    const weightNum = parseFloat(weight.replace(",", ".")); // Erlaubt Komma und Punkt

    if (!weight || isNaN(weightNum)) {
      Alert.alert("Fehler", "Bitte gib ein gültiges Gewicht ein.");
      return;
    }

    if (weightNum < 30) {
      Alert.alert("Hinweis", "Bitte gib ein realistisches Gewicht ein.");
      return;
    }

    if (weightNum > 300) {
      Alert.alert("Hinweis", "Bitte gib ein realistisches Gewicht ein.");
      return;
    }

    // Runde auf 1 Dezimalstelle für Konsistenz
    const roundedWeight = Math.round(weightNum * 10) / 10;
    onNext(roundedWeight);
  };

  // Formatierung für die Anzeige
  const formatWeight = (value: string): string => {
    // Ersetze Komma durch Punkt für interne Verarbeitung
    return value.replace(",", ".");
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Zurück</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Was ist dein Gewicht?</Text>
      <Text style={styles.subtitle}>
        Dein Gewicht hilft uns, deine Nährstoffbedürfnisse präzise zu berechnen.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="z.B. 75.5"
          keyboardType="decimal-pad"
          value={weight}
          onChangeText={(text) => setWeight(formatWeight(text))}
          maxLength={6} // 999.9 kg
        />
        <Text style={styles.unit}>kg</Text>
      </View>

      <Text style={styles.exampleText}>
        Dezimaltrennzeichen: Punkt oder Komma (75.5 oder 75,5)
      </Text>

      <TouchableOpacity
        style={[styles.button, !weight && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!weight}
      >
        <Text style={styles.buttonText}>Weiter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    backgroundColor: "#F8F9FA",
    textAlign: "center",
  },
  unit: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginLeft: 12,
    width: 40,
  },
  exampleText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#C7C7CC",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
