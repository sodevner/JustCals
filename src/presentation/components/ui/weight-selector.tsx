import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../../core/utils/supabase";
import { useUser } from "../../../domain/hooks/useUser";

export default function WeightSelector() {
  const { user } = useUser();
  const [localWeight, setLocalWeight] = useState(user?.weight || 70);
  const [savedWeight, setSavedWeight] = useState(user?.weight || 70);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Synchronisiere mit User-Data wenn sich dieser ändert
  useEffect(() => {
    if (user?.weight) {
      setLocalWeight(user.weight);
      setSavedWeight(user.weight);
    }
  }, [user?.weight]);

  // Prüfe ob sich Änderungen ergeben haben
  useEffect(() => {
    setHasUnsavedChanges(localWeight !== savedWeight);
  }, [localWeight, savedWeight]);

  // Speichere Gewicht wenn Komponente unmounted wird (User verlässt Screen)
  useEffect(() => {
    return () => {
      if (hasUnsavedChanges && !isSaving) {
        saveWeightToDatabase(localWeight);
      }
    };
  }, [hasUnsavedChanges, localWeight, isSaving]);

  const saveWeightToDatabase = async (weightToSave: number) => {
    if (!user?.id) return;
    if (weightToSave === savedWeight) return; // Nichts zu speichern

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          weight: weightToSave,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      setSavedWeight(weightToSave);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving weight:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const incrementWeight = () => {
    if (!isSaving) {
      setLocalWeight((prev) => prev + 0.5);
    }
  };

  const decrementWeight = () => {
    if (!isSaving && localWeight > 0.5) {
      setLocalWeight((prev) => prev - 0.5);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.weightContainer}>
        <TouchableOpacity
          style={[styles.weightButton, isSaving && styles.disabledButton]}
          onPress={decrementWeight}
          disabled={isSaving}
        >
          <Text style={styles.weightButtonText}>-</Text>
        </TouchableOpacity>

        <View style={styles.weightDisplay}>
          <Text style={styles.weightValue}>{localWeight.toFixed(1)}</Text>
          <Text style={styles.weightUnit}>kg</Text>
        </View>

        <TouchableOpacity
          style={[styles.weightButton, isSaving && styles.disabledButton]}
          onPress={incrementWeight}
          disabled={isSaving}
        >
          <Text style={styles.weightButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  weightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  weightButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#666",
    opacity: 0.6,
  },
  weightButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  weightDisplay: {
    alignItems: "center",
    minWidth: 120,
  },
  weightValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  weightUnit: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 4,
  },
  unsavedText: {
    color: "#FF9500",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  savingText: {
    color: "#007AFF",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
});
