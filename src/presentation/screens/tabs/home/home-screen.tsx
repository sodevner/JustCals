import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { IconButton, MD3Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../../core/utils/supabase";
import { useUser } from "../../../../domain/hooks/useUser";
import Card from "../../../components/ui/card";

interface DailyLog {
  id: string;
  product_name: string;
  energy_kcal: number;
  carbohydrates_g: number;
  protein_g: number;
  fat_g: number;
  serving_label: string;
  created_at: string;
}

export const HOME_ROUTE = "Home";

export default function HomeScreen() {
  const { user } = useUser();
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Lade die täglichen Logs aus Supabase
  useEffect(() => {
    loadDailyLogs();
  }, []);

  const loadDailyLogs = useCallback(async () => {
    try {
      setRefreshing(true);
      if (!user?.id) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data, error } = await supabase
        .from("daily_logs")
        .select("*")
        .eq("user_id", user.id)
        .gte("created_at", today.toISOString())
        .lt("created_at", tomorrow.toISOString())
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading daily logs:", error);
        return;
      }

      setDailyLogs(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  // Lade Daten beim ersten Render
  useEffect(() => {
    loadDailyLogs();
  }, [loadDailyLogs]);

  useFocusEffect(
    useCallback(() => {
      loadDailyLogs();
    }, [loadDailyLogs])
  );

  const onRefresh = useCallback(() => {
    loadDailyLogs();
  }, [loadDailyLogs]);

  // Berechne Gesamtwerte für den Tag
  const totalCalories = dailyLogs.reduce(
    (sum, log) => sum + log.energy_kcal,
    0
  );
  const totalCarbs = dailyLogs.reduce(
    (sum, log) => sum + log.carbohydrates_g,
    0
  );
  const totalProtein = dailyLogs.reduce((sum, log) => sum + log.protein_g, 0);
  const totalFat = dailyLogs.reduce((sum, log) => sum + log.fat_g, 0);

  // Fallback Werte falls User-Daten nicht vorhanden
  const dailyGoal = user?.dailyCalories || 2500;
  const carbsGoal = user?.carbs || 300;
  const proteinGoal = user?.protein || 150;
  const fatGoal = user?.fat || 80;

  const progress = totalCalories / dailyGoal;

  // Makronährstoff-Daten
  const macros = [
    {
      label: "Kohlenhydrate",
      current: totalCarbs,
      goal: carbsGoal,
      color: "#4CAF50",
    },
    {
      label: "Eiweiß",
      current: totalProtein,
      goal: proteinGoal,
      color: "#2196F3",
    },
    {
      label: "Fett",
      current: totalFat,
      goal: fatGoal,
      color: "#FF9800",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4ECDC4"]}
            tintColor="#4ECDC4"
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.dayTitle}>Heute</Text>
          <IconButton
            icon="refresh"
            iconColor={MD3Colors.neutral90}
            size={25}
            onPress={loadDailyLogs}
          />
        </View>

        <Text style={styles.sectionTitle}>Übersicht</Text>

        {/* Kalorien Progress Card */}
        <View
          style={[
            styles.caloriesCard,
            {
              borderColor: totalCalories > dailyGoal ? "#FF6B6B" : "#4ECDC4",
            },
          ]}
        >
          <View style={styles.caloriesContainer}>
            {/* Gegessene Kalorien - Links */}
            <View style={styles.calorieSide}>
              <Text style={styles.calorieValue}>{totalCalories}</Text>
              <Text style={styles.calorieLabel}>Gegessen</Text>
            </View>

            {/* Circular Progress - Mitte */}
            <View style={styles.circleContainer}>
              <AnimatedCircularProgress
                size={150}
                width={15}
                backgroundWidth={5}
                fill={Math.min(progress * 100, 100)}
                tintColor={totalCalories > dailyGoal ? "#FF6B6B" : "#4ECDC4"}
                backgroundColor="#3d5875"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round"
              >
                {() => {
                  const remaining = dailyGoal - totalCalories;
                  const isOver = totalCalories > dailyGoal;

                  return (
                    <View style={styles.circleContent}>
                      <Text style={styles.caloriesRemaining}>
                        {isOver ? `+${Math.abs(remaining)}` : remaining}
                      </Text>
                      <Text style={styles.caloriesLabel}>
                        {isOver ? "Zu viel" : "Übrig"}
                      </Text>
                    </View>
                  );
                }}
              </AnimatedCircularProgress>
            </View>

            {/* Tagesziel - Rechts */}
            <View style={styles.calorieSide}>
              <Text style={styles.calorieValue}>{dailyGoal}</Text>
              <Text style={styles.calorieLabel}>Ziel</Text>
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
                        width: `${Math.min((macro.current / macro.goal) * 100, 100)}%`,
                        backgroundColor: macro.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.macroValue}>
                  {Math.round(macro.current)}g / {macro.goal}g
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ernährung - Eingetragene Lebensmittel */}
        <Text style={styles.sectionTitle}>Ernährung</Text>

        {loading ? (
          <Card>
            <Text style={styles.loadingText}>Lade Daten...</Text>
          </Card>
        ) : dailyLogs.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>
              Noch keine Lebensmittel heute hinzugefügt
            </Text>
          </Card>
        ) : (
          dailyLogs.map((log) => (
            <Card key={log.id} style={styles.foodCard}>
              <View style={styles.foodItem}>
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{log.product_name}</Text>
                  <Text style={styles.foodServing}>{log.serving_label}</Text>
                  <View style={styles.foodMacros}>
                    <Text style={styles.foodMacro}>
                      K: {Math.round(log.carbohydrates_g)}g
                    </Text>
                    <Text style={styles.foodMacro}>
                      E: {Math.round(log.protein_g)}g
                    </Text>
                    <Text style={styles.foodMacro}>
                      F: {Math.round(log.fat_g)}g
                    </Text>
                  </View>
                </View>
                <View style={styles.foodCaloriesContainer}>
                  <Text style={styles.foodCalories}>
                    {Math.round(log.energy_kcal)}
                  </Text>
                  <Text style={styles.foodCaloriesLabel}>kcal</Text>
                </View>
              </View>
            </Card>
          ))
        )}

        {/* Aktivitäten Section entfernt */}
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
  caloriesCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 35,
    borderWidth: 2,
    padding: 20,
    elevation: 5,
    margin: 10,
  },
  caloriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -10,
  },
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
  foodCard: {
    marginBottom: 10,
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
    marginBottom: 4,
  },
  foodServing: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 6,
  },
  foodMacros: {
    flexDirection: "row",
    gap: 12,
  },
  foodMacro: {
    color: "#aaa",
    fontSize: 12,
  },
  foodCaloriesContainer: {
    alignItems: "center",
  },
  foodCalories: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  foodCaloriesLabel: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  loadingText: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    padding: 20,
  },
  emptyText: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    padding: 20,
  },
});
