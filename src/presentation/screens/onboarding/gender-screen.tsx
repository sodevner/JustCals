// screens/onboarding/GenderScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Gender = "male" | "female";

interface GenderScreenProps {
  onNext: (gender: Gender) => void;
  initialValue?: Gender;
}

export const GenderScreen: React.FC<GenderScreenProps> = ({
  onNext,
  initialValue,
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(
    initialValue || null
  );

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const handleNext = () => {
    if (selectedGender) {
      onNext(selectedGender);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Was ist dein Geschlecht?</Text>
      <Text style={styles.subtitle}>
        Dies hilft uns, deine Nährstoffbedürfnisse präziser zu berechnen.
      </Text>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === "male" && styles.genderButtonSelected,
          ]}
          onPress={() => handleGenderSelect("male")}
        >
          <Text style={styles.genderEmoji}>👨</Text>
          <Text
            style={[
              styles.genderText,
              selectedGender === "male" && styles.genderTextSelected,
            ]}
          >
            Männlich
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === "female" && styles.genderButtonSelected,
          ]}
          onPress={() => handleGenderSelect("female")}
        >
          <Text style={styles.genderEmoji}>👩</Text>
          <Text
            style={[
              styles.genderText,
              selectedGender === "female" && styles.genderTextSelected,
            ]}
          >
            Weiblich
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, !selectedGender && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!selectedGender}
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
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 50,
    color: "#666",
    lineHeight: 22,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  genderButton: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginHorizontal: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5E5E5",
    backgroundColor: "#F8F9FA",
  },
  genderButtonSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FD",
  },
  genderEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  genderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  genderTextSelected: {
    color: "#007AFF",
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
