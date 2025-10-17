// components/complete-screen.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CompleteScreenProps {
  onComplete: () => void;
  userData: any;
}

export const CompleteScreen: React.FC<CompleteScreenProps> = ({
  onComplete,
  userData,
}) => {
  // Hilfsfunktion zur Altersberechnung aus Geburtsdatum
  const calculateAge = (birth_date: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birth_date.getFullYear();
    const monthDiff = today.getMonth() - birth_date.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth_date.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Formatierung des Geburtsdatums
  const formatBirthDate = (birth_date: Date): string => {
    return birth_date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alles fertig! 🎉</Text>
      <Text style={styles.subtitle}>
        Dein Profil wurde mit folgenden Daten erstellt:
      </Text>

      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Gewicht: {userData.weight} kg</Text>
        <Text style={styles.dataText}>Größe: {userData.height} cm</Text>
        <Text style={styles.dataText}>
          Geburtsdatum:{" "}
          {userData.birth_date
            ? formatBirthDate(userData.birth_date)
            : "Nicht angegeben"}{" "}
          {/* 🔥 birthDate statt age */}
        </Text>
        {userData.birth_date && (
          <Text style={styles.dataText}>
            Alter: {calculateAge(userData.birth_date)} Jahre{" "}
            {/* 🔥 Alter aus birthDate berechnen */}
          </Text>
        )}
        <Text style={styles.dataText}>
          Geschlecht: {userData.gender === "male" ? "Männlich" : "Weiblich"}
        </Text>
        <Text style={styles.dataText}>
          Aktivität:{" "}
          {userData.activityLevel === "sedentary"
            ? "Sitzend"
            : userData.activityLevel === "light"
              ? "Leicht aktiv"
              : userData.activityLevel === "moderate"
                ? "Mäßig aktiv"
                : userData.activityLevel === "active"
                  ? "Sehr aktiv"
                  : "Extrem aktiv"}
        </Text>
      </View>

      <Text style={styles.infoText}>
        Du kannst diese Daten später in den Einstellungen ändern.
      </Text>

      <TouchableOpacity style={styles.button} onPress={onComplete}>
        <Text style={styles.buttonText}>App starten</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    lineHeight: 24,
  },
  dataContainer: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    marginBottom: 30,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
