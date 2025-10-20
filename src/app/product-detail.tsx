import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getServingNutrition } from "../core/utils/nutrition-calculations";
import { supabase } from "../core/utils/supabase";

type ServingType = "portion" | "grams";

export default function ProductDetailScreen() {
  const router = useRouter();
  const { product, user } = useLocalSearchParams();
  const parsedProduct = product ? JSON.parse(product as string) : null;
  const parsedUser = user ? JSON.parse(user as string) : null;

  const [servingType, setServingType] = useState<ServingType>("grams");
  const [servingValue, setServingValue] = useState("100");

  if (!parsedProduct) {
    return <Text>Kein Produkt gefunden.</Text>;
  }

  // Extrahiere Gramm aus der serving_size (z.B. "15g", "1 portion (45g)", "200ml")
  const getServingSizeInGrams = (): number | null => {
    if (!parsedProduct.serving_size) return null;

    const match = parsedProduct.serving_size.match(/(\d+(\.\d+)?)\s*(g|ml)/i);
    return match ? parseFloat(match[1]) : null;
  };

  const servingSizeInGrams = getServingSizeInGrams();

  // Prüfe ob Portionen verfügbar sind (nicht verfügbar wenn 100g oder keine Angabe)
  const isPortionAvailable = servingSizeInGrams && servingSizeInGrams !== 100;

  // Portion Info für die Anzeige
  const portionInfo = servingSizeInGrams
    ? `1 Portion = ${servingSizeInGrams}${parsedProduct.serving_size?.includes("ml") ? "ml" : "g"}`
    : null;

  // Portion Label mit Gramm-Angabe
  const getPortionLabel = () => {
    if (!servingSizeInGrams) return "Portionen";
    return `Portionen (${servingSizeInGrams}g)`;
  };

  // Handler für Serving-Type Wechsel
  const handleServingTypeChange = (newType: ServingType) => {
    if (newType === "grams") {
      // Beim Wechsel zu Gramm automatisch 100g setzen
      setServingValue("100");
    } else if (newType === "portion" && isPortionAvailable) {
      // Beim Wechsel zu Portionen automatisch 1 Portion setzen
      setServingValue("1");
    }
    setServingType(newType);
  };

  const calculateNutrition = () => {
    if (servingType === "portion" && isPortionAvailable) {
      // Verwende direkte Portionswerte
      const portions = parseFloat(servingValue) || 1;
      const baseCalories =
        getServingNutrition(parsedProduct).calories ||
        parsedProduct.energy_kcal;
      const baseCarbs =
        getServingNutrition(parsedProduct).carbs ||
        parsedProduct.carbohydrates_g;
      const baseProtein =
        getServingNutrition(parsedProduct).protein || parsedProduct.protein_g;
      const baseFat =
        getServingNutrition(parsedProduct).fat || parsedProduct.fat_g;

      return {
        calories: Math.round(baseCalories * portions),
        carbs: Math.round(baseCarbs * portions),
        protein: Math.round(baseProtein * portions),
        fat: Math.round(baseFat * portions),
        totalGrams: Math.round(servingSizeInGrams * portions),
      };
    } else {
      // Berechne basierend auf Gramm
      const grams = parseFloat(servingValue) || 100;
      const factor = grams / 100;
      return {
        calories: Math.round(parsedProduct.energy_kcal * factor),
        carbs: Math.round(parsedProduct.carbohydrates_g * factor),
        protein: Math.round(parsedProduct.protein_g * factor),
        fat: Math.round(parsedProduct.fat_g * factor),
        totalGrams: grams,
      };
    }
  };

  const currentNutrition = calculateNutrition();

  const handleAddToDailyLog = async () => {
    if (!parsedUser?.id) {
      Alert.alert("Fehler", "Benutzer nicht gefunden");
      return;
    }

    const servingLabel =
      servingType === "portion" && isPortionAvailable
        ? `${servingValue} Portion${parseFloat(servingValue) !== 1 ? "en" : ""}`
        : `${servingValue}g`;

    const { error } = await supabase.from("daily_logs").insert([
      {
        user_id: parsedUser.id,
        product_barcode: parsedProduct.barcode,
        product_name: parsedProduct.product_name,
        brand: parsedProduct.brand,
        serving_type: servingType,
        serving_value: parseFloat(servingValue) || 1,
        serving_label: servingLabel,
        energy_kcal: currentNutrition.calories,
        carbohydrates_g: currentNutrition.carbs,
        protein_g: currentNutrition.protein,
        fat_g: currentNutrition.fat,
      },
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      Alert.alert("Fehler", error.message);
    } else {
      Alert.alert("Erfolg", "Produkt wurde zum Tageslog hinzufügt!");

      // 🔄 Zurück zur HomeScreen navigieren, damit sie neu lädt
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Produkt Header */}
      <View style={styles.header}>
        <Text style={styles.productName}>{parsedProduct.product_name}</Text>
        <Text style={styles.brand}>{parsedProduct.brand}</Text>
        {portionInfo && <Text style={styles.portionInfo}>{portionInfo}</Text>}
      </View>

      {/* Aktuelle Nährwerte - groß und zentral */}
      <View style={styles.nutritionSection}>
        <Text style={styles.calories}>{currentNutrition.calories}</Text>
        <Text style={styles.caloriesLabel}>Kalorien</Text>

        {/* Gesamtmenge in Gramm anzeigen */}
        {currentNutrition.totalGrams && (
          <Text style={styles.totalGrams}>
            {currentNutrition.totalGrams}g Gesamt
          </Text>
        )}

        <View style={styles.macros}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{currentNutrition.carbs}g</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{currentNutrition.protein}g</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{currentNutrition.fat}g</Text>
            <Text style={styles.macroLabel}>Fett</Text>
          </View>
        </View>
      </View>

      {/* Portionsauswahl - kompakt */}
      <View style={styles.servingSection}>
        <Text style={styles.sectionTitle}>Menge</Text>

        <View style={styles.servingInputRow}>
          <TextInput
            value={servingValue}
            onChangeText={setServingValue}
            placeholder={servingType === "portion" ? "1" : "100"}
            keyboardType="decimal-pad"
            style={styles.servingInput}
          />

          <View style={styles.servingTypeSelector}>
            <TouchableOpacity
              style={[
                styles.servingTypeButton,
                servingType === "portion" && styles.servingTypeButtonActive,
                !isPortionAvailable && styles.servingTypeButtonDisabled,
              ]}
              onPress={() => handleServingTypeChange("portion")}
              disabled={!isPortionAvailable}
            >
              <Text
                style={[
                  styles.servingTypeText,
                  servingType === "portion" && styles.servingTypeTextActive,
                  !isPortionAvailable && styles.servingTypeTextDisabled,
                ]}
              >
                {getPortionLabel()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.servingTypeButton,
                servingType === "grams" && styles.servingTypeButtonActive,
              ]}
              onPress={() => handleServingTypeChange("grams")}
            >
              <Text
                style={[
                  styles.servingTypeText,
                  servingType === "grams" && styles.servingTypeTextActive,
                ]}
              >
                Gramm
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Schnellauswahl Buttons */}
        <View style={styles.quickOptions}>
          {servingType === "portion" && isPortionAvailable ? (
            <>
              <TouchableOpacity
                style={styles.quickOption}
                onPress={() => setServingValue("0.5")}
              >
                <Text style={styles.quickOptionText}>½</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickOption}
                onPress={() => setServingValue("1")}
              >
                <Text style={styles.quickOptionText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickOption}
                onPress={() => setServingValue("2")}
              >
                <Text style={styles.quickOptionText}>2</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.quickOption}
                onPress={() => setServingValue("50")}
              >
                <Text style={styles.quickOptionText}>50g</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickOption}
                onPress={() => setServingValue("100")}
              >
                <Text style={styles.quickOptionText}>100g</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickOption}
                onPress={() => setServingValue("200")}
              >
                <Text style={styles.quickOptionText}>200g</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddToDailyLog}>
        <Text style={styles.addButtonText}>Zum Tageslog hinzufügen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  portionInfo: {
    fontSize: 14,
    color: "#2e7d32",
    fontWeight: "500",
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  nutritionSection: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    margin: 20,
    borderRadius: 16,
  },
  calories: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  caloriesLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  totalGrams: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    fontWeight: "500",
  },
  macros: {
    flexDirection: "row",
    gap: 30,
  },
  macroItem: {
    alignItems: "center",
  },
  macroValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 14,
    color: "#666",
  },
  servingSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  servingInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  servingInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    backgroundColor: "white",
    textAlign: "center",
  },
  servingTypeSelector: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
  },
  servingTypeButton: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
  },
  servingTypeButtonActive: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  servingTypeButtonDisabled: {
    opacity: 0.5,
  },
  servingTypeText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  servingTypeTextActive: {
    color: "#2e7d32",
    fontWeight: "600",
  },
  servingTypeTextDisabled: {
    color: "#999",
  },
  quickOptions: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  quickOption: {
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 60,
    alignItems: "center",
  },
  quickOptionText: {
    fontSize: 16,
    color: "#2e7d32",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#2e7d32",
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
