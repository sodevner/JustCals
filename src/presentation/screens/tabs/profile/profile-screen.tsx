import WeightSelector from "@/src/presentation/components/ui/weight-selector";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../../../domain/hooks/useUser";
import Card from "../../../components/ui/card";

interface GoalItemProps {
  label: string;
  value: string;
  icon: string;
  color?: string;
}

interface MacroItemProps {
  label: string;
  percentage: string;
  grams: string;
  color: string;
  icon: string;
}

// Helper functions to format data
const formatGoalType = (goal?: string): string => {
  const goalMap = {
    lose_weight: "Gewicht verlieren",
    maintain: "Gewicht halten",
    gain_weight: "Gewicht zunehmen",
    build_muscle: "Muskelaufbau",
  };
  return goalMap[goal as keyof typeof goalMap] || "Body Recomposition";
};

const formatActivityLevel = (activity?: string): string => {
  const activityMap = {
    sedentary: "Sitzend",
    light: "Leicht aktiv",
    moderate: "Mäßig aktiv (3-5x/Woche)",
    active: "Aktiv",
    very_active: "Sehr aktiv",
  };
  return (
    activityMap[activity as keyof typeof activityMap] ||
    "Mäßig aktiv (3-5x/Woche)"
  );
};

const formatDietType = (diet?: string): string => {
  const dietMap = {
    recommended: "Empfohlen",
    high_protein: "High Protein",
    low_carb: "Low Carb",
    balanced: "Ausgewogen",
  };
  return dietMap[diet as keyof typeof dietMap] || "High Protein";
};

// Calculate macro percentages
const calculateMacroPercentages = (user: any) => {
  if (!user?.dailyCalories || !user?.protein || !user?.carbs || !user?.fat) {
    return {
      proteine: { percentage: "35%", grams: "166g" },
      kohlenhydrate: { percentage: "40%", grams: "190g" },
      fette: { percentage: "25%", grams: "53g" },
    };
  }

  const proteinCalories = user.protein * 4;
  const carbCalories = user.carbs * 4;
  const fatCalories = user.fat * 9;
  const totalCalories = proteinCalories + carbCalories + fatCalories;

  const proteinPercentage = Math.round((proteinCalories / totalCalories) * 100);
  const carbPercentage = Math.round((carbCalories / totalCalories) * 100);
  const fatPercentage = Math.round((fatCalories / totalCalories) * 100);

  return {
    proteine: {
      percentage: `${proteinPercentage}%`,
      grams: `${user.protein}g`,
    },
    kohlenhydrate: {
      percentage: `${carbPercentage}%`,
      grams: `${user.carbs}g`,
    },
    fette: {
      percentage: `${fatPercentage}%`,
      grams: `${user.fat}g`,
    },
  };
};

export default function ProfileScreen() {
  const { user, isLoading } = useUser();

  // Calculate progress based on weight goals
  const calculateProgress = () => {
    if (!user?.weight) return 65;

    // Example calculation: if goal is weight loss
    const startWeight = 85; // This should come from user data
    const goalWeight = user.goal === "lose_weight" ? 75 : 80;
    const currentProgress =
      ((startWeight - user.weight) / (startWeight - goalWeight)) * 100;
    return Math.min(Math.max(Math.round(currentProgress), 0), 100);
  };

  // Use real user data or fallbacks
  const goalsData = {
    zielTyp: formatGoalType(user?.goal),
    startGewicht: "85 kg", // This should come from initial onboarding weight
    zielGewicht: user?.goal === "lose_weight" ? "75 kg" : "80 kg",
    verbleibend:
      user?.weight && user.goal === "lose_weight"
        ? `${Math.max(0, Math.round(user.weight - 75))} kg`
        : "7 kg",
    aktivitaet: formatActivityLevel(user?.activity_level),
    wochenZiel:
      user?.goal === "lose_weight" ? "-0.5 kg/Woche" : "+0.2 kg/Woche",
    kalorienZiel: user?.dailyCalories
      ? `${user.dailyCalories} kcal/Tag`
      : "1900 kcal/Tag",
    schrittZiel: "10.000 Schritte/Tag",
    naehrstoffFokus: formatDietType(user?.diet_type),
    makros: calculateMacroPercentages(user),
  };

  const progressData = {
    gesamt: calculateProgress(),
    wochenFortschritt: user?.weight ? "-0.8 kg" : "0 kg", // This should be calculated from weight history
    trend: "positiv ↗",
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Lade Profil...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Profil</Text>
          </View>
          <IconButton
            icon="dots-vertical"
            iconColor="#888"
            size={24}
            onPress={() => console.log("Menu pressed")}
          />
        </View>

        {/* USER CARD */}
        <Card>
          <View style={styles.profileContent}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarGradient}>
                  <Text style={styles.avatarText}>👤</Text>
                </View>
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Anonym</Text>
                <Text style={styles.profileSubtitle}>
                  Noch nicht registriert • Jetzt starten
                </Text>
              </View>
            </View>

            {/* Standardisierte Registrierungs-Buttons */}
            <View style={styles.authButtons}>
              <TouchableOpacity style={[styles.authButton, styles.emailButton]}>
                <View style={styles.authButtonContent}>
                  <Text style={styles.authButtonIcon}>📧</Text>
                  <Text style={styles.authButtonText}>
                    Mit E-Mail registrieren
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.authButton, styles.googleButton]}
              >
                <View style={styles.authButtonContent}>
                  <View style={styles.googleIconContainer}>
                    <Text style={styles.authButtonIcon}>G</Text>
                  </View>
                  <Text
                    style={[styles.authButtonText, styles.googleButtonText]}
                  >
                    Mit Google fortfahren
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.authButton, styles.appleButton]}>
                <View style={styles.authButtonContent}>
                  <Text style={styles.authButtonIcon}></Text>
                  <Text style={[styles.authButtonText, styles.appleButtonText]}>
                    Mit Apple fortfahren
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.loginHint}>
              Bereits ein Konto?{" "}
              <Text style={styles.loginLink}>Jetzt anmelden</Text>
            </Text>
          </View>
        </Card>

        {user?.hasCompletedOnboarding && (
          <>
            {/* PROGRESS OVERVIEW */}
            <View style={styles.statsGrid}>
              <Card>
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>{progressData.gesamt}%</Text>
                  <Text style={styles.statLabel}>Gesamtfortschritt</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${progressData.gesamt}%` },
                      ]}
                    />
                  </View>
                </View>
              </Card>
              <Card>
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>
                    {progressData.wochenFortschritt}
                  </Text>
                  <Text style={styles.statLabel}>Diese Woche</Text>
                  <Text style={styles.statTrend}>{progressData.trend}</Text>
                </View>
              </Card>
            </View>

            {/* AKTUELLES GEWICHT */}
            <Text style={styles.sectionTitle}>Aktuelles Gewicht</Text>
            <Card>
              <View style={styles.weightContent}>
                <WeightSelector />
              </View>
            </Card>

            {/* ZIELE */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Meine Ziele</Text>
              <TouchableOpacity>
                <Text style={styles.editButton}>Bearbeiten</Text>
              </TouchableOpacity>
            </View>

            <Card>
              <View style={styles.goalsContent}>
                {/* Hauptziel */}
                <View style={styles.mainGoal}>
                  <View style={styles.goalIconContainer}>
                    <Text style={styles.goalIcon}>🎯</Text>
                  </View>
                  <View style={styles.mainGoalInfo}>
                    <Text style={styles.mainGoalTitle}>
                      {goalsData.zielTyp}
                    </Text>
                    <Text style={styles.mainGoalSubtitle}>
                      {goalsData.verbleibend} bis zum Ziel •{" "}
                      {goalsData.wochenZiel}
                    </Text>
                  </View>
                </View>

                {/* Gewichtsziele - NUR START UND ZIEL */}
                <View style={styles.goalSection}>
                  <Text style={styles.goalSectionTitle}>Gewicht</Text>
                  <View style={styles.goalRow}>
                    <GoalItem
                      label="Start"
                      value={goalsData.startGewicht}
                      icon="flag"
                      color="#6366F1"
                    />
                    <GoalItem
                      label="Ziel"
                      value={goalsData.zielGewicht}
                      icon="target"
                      color="#F59E0B"
                    />
                  </View>
                </View>

                {/* Tägliche Ziele - VERTIKAL */}
                <View style={styles.goalSection}>
                  <Text style={styles.goalSectionTitle}>Tägliche Ziele</Text>
                  <View style={styles.dailyGoalsContainer}>
                    <View style={styles.dailyGoalItem}>
                      <View style={styles.dailyGoalHeader}>
                        <IconButton
                          icon="fire"
                          size={16}
                          iconColor="#EF4444"
                          style={styles.dailyGoalIcon}
                        />
                        <Text style={styles.dailyGoalLabel}>Kalorienziel</Text>
                      </View>
                      <Text style={styles.dailyGoalValue}>
                        {goalsData.kalorienZiel}
                      </Text>
                    </View>

                    <View style={styles.dailyGoalItem}>
                      <View style={styles.dailyGoalHeader}>
                        <IconButton
                          icon="walk"
                          size={16}
                          iconColor="#3B82F6"
                          style={styles.dailyGoalIcon}
                        />
                        <Text style={styles.dailyGoalLabel}>Schrittziel</Text>
                      </View>
                      <Text style={styles.dailyGoalValue}>
                        {goalsData.schrittZiel}
                      </Text>
                    </View>

                    <View style={styles.dailyGoalItem}>
                      <View style={styles.dailyGoalHeader}>
                        <IconButton
                          icon="run"
                          size={16}
                          iconColor="#8B5CF6"
                          style={styles.dailyGoalIcon}
                        />
                        <Text style={styles.dailyGoalLabel}>
                          Aktivitätslevel
                        </Text>
                      </View>
                      <Text style={styles.dailyGoalValue}>
                        {goalsData.aktivitaet}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Nährstofffokus */}
                <View style={styles.nutrientFocus}>
                  <Text style={styles.nutrientFocusTitle}>
                    🏆 Nährstofffokus
                  </Text>
                  <View style={styles.nutrientFocusTags}>
                    <View style={styles.nutrientFocusTag}>
                      <Text style={styles.nutrientFocusTagText}>
                        {goalsData.naehrstoffFokus}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Makronährstoff-Verteilung */}
                <View style={styles.goalSection}>
                  <Text style={styles.goalSectionTitle}>
                    Makronährstoff-Verteilung
                  </Text>
                  <View style={styles.macrosContainer}>
                    <MacroItem
                      label="Protein"
                      percentage={goalsData.makros.proteine.percentage}
                      grams={goalsData.makros.proteine.grams}
                      color="#10B981"
                      icon="food-drumstick"
                    />
                    <MacroItem
                      label="Kohlenhydrate"
                      percentage={goalsData.makros.kohlenhydrate.percentage}
                      grams={goalsData.makros.kohlenhydrate.grams}
                      color="#F59E0B"
                      icon="noodles"
                    />
                    <MacroItem
                      label="Fett"
                      percentage={goalsData.makros.fette.percentage}
                      grams={goalsData.makros.fette.grams}
                      color="#EF4444"
                      icon="butterfly"
                    />

                    {/* Gesamtsumme */}
                    <View style={styles.macroTotal}>
                      <View style={styles.macroTotalLine} />
                      <View style={styles.macroTotalContent}>
                        <Text style={styles.macroTotalLabel}>Gesamt</Text>
                        <Text style={styles.macroTotalValue}>100%</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Card>

            {/* EMPFEHLUNGEN */}
            <Text style={styles.sectionTitle}>AI-Empfehlungen</Text>
            <Card>
              <View style={styles.recommendationsContent}>
                <View style={styles.recommendationItem}>
                  <Text style={styles.recommendationIcon}>💡</Text>
                  <View style={styles.recommendationText}>
                    <Text style={styles.recommendationTitle}>
                      Protein erhöhen
                    </Text>
                    <Text style={styles.recommendationDesc}>
                      Versuche {user?.protein ? user.protein + 10 : 150}g
                      Protein täglich für bessere Muskelregeneration
                    </Text>
                  </View>
                </View>
                <View style={styles.recommendationItem}>
                  <Text style={styles.recommendationIcon}>⚡</Text>
                  <View style={styles.recommendationText}>
                    <Text style={styles.recommendationTitle}>Wasserzufuhr</Text>
                    <Text style={styles.recommendationDesc}>
                      Trinke 1L mehr Wasser für optimale Hydration
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function GoalItem({ label, value, icon, color = "#999" }: GoalItemProps) {
  return (
    <View style={styles.goalItem}>
      <IconButton
        icon={icon}
        size={16}
        iconColor={color}
        style={styles.goalIcon}
      />
      <Text style={styles.goalValue}>{value}</Text>
      <Text style={styles.goalLabel}>{label}</Text>
    </View>
  );
}

function MacroItem({ label, percentage, grams, color, icon }: MacroItemProps) {
  return (
    <View style={styles.macroItem}>
      <View style={styles.macroHeader}>
        <IconButton
          icon={icon}
          size={16}
          iconColor={color}
          style={styles.macroIcon}
        />
        <View style={styles.macroInfo}>
          <Text style={styles.macroLabel}>{label}</Text>
          <Text style={styles.macroGrams}>{grams}</Text>
        </View>
        <Text style={[styles.macroPercentage, { color }]}>{percentage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  pageTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
  },
  profileContent: {
    padding: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatarGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#404040",
  },
  avatarText: {
    fontSize: 32,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#1E1E1E",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileSubtitle: {
    color: "#666",
    fontSize: 15,
    fontWeight: "500",
  },
  authButtons: {
    gap: 12,
    marginBottom: 16,
  },
  authButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  authButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  authButtonIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  authButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  emailButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  googleIconContainer: {
    width: 18,
    height: 18,
    borderRadius: 2,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  googleButtonText: {
    color: "#000",
  },
  appleButton: {
    backgroundColor: "#000",
    borderColor: "#333",
  },
  appleButtonText: {
    color: "#fff",
  },
  loginHint: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },
  loginLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statContent: {
    padding: 20,
  },
  statValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  statTrend: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "700",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10B981",
    borderRadius: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  editButton: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  weightContent: {
    padding: 20,
  },
  goalsContent: {
    padding: 20,
  },
  mainGoal: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#333",
  },
  goalIconContainer: {
    marginRight: 16,
  },
  goalIcon: {
    fontSize: 28,
    margin: 0,
    marginBottom: 8,
  },
  mainGoalInfo: {
    flex: 1,
  },
  mainGoalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  mainGoalSubtitle: {
    color: "#888",
    fontSize: 14,
  },
  goalSection: {
    marginBottom: 24,
  },
  goalSectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  goalRow: {
    flexDirection: "row",
    gap: 12,
  },
  goalItem: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
  },
  goalValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  goalLabel: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
  },
  // Tägliche Ziele - Vertikal
  dailyGoalsContainer: {
    gap: 12,
  },
  dailyGoalItem: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  dailyGoalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dailyGoalIcon: {
    margin: 0,
    marginRight: 8,
  },
  dailyGoalLabel: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
  },
  dailyGoalValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  // Nährstofffokus
  nutrientFocus: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#4F46E5",
  },
  nutrientFocusTitle: {
    color: "#888",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  nutrientFocusTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  nutrientFocusTag: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  nutrientFocusTagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  // Makronährstoffe
  macrosContainer: {
    gap: 12,
  },
  macroItem: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  macroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  macroIcon: {
    margin: 0,
  },
  macroInfo: {
    flex: 1,
    marginLeft: 12,
  },
  macroLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  macroGrams: {
    color: "#888",
    fontSize: 12,
  },
  macroPercentage: {
    fontSize: 16,
    fontWeight: "700",
  },
  macroTotal: {
    marginTop: 8,
    paddingTop: 16,
  },
  macroTotalLine: {
    height: 1,
    backgroundColor: "#333",
    marginBottom: 12,
  },
  macroTotalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  macroTotalLabel: {
    color: "#888",
    fontSize: 14,
    fontWeight: "600",
  },
  macroTotalValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  recommendationsContent: {
    padding: 20,
    gap: 16,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  recommendationIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  recommendationText: {
    flex: 1,
  },
  recommendationTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  recommendationDesc: {
    color: "#888",
    fontSize: 14,
    lineHeight: 20,
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
