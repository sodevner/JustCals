// screens/onboarding/HeightScreen.tsx
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface HeightScreenProps {
  onNext: (height: number) => void;
  initialValue?: number;
  onBack: () => void; // 👈 Neue Prop
  showBackButton?: boolean; // 👈 Optional um Back Button zu steuern
}

export const HeightScreen: React.FC<HeightScreenProps> = ({
  onNext,
  onBack,
  initialValue,
  showBackButton = true,
}) => {
  const [height, setHeight] = useState<string>(initialValue?.toString() || "");

  const handleNext = () => {
    const heightNum = parseInt(height, 10);

    if (!height || isNaN(heightNum)) {
      Alert.alert("Fehler", "Bitte gib eine gültige Körpergröße ein.");
      return;
    }

    if (heightNum < 100) {
      Alert.alert(
        "Hinweis",
        "Bitte gib eine realistische Körpergröße ein (ab 100 cm)."
      );
      return;
    }

    if (heightNum > 250) {
      Alert.alert(
        "Hinweis",
        "Bitte gib eine realistische Körpergröße ein (bis 250 cm)."
      );
      return;
    }

    onNext(heightNum);
  };

  const handleExampleSelect = (exampleHeight: number) => {
    setHeight(exampleHeight.toString());
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Zurück</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Wie groß bist du?</Text>
      <Text style={styles.subtitle}>
        Deine Körpergröße hilft uns, deine Nährstoffbedürfnisse präzise zu
        berechnen.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="z.B. 175"
          keyboardType="number-pad"
          value={height}
          onChangeText={setHeight}
          maxLength={3}
        />
        <Text style={styles.unit}>cm</Text>
      </View>

      {height && (
        <View style={styles.heightInfo}>
          <Text style={styles.heightInMeters}>
            Das entspricht {(parseInt(height, 10) / 100).toFixed(2)} Meter
          </Text>
        </View>
      )}

      <View style={styles.heightExamples}>
        <Text style={styles.exampleTitle}>Häufige Größen:</Text>
        <View style={styles.exampleButtons}>
          {[160, 170, 180, 190].map((exampleHeight) => (
            <TouchableOpacity
              key={exampleHeight}
              style={[
                styles.exampleButton,
                height === exampleHeight.toString() &&
                  styles.exampleButtonActive,
              ]}
              onPress={() => handleExampleSelect(exampleHeight)}
            >
              <Text
                style={[
                  styles.exampleButtonText,
                  height === exampleHeight.toString() &&
                    styles.exampleButtonTextActive,
                ]}
              >
                {exampleHeight} cm
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, !height && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!height}
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
    marginBottom: 16,
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
  heightInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  heightInMeters: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  heightExamples: {
    width: "100%",
    marginBottom: 40,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  exampleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exampleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#F8F9FA",
  },
  exampleButtonActive: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FD",
  },
  exampleButtonText: {
    fontSize: 14,
    color: "#666",
  },
  exampleButtonTextActive: {
    color: "#007AFF",
    fontWeight: "600",
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
