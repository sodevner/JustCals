import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { IconButton, MD3Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../../../domain/hooks/useUser"; // ✅ User Hook importieren
import Card from "../../../components/ui/card";

export const HOME_ROUTE = "Home";

export default function HomeScreen() {
  const { user } = useUser(); // ✅ User-Daten holen

  // Fallback Werte falls User-Daten nicht vorhanden
  const dailyGoal = user?.dailyCalories || 2500;
  const currentCalories = 3000; // Dies würdest du später aus der Datenbank holen
  const burnedCalories = 450; // Verbrannte Kalorien - später aus DB
  const progress = currentCalories / dailyGoal;

  // Makronährstoff-Daten aus User-Profil oder Fallback
  const macros = [
    {
      label: "Kohlenhydrate",
      current: 180, // Aktueller Wert - später aus DB
      goal: user?.carbs || 300,
      color: "#4CAF50",
    },
    {
      label: "Eiweiß",
      current: 120, // Aktueller Wert - später aus DB
      goal: user?.protein || 150,
      color: "#2196F3",
    },
    {
      label: "Fett",
      current: 60, // Aktueller Wert - später aus DB
      goal: user?.fat || 80,
      color: "#FF9800",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.dayTitle}>Heute</Text>
          <IconButton
            icon="calendar"
            iconColor={MD3Colors.neutral90}
            size={25}
            onPress={() => console.log("Pressed")}
          />
        </View>

        <Text style={styles.sectionTitle}>Übersicht</Text>

        {/* Kalorien Progress Card */}
        <Card>
          <View style={styles.caloriesContainer}>
            {/* Gegessene Kalorien - Links */}
            <View style={styles.calorieSide}>
              <Text style={styles.calorieValue}>{currentCalories}</Text>
              <Text style={styles.calorieLabel}>Gegessen</Text>
            </View>

            {/* Circular Progress - Mitte */}
            <View style={styles.circleContainer}>
              <AnimatedCircularProgress
                size={150}
                width={15}
                backgroundWidth={5}
                fill={Math.min(progress * 100, 100)}
                tintColor={currentCalories > dailyGoal ? "#FF6B6B" : "#4ECDC4"}
                backgroundColor="#3d5875"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round"
              >
                {() => {
                  const remaining = dailyGoal - currentCalories;
                  const isOver = currentCalories > dailyGoal;

                  return (
                    <View style={styles.circleContent}>
                      <Text style={[styles.caloriesRemaining]}>
                        {isOver ? `${Math.abs(remaining)}` : remaining}
                      </Text>
                      <Text style={styles.caloriesLabel}>
                        {isOver ? "Zu viel" : "Übrig"}
                      </Text>
                    </View>
                  );
                }}
              </AnimatedCircularProgress>
            </View>

            {/* Verbrannte Kalorien - Rechts */}
            <View style={styles.calorieSide}>
              <Text style={styles.calorieValue}>{burnedCalories}</Text>
              <Text style={styles.calorieLabel}>Verbrannt</Text>
            </View>
          </View>

          {/* Makronährstoffe */}
          <View style={styles.macros}>
            {macros.map((macro, index) => (
              <View key={index} style={styles.macroItem}>
                <Text style={styles.macroLabel}>{macro.label}</Text>
                <View style={styles.macroBarBackground}>
                  <View
                    style={[
                      styles.macroBarFill,
                      {
                        width: `${(macro.current / macro.goal) * 100}%`,
                        backgroundColor: macro.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.macroValue}>
                  {macro.current}g / {macro.goal}g
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Weitere Sections bleiben gleich */}
        <Text style={styles.sectionTitle}>Ernährung</Text>
        <Card>
          <View style={styles.foodItem}>
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>Haribos (eine Packung)</Text>
              <Text style={styles.foodCalories}>372 kcal</Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Aktivitäten</Text>
        <Card>
          <View style={styles.activityItem}>
            <View style={styles.activityInfo}>
              <Text style={styles.activityName}>Laufen</Text>
              <Text style={styles.activityCalories}>-253 kcal</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dayTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  // Neuer Container für die drei Spalten
  caloriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -10,
  },
  // Seiten-Container für gegessen/verbrannt
  calorieSide: {
    alignItems: "center",
    flex: 1,
    margin: -50,
  },
  calorieValue: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 4,
  },
  calorieLabel: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "600",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  circleContent: {
    alignItems: "center",
  },
  caloriesRemaining: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
  },
  caloriesLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  caloriesSubtitle: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  userGoals: {
    color: "#666",
    fontSize: 10,
    marginTop: 8,
    textAlign: "center",
  },
  macros: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  macroItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  macroLabel: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 4,
  },
  macroValue: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  macroBarBackground: {
    height: 6,
    width: 60,
    backgroundColor: "#333",
    borderRadius: 3,
    marginVertical: 4,
  },
  macroBarFill: {
    height: 6,
    borderRadius: 3,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  foodCalories: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 2,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  activityCalories: {
    color: "#4ECDC4",
    fontSize: 14,
    marginTop: 2,
  },
});
