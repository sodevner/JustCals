// screens/EditGoalsScreen.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityLevel, GoalType } from "../../../../core/types/user-types";
import { useUser } from "../../../../domain/hooks/useUser";

export default function EditGoalsScreen() {
  const navigation = useNavigation();
  const { user } = useUser();

  const [goals, setGoals] = useState({
    currentWeight: user?.weight || 70,
    targetWeight: 65,
    goal: user?.goal || ("lose_weight" as GoalType),
    activity: user?.activity_level || ("moderate" as ActivityLevel),
    weeklyGoal: -0.5,
    stepTarget: 10000,
  });

  const handleSave = () => {
    console.log("Saving goals:", goals);
    navigation.goBack();
  };

  const goalOptions: { value: GoalType; label: string; emoji: string }[] = [
    { value: "lose_weight", label: "Abnehmen", emoji: "📉" },
    { value: "maintain", label: "Gewicht halten", emoji: "⚖️" },
    { value: "gain_weight", label: "Zunehmen", emoji: "📈" },
    { value: "build_muscle", label: "Muskeln aufbauen", emoji: "💪" },
  ];

  const activityOptions: {
    value: ActivityLevel;
    label: string;
    description: string;
  }[] = [
    {
      value: "sedentary",
      label: "Sitzend",
      description: "Bürojob, wenig Bewegung",
    },
    {
      value: "light",
      label: "Leicht aktiv",
      description: "1-2x pro Woche Sport",
    },
    {
      value: "moderate",
      label: "Mäßig aktiv",
      description: "3-4x pro Woche Sport",
    },
    {
      value: "active",
      label: "Sehr aktiv",
      description: "5-6x pro Woche Sport",
    },
    {
      value: "very_active",
      label: "Extrem aktiv",
      description: "Tägliches intensives Training",
    },
  ];

  const weeklyGoalOptions = [
    { value: -1.0, label: "-1.0 kg/Woche" },
    { value: -0.5, label: "-0.5 kg/Woche" },
    { value: -0.25, label: "-0.25 kg/Woche" },
    { value: 0, label: "Gewicht halten" },
    { value: 0.25, label: "+0.25 kg/Woche" },
    { value: 0.5, label: "+0.5 kg/Woche" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Zurück</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ziele bearbeiten</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Speichern</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Ziel auswählen */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ziel</Text>
          {goalOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                goals.goal === option.value && styles.optionButtonSelected,
              ]}
              onPress={() => setGoals({ ...goals, goal: option.value })}
            >
              <Text style={styles.optionEmoji}>{option.emoji}</Text>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Gewichte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gewicht</Text>
          <View style={styles.weightRow}>
            <View style={styles.weightInput}>
              <Text style={styles.inputLabel}>Aktuelles Gewicht</Text>
              <Text style={styles.weightValue}>{goals.currentWeight} kg</Text>
            </View>
            <View style={styles.weightInput}>
              <Text style={styles.inputLabel}>Zielgewicht</Text>
              <Text style={styles.weightValue}>{goals.targetWeight} kg</Text>
            </View>
          </View>
        </View>

        {/* Aktivität */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aktivitätslevel</Text>
          {activityOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                goals.activity === option.value && styles.optionButtonSelected,
              ]}
              onPress={() => setGoals({ ...goals, activity: option.value })}
            >
              <View style={styles.activityOption}>
                <Text style={styles.optionText}>{option.label}</Text>
                <Text style={styles.optionDescription}>
                  {option.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Wochenziel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wochenziel</Text>
          {weeklyGoalOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                goals.weeklyGoal === option.value &&
                  styles.optionButtonSelected,
              ]}
              onPress={() => setGoals({ ...goals, weeklyGoal: option.value })}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Schrittziel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schrittziel</Text>
          <Text style={styles.stepValue}>
            {goals.stepTarget.toLocaleString()} Schritte
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    color: "#007AFF",
    fontSize: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333",
  },
  optionButtonSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#1A3A5F",
  },
  optionEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  activityOption: {
    flex: 1,
  },
  optionDescription: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 2,
  },
  weightRow: {
    flexDirection: "row",
    gap: 12,
  },
  weightInput: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333",
  },
  inputLabel: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 4,
  },
  weightValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  stepValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333",
  },
});
