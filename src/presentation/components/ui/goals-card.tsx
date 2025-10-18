// components/ui/goals-card.tsx
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../../../domain/hooks/useUser";
import Card from "./card";

export default function GoalsCard() {
  const { user } = useUser();

  const router = useRouter(); // 👈 Expo Router verwenden

  const handleEditPress = () => {
    router.push("/edit-goals"); // 👈 Zur Edit-Goals Seite navigieren
  };

  const goals = {
    currentWeight: user?.weight || 70,
    targetWeight: 65, // Später aus User-Daten
    goal: user?.goal || "lose_weight",
    activity: user?.activity_level || "moderate",
    weeklyGoal: -0.5, // Später aus User-Daten
    calorieTarget: user?.dailyCalories || 2000,
    stepTarget: 10000, // Später aus User-Daten
    proteinTarget: user?.protein || 120,
    carbTarget: user?.carbs || 200,
    fatTarget: user?.fat || 65,
  };

  const getGoalDisplay = (goal: string) => {
    const goalMap = {
      lose_weight: "Abnehmen",
      maintain: "Gewicht halten",
      gain_weight: "Zunehmen",
      build_muscle: "Muskeln aufbauen",
    };
    return goalMap[goal as keyof typeof goalMap] || goal;
  };

  const getActivityDisplay = (activity: string) => {
    const activityMap = {
      sedentary: "Sitzend",
      light: "Leicht aktiv",
      moderate: "Mäßig aktiv",
      active: "Sehr aktiv",
      very_active: "Extrem aktiv",
    };
    return activityMap[activity as keyof typeof activityMap] || activity;
  };

  return (
    <TouchableOpacity onPress={handleEditPress} activeOpacity={0.7}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.title}>Meine Ziele</Text>
          <Text style={styles.editHint}>Tippe zum Bearbeiten</Text>
        </View>

        <View style={styles.goalsGrid}>
          {/* Zeile 1 */}
          <View style={styles.goalRow}>
            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>Ziel</Text>
              <Text style={styles.goalValue}>{getGoalDisplay(goals.goal)}</Text>
            </View>
            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>Aktivität</Text>
              <Text style={styles.goalValue}>
                {getActivityDisplay(goals.activity)}
              </Text>
            </View>
          </View>

          {/* Zeile 2 */}
          <View style={styles.goalRow}>
            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>Aktuelles Gewicht</Text>
              <Text style={styles.goalValue}>{goals.currentWeight} kg</Text>
            </View>
            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>Zielgewicht</Text>
              <Text style={styles.goalValue}>{goals.targetWeight} kg</Text>
            </View>
          </View>

          {/* Zeile 3 */}
          <View style={styles.goalRow}>
            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>Wochenziel</Text>
              <Text style={styles.goalValue}>
                {goals.weeklyGoal > 0 ? "+" : ""}
                {goals.weeklyGoal} kg/Woche
              </Text>
            </View>
            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>Schrittziel</Text>
              <Text style={styles.goalValue}>
                {goals.stepTarget.toLocaleString()} Schritte
              </Text>
            </View>
          </View>

          {/* Kalorien */}
          <View style={styles.calorieSection}>
            <Text style={styles.goalLabel}>Tägliche Kalorien</Text>
            <Text style={styles.calorieValue}>{goals.calorieTarget} kcal</Text>
          </View>

          {/* Nährstoffe */}
          <View style={styles.nutrientsSection}>
            <Text style={styles.nutrientsTitle}>Tägliche Nährwerte</Text>
            <View style={styles.nutrientsGrid}>
              <View style={styles.nutrientItem}>
                <Text style={styles.nutrientValue}>{goals.proteinTarget}g</Text>
                <Text style={styles.nutrientLabel}>Protein</Text>
              </View>
              <View style={styles.nutrientItem}>
                <Text style={styles.nutrientValue}>{goals.carbTarget}g</Text>
                <Text style={styles.nutrientLabel}>Carbs</Text>
              </View>
              <View style={styles.nutrientItem}>
                <Text style={styles.nutrientValue}>{goals.fatTarget}g</Text>
                <Text style={styles.nutrientLabel}>Fett</Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  editHint: {
    color: "#007AFF",
    fontSize: 14,
  },
  goalsGrid: {
    gap: 16,
  },
  goalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  goalItem: {
    flex: 1,
  },
  goalLabel: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 4,
  },
  goalValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  calorieSection: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  calorieValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  nutrientsSection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  nutrientsTitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 12,
  },
  nutrientsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutrientItem: {
    alignItems: "center",
    flex: 1,
  },
  nutrientValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  nutrientLabel: {
    color: "#aaa",
    fontSize: 12,
  },
});
