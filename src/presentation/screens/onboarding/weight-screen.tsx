// screens/onboarding/WeightScreen.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface WeightScreenProps {
  onNext: (weight: number) => void;
  initialValue?: number;
}

export const WeightScreen: React.FC<WeightScreenProps> = ({
  onNext,
  initialValue,
}) => {
  const [weight, setWeight] = useState<string>(initialValue?.toString() || "");

  const handleNext = () => {
    const weightNum = parseFloat(weight);
    if (weightNum > 0 && weightNum < 300) {
      onNext(weightNum);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Was ist dein Gewicht?</Text>
      <TextInput
        style={styles.input}
        placeholder="Gewicht in kg"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    width: "100%",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
