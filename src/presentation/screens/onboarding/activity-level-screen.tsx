// screens/onboarding/ActivityScreen.tsx
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

interface ActivityOption {
  level: ActivityLevel;
  emoji: string;
  title: string;
  description: string;
}

interface ActivityScreenProps {
  onNext: (activity_level: ActivityLevel) => void;
  initialValue?: ActivityLevel;
  onBack: () => void; // 👈 Neue Prop
  showBackButton?: boolean; // 👈 Optional um Back Button zu steuern
}

export const ActivityScreen: React.FC<ActivityScreenProps> = ({
  onNext,
  onBack,
  initialValue,
  showBackButton = true,
}) => {
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityLevel | null>(initialValue || null);

  const activityOptions: ActivityOption[] = [
    {
      level: "sedentary",
      emoji: "🛋️",
      title: "Sitzend",
      description: "Bürojob, wenig bis keine Bewegung",
    },
    {
      level: "light",
      emoji: "🚶",
      title: "Leicht aktiv",
      description: "1-2x pro Woche leichte Bewegung",
    },
    {
      level: "moderate",
      emoji: "🚴",
      title: "Mäßig aktiv",
      description: "3-4x pro Woche moderate Bewegung",
    },
    {
      level: "active",
      emoji: "🏃",
      title: "Sehr aktiv",
      description: "5-6x pro Woche intensive Bewegung",
    },
    {
      level: "very_active",
      emoji: "💪",
      title: "Extrem aktiv",
      description: "Tägliches intensives Training",
    },
  ];

  const handleActivitySelect = (level: ActivityLevel) => {
    setSelectedActivity(level);
  };

  const handleNext = () => {
    if (selectedActivity) {
      onNext(selectedActivity);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Zurück</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Wie aktiv bist du?</Text>
      <Text style={styles.subtitle}>
        Wähle die Stufe, die deinem wöchentlichen Aktivitätslevel am besten
        entspricht.
      </Text>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.activitiesContainer}>
          {activityOptions.map((activity) => (
            <TouchableOpacity
              key={activity.level}
              style={[
                styles.activityButton,
                selectedActivity === activity.level &&
                  styles.activityButtonSelected,
              ]}
              onPress={() => handleActivitySelect(activity.level)}
            >
              <View style={styles.activityHeader}>
                <Text style={styles.activityEmoji}>{activity.emoji}</Text>
                <View style={styles.activityTextContainer}>
                  <Text
                    style={[
                      styles.activityTitle,
                      selectedActivity === activity.level &&
                        styles.activityTitleSelected,
                    ]}
                  >
                    {activity.title}
                  </Text>
                  <Text style={styles.activityDescription}>
                    {activity.description}
                  </Text>
                </View>
              </View>

              {selectedActivity === activity.level && (
                <View style={styles.selectedIndicator}>
                  <Text style={styles.selectedIndicatorText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, !selectedActivity && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!selectedActivity}
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
  activitiesContainer: {
    paddingBottom: 10,
  },
  activityButton: {
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
  activityButtonSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FD",
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  activityEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  activityTitleSelected: {
    color: "#007AFF",
  },
  activityDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
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
