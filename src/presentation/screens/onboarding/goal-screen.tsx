import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type GoalType =
  | "lose_weight"
  | "maintain"
  | "gain_weight"
  | "build_muscle";

interface GoalOption {
  type: GoalType;
  emoji: string;
  title: string;
  description: string;
  calorieAdjustment: string;
}

interface GoalScreenProps {
  onNext: (goal: GoalType) => void;
  initialValue?: GoalType;
}

export const GoalScreen: React.FC<GoalScreenProps> = ({
  onNext,
  initialValue,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(
    initialValue || null
  );

  const goalOptions: GoalOption[] = [
    {
      type: "lose_weight",
      emoji: "📉",
      title: "Abnehmen",
      description: "Sanfte Gewichtsreduktion",
      calorieAdjustment: "Leichtes Defizit",
    },
    {
      type: "maintain",
      emoji: "⚖️",
      title: "Gewicht halten",
      description: "Aktuelles Gewicht beibehalten",
      calorieAdjustment: "Erhaltungskalorien",
    },
    {
      type: "gain_weight",
      emoji: "📈",
      title: "Zunehmen",
      description: "Gesunde Gewichtszunahme",
      calorieAdjustment: "Leichter Überschuss",
    },
    {
      type: "build_muscle",
      emoji: "💪",
      title: "Muskeln aufbauen",
      description: "Fokus auf Muskelwachstum",
      calorieAdjustment: "Proteinreicher Überschuss",
    },
  ];

  const handleGoalSelect = (goal: GoalType) => {
    setSelectedGoal(goal);
  };

  const handleNext = () => {
    if (selectedGoal) {
      onNext(selectedGoal);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Was ist dein Ziel?</Text>
      <Text style={styles.subtitle}>
        Wähle dein primäres Ziel, damit wir deine Kalorien optimal anpassen
        können.
      </Text>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.goalsContainer}>
          {goalOptions.map((goal) => (
            <TouchableOpacity
              key={goal.type}
              style={[
                styles.goalButton,
                selectedGoal === goal.type && styles.goalButtonSelected,
              ]}
              onPress={() => handleGoalSelect(goal.type)}
            >
              <View style={styles.goalHeader}>
                <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                <View style={styles.goalTextContainer}>
                  <Text
                    style={[
                      styles.goalTitle,
                      selectedGoal === goal.type && styles.goalTitleSelected,
                    ]}
                  >
                    {goal.title}
                  </Text>
                  <Text style={styles.goalDescription}>{goal.description}</Text>
                  <Text style={styles.goalCalorieInfo}>
                    {goal.calorieAdjustment}
                  </Text>
                </View>
              </View>

              {selectedGoal === goal.type && (
                <View style={styles.selectedIndicator}>
                  <Text style={styles.selectedIndicatorText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, !selectedGoal && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!selectedGoal}
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
  goalsContainer: {
    paddingBottom: 10,
  },
  goalButton: {
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
  goalButtonSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FD",
  },
  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  goalEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  goalTextContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  goalTitleSelected: {
    color: "#007AFF",
  },
  goalDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
    marginBottom: 2,
  },
  goalCalorieInfo: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
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
