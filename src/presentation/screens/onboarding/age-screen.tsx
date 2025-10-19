// screens/onboarding/AgeScreen.tsx
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AgeScreenProps {
  onNext: (birthDate: Date) => void;
  initialValue?: Date;
  onBack: () => void; // 👈 Neue Prop
  showBackButton?: boolean; // 👈 Optional um Back Button zu steuern
}

export const AgeScreen: React.FC<AgeScreenProps> = ({
  onNext,
  onBack,
  initialValue,
  showBackButton = true,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  // Berechne Default Date (vor 25 Jahren)
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 25);

  const calculateAge = (date: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < date.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    // Auf Android: Schließe den Picker sofort nach Auswahl
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      if (Platform.OS === "android") {
        // Auf Android setze das Datum sofort
        setBirthDate(selectedDate);
        const age = calculateAge(selectedDate);

        // Zeige Warnungen als Alert
        if (age < 13) {
          Alert.alert(
            "Hinweis",
            "Die App ist für Personen ab 13 Jahren geeignet. Du kannst trotzdem fortfahren, aber einige Funktionen sind möglicherweise nicht optimal für dein Alter."
          );
        } else if (age > 120) {
          Alert.alert(
            "Ungültiges Alter",
            "Bitte gib ein realistisches Geburtsdatum ein."
          );
        }
      } else {
        // Auf iOS: Speichere die Auswahl temporär
        setTempDate(selectedDate);
      }
    }
  };

  const handleConfirmDate = () => {
    if (tempDate) {
      setBirthDate(tempDate);
      const age = calculateAge(tempDate);

      // Zeige Warnungen als Alert
      if (age < 13) {
        Alert.alert(
          "Hinweis",
          "Die App ist für Personen ab 13 Jahren geeignet. Du kannst trotzdem fortfahren, aber einige Funktionen sind möglicherweise nicht optimal für dein Alter."
        );
      } else if (age > 120) {
        Alert.alert(
          "Ungültiges Alter",
          "Bitte gib ein realistisches Geburtsdatum ein."
        );
      }
    }
    setShowDatePicker(false);
  };

  const handleOpenDatePicker = () => {
    // Beim Öffnen setze tempDate auf das aktuelle birthDate oder default
    setTempDate(birthDate || defaultDate);
    setShowDatePicker(true);
  };

  const handleNext = () => {
    if (!birthDate) {
      Alert.alert("Fehler", "Bitte wähle dein Geburtsdatum aus.");
      return;
    }

    const age = calculateAge(birthDate);

    if (age < 13) {
      Alert.alert(
        "Bestätigung",
        "Du bist unter 13 Jahren. Bist du sicher, dass du fortfahren möchtest?",
        [
          { text: "Abbrechen", style: "cancel" },
          { text: "Fortfahren", onPress: () => onNext(birthDate) },
        ]
      );
      return;
    }

    if (age > 120) {
      Alert.alert("Fehler", "Bitte gib ein realistisches Geburtsdatum ein.");
      return;
    }

    onNext(birthDate);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "Geburtsdatum auswählen";

    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getAgeText = (): string => {
    if (!birthDate) return "";

    const age = calculateAge(birthDate);
    return `${age} Jahre`;
  };

  const canProceed = (): boolean => {
    if (!birthDate) return false;

    const age = calculateAge(birthDate);
    return age >= 13 && age <= 120;
  };

  // Unterschiedliche Logik für Android und iOS
  const renderDatePicker = () => {
    if (!showDatePicker) return null;

    if (Platform.OS === "android") {
      return (
        <DateTimePicker
          value={birthDate || defaultDate}
          mode="date"
          display="default" // Auf Android Standard-Dialog verwenden
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      );
    } else {
      // iOS mit Custom UI
      return (
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={tempDate || defaultDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
            style={styles.datePicker}
            themeVariant="light"
          />
          <View style={styles.datePickerButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.cancelButtonText}>Abbrechen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmDate}
            >
              <Text style={styles.confirmButtonText}>Fertig</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Zurück</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Wann bist du geboren?</Text>
      <Text style={styles.subtitle}>
        Dein Geburtsdatum hilft uns, deine Nährstoffbedürfnisse besser zu
        berechnen.
      </Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={handleOpenDatePicker}
      >
        <Text
          style={[
            styles.dateButtonText,
            !birthDate && styles.dateButtonPlaceholder,
          ]}
        >
          {formatDate(birthDate)}
        </Text>
      </TouchableOpacity>

      {birthDate && (
        <View style={styles.ageContainer}>
          <Text style={styles.ageLabel}>Dein Alter:</Text>
          <Text style={styles.ageValue}>{getAgeText()}</Text>
        </View>
      )}

      {birthDate && calculateAge(birthDate) < 13 && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Die App ist für Personen ab 13 Jahren geeignet.
          </Text>
        </View>
      )}

      {birthDate && calculateAge(birthDate) > 120 && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Bitte gib ein realistisches Geburtsdatum ein.
          </Text>
        </View>
      )}

      {renderDatePicker()}

      <TouchableOpacity
        style={[styles.button, !canProceed() && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!canProceed()}
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
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
    lineHeight: 22,
  },
  dateButton: {
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F0F8FF",
  },
  dateButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
  },
  dateButtonPlaceholder: {
    color: "#999",
    fontWeight: "normal",
  },
  ageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ageLabel: {
    fontSize: 16,
    color: "#666",
    marginRight: 8,
  },
  ageValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
  },
  warningContainer: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
    marginBottom: 20,
    width: "100%",
  },
  warningText: {
    color: "#856404",
    fontSize: 14,
  },
  datePickerContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  datePicker: {
    height: 200,
  },
  datePickerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#F8F9FA",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
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
