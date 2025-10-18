import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type DietType = "recommended" | "high_protein" | "low_carb" | "balanced";

interface DietOption {
  type: DietType;
  emoji: string;
  title: string;
  description: string;
  proteinInfo: string;
  carbInfo: string;
}

interface DietTypeScreenProps {
  onNext: (diet_type: DietType) => void;
  initialValue?: DietType;
}

export const DietTypeScreen: React.FC<DietTypeScreenProps> = ({
  onNext,
  initialValue,
}) => {
  const [selectedDiet, setSelectedDiet] = useState<DietType | null>(
    initialValue || null
  );

  const dietOptions: DietOption[] = [
    {
      type: "recommended",
      emoji: "🎯",
      title: "Empfohlen",
      description: "Optimale Verteilung für dein Ziel",
      proteinInfo: "Moderat",
      carbInfo: "Ausgewogen",
    },
    {
      type: "high_protein",
      emoji: "🍗",
      title: "High-Protein",
      description: "Mehr Protein für Sättigung und Muskeln",
      proteinInfo: "Hoch",
      carbInfo: "Weniger",
    },
    {
      type: "low_carb",
      emoji: "🥑",
      title: "Low-Carb",
      description: "Weniger Kohlenhydrate, mehr Fett",
      proteinInfo: "Hoch",
      carbInfo: "Sehr wenig",
    },
    {
      type: "balanced",
      emoji: "⚖️",
      title: "Ausgewogen",
      description: "Klassische Nährstoffverteilung",
      proteinInfo: "Moderat",
      carbInfo: "Höher",
    },
  ];

  const handleDietSelect = (diet: DietType) => {
    setSelectedDiet(diet);
  };

  const handleNext = () => {
    if (selectedDiet) {
      onNext(selectedDiet);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wie möchtest du essen?</Text>
      <Text style={styles.subtitle}>
        Wähle deine bevorzugte Ernährungsweise. Du kannst dies später jederzeit
        ändern.
      </Text>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dietsContainer}>
          {dietOptions.map((diet) => (
            <TouchableOpacity
              key={diet.type}
              style={[
                styles.dietButton,
                selectedDiet === diet.type && styles.dietButtonSelected,
              ]}
              onPress={() => handleDietSelect(diet.type)}
            >
              <View style={styles.dietHeader}>
                <Text style={styles.dietEmoji}>{diet.emoji}</Text>
                <View style={styles.dietTextContainer}>
                  <Text
                    style={[
                      styles.dietTitle,
                      selectedDiet === diet.type && styles.dietTitleSelected,
                    ]}
                  >
                    {diet.title}
                  </Text>
                  <Text style={styles.dietDescription}>{diet.description}</Text>
                  <View style={styles.macroInfo}>
                    <View style={styles.macroItem}>
                      <Text style={styles.macroLabel}>Protein:</Text>
                      <Text style={styles.macroValue}>{diet.proteinInfo}</Text>
                    </View>
                    <View style={styles.macroItem}>
                      <Text style={styles.macroLabel}>Carbs:</Text>
                      <Text style={styles.macroValue}>{diet.carbInfo}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {selectedDiet === diet.type && (
                <View style={styles.selectedIndicator}>
                  <Text style={styles.selectedIndicatorText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, !selectedDiet && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!selectedDiet}
      >
        <Text style={styles.buttonText}>Weiter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  dietsContainer: {
    paddingBottom: 10,
  },
  dietButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5E5E5",
    backgroundColor: "#F8F9FA",
  },
  dietButtonSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FD",
  },
  dietHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  dietEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  dietTextContainer: {
    flex: 1,
  },
  dietTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  dietTitleSelected: {
    color: "#007AFF",
  },
  dietDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
  },
  macroInfo: {
    flexDirection: "row",
    gap: 16,
  },
  macroItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  macroLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  macroValue: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "600",
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIndicatorText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
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
