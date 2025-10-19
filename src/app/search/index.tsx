// app/search/index.tsx
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { JSX } from "react/jsx-runtime";
import { NormalizedProduct } from "../../core/types/openfoodfacts-types";
import { useOpenFoodFacts } from "../../domain/hooks/useOpenFoodFacts";

export default function SearchIndex(): JSX.Element {
  const inputRef = useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<NormalizedProduct[]>([]);
  const { searchProducts, loading, error } = useOpenFoodFacts();
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Animation für Suchergebnisse
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [searchResults]);

  // Suchfunktion mit Debouncing
  useEffect(() => {
    const searchTimeout = setTimeout(async (): Promise<void> => {
      if (searchQuery.trim()) {
        const result = await searchProducts(searchQuery, "de");
        if (result.products) {
          setSearchResults(result.products);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, searchProducts]);

  const handleSearchChange = (text: string): void => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchResults([]);
    }
  };

  const handleProductPress = (product: NormalizedProduct): void => {
    const nutritionInfo = `
Portionsgröße: ${product.serving_size}

Nährwerte pro Portion:
• Kalorien: ${calculateServingNutrition(product.energy_kcal, product.serving_size)} kcal
• Kohlenhydrate: ${calculateServingNutrition(product.carbohydrates_g, product.serving_size)}g
• Eiweiß: ${calculateServingNutrition(product.protein_g, product.serving_size)}g
• Fett: ${calculateServingNutrition(product.fat_g, product.serving_size)}g
${product.sugar_g > 0 ? `• Zucker: ${calculateServingNutrition(product.sugar_g, product.serving_size)}g` : ""}

Nährwerte pro 100g:
• Kalorien: ${product.energy_kcal} kcal
• Kohlenhydrate: ${product.carbohydrates_g}g
• Eiweiß: ${product.protein_g}g
• Fett: ${product.fat_g}g
${product.sugar_g > 0 ? `• Zucker: ${product.sugar_g}g` : ""}
    `.trim();

    Alert.alert(product.product_name, nutritionInfo, [
      { text: "OK", style: "default" },
    ]);
  };

  // Berechnet Nährwerte für die Portionsgröße
  const calculateServingNutrition = (
    valuePer100g: number,
    servingSize: string
  ): number => {
    if (!servingSize || !valuePer100g) return 0;

    // Extrahiere Zahlen aus der Portionsgröße (z.B. "30g" -> 30, "100 ml" -> 100)
    const match = servingSize.match(/(\d+(\.\d+)?)/);
    if (!match) return Math.round(valuePer100g);

    const servingGrams = parseFloat(match[1]);
    return Math.round((valuePer100g * servingGrams) / 100);
  };

  const renderProductItem = (product: NormalizedProduct): JSX.Element => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        key={product.barcode}
        style={styles.productItem}
        onPress={() => handleProductPress(product)}
      >
        <View style={styles.productContent}>
          <View style={styles.productHeader}>
            <Text style={styles.productName} numberOfLines={2}>
              {product.product_name}
            </Text>
            {product.nutrition_grade && (
              <View
                style={[
                  styles.nutritionGrade,
                  {
                    backgroundColor: getNutritionGradeColor(
                      product.nutrition_grade
                    ),
                  },
                ]}
              >
                <Text style={styles.nutritionGradeText}>
                  {product.nutrition_grade.toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.productBrand}>{product.brand}</Text>
          {product.category && (
            <Text style={styles.productCategory}>
              {product.category.split(",").slice(0, 2).join(", ")}
            </Text>
          )}

          <View style={styles.nutritionContainer}>
            <View style={styles.servingInfo}>
              <Text style={styles.servingText}>
                Portion: {product.serving_size}
              </Text>
            </View>

            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>
                  {calculateServingNutrition(
                    product.energy_kcal,
                    product.serving_size
                  )}
                </Text>
                <Text style={styles.nutritionLabel}>kcal</Text>
              </View>

              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>
                  {calculateServingNutrition(
                    product.carbohydrates_g,
                    product.serving_size
                  )}
                </Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>

              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>
                  {calculateServingNutrition(
                    product.protein_g,
                    product.serving_size
                  )}
                </Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>

              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>
                  {calculateServingNutrition(
                    product.fat_g,
                    product.serving_size
                  )}
                </Text>
                <Text style={styles.nutritionLabel}>Fett</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const getNutritionGradeColor = (grade: string): string => {
    const colors: { [key: string]: string } = {
      a: "#4CAF50",
      b: "#8BC34A",
      c: "#FFC107",
      d: "#FF9800",
      e: "#F44336",
    };
    return colors[grade.toLowerCase()] || "#757575";
  };

  const isIOS: boolean = Platform.OS === "ios";

  return isIOS ? (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Wonach suchst du?",
            onChangeText: (event) => handleSearchChange(event.nativeEvent.text),
          },
        }}
      />

      <ScrollView style={styles.resultsContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingTitle}>Suche läuft...</Text>
              <Text style={styles.loadingSubtitle}>
                Suche nach "{searchQuery}"
              </Text>
            </View>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Fehler bei der Suche</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => searchQuery && handleSearchChange(searchQuery)}
            >
              <Text style={styles.retryButtonText}>Erneut versuchen</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading && searchResults.length > 0 && (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              🎉 {searchResults.length} Produkte gefunden
            </Text>
            <Text style={styles.resultsQuery}>für "{searchQuery}"</Text>
          </View>
        )}

        {searchResults.map(renderProductItem)}

        {!loading && searchQuery && searchResults.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsIcon}>🔍</Text>
            <Text style={styles.noResultsTitle}>Keine Produkte gefunden</Text>
            <Text style={styles.noResultsText}>
              Keine Ergebnisse für "{searchQuery}" gefunden.
            </Text>
            <Text style={styles.noResultsHint}>
              Versuche es mit einem anderen Suchbegriff
            </Text>
          </View>
        )}

        {!loading && !searchQuery && (
          <View style={styles.initialState}>
            <Text style={styles.initialStateIcon}>🍎</Text>
            <Text style={styles.initialStateTitle}>OpenFoodFacts Suche</Text>
            <Text style={styles.initialStateText}>
              Gib einen Produktnamen ein, um Nährwertinformationen zu finden
            </Text>
            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>Tipps:</Text>
              <Text style={styles.tip}>
                • Vollständige Produktnamen verwenden
              </Text>
              <Text style={styles.tip}>• Marken mit angeben</Text>
              <Text style={styles.tip}>• Auf Rechtschreibung achten</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  ) : (
    // Android Layout
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.androidTitle}>Suchen</Text>
        <TextInput
          ref={inputRef}
          placeholder="Was möchtest du suchen? (z.B. Vollkornbrot, Joghurt)"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearchChange}
          style={styles.searchInput}
        />

        <ScrollView style={styles.resultsContainer}>
          {loading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingContent}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingTitle}>Suche läuft...</Text>
                <Text style={styles.loadingSubtitle}>
                  Suche nach "{searchQuery}"
                </Text>
              </View>
            </View>
          )}

          {searchResults.map(renderProductItem)}

          {!loading && searchQuery && searchResults.length === 0 && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsIcon}>🔍</Text>
              <Text style={styles.noResultsTitle}>Keine Produkte gefunden</Text>
              <Text style={styles.noResultsText}>
                Keine Ergebnisse für "{searchQuery}" gefunden.
              </Text>
            </View>
          )}

          {!loading && !searchQuery && (
            <View style={styles.initialState}>
              <Text style={styles.initialStateIcon}>👀</Text>
              <Text style={styles.initialStateTitle}>Gib etwas ein</Text>
              <Text style={styles.initialStateText}>
                Beginne mit der Suche nach Lebensmitteln, um detaillierte
                Nährwertinformationen zu erhalten
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  androidTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingContent: {
    alignItems: "center",
  },
  loadingTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  loadingSubtitle: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "#D32F2F",
    padding: 20,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  errorTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.9,
  },
  retryButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  resultsHeader: {
    padding: 20,
    backgroundColor: "#1E1E1E",
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  resultsCount: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  resultsQuery: {
    color: "#888",
    fontSize: 14,
  },
  productItem: {
    backgroundColor: "#1E1E1E",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  productContent: {
    flex: 1,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  productName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  nutritionGrade: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 30,
    alignItems: "center",
  },
  nutritionGradeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  productBrand: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  productCategory: {
    color: "#888",
    fontSize: 12,
    marginBottom: 12,
    fontStyle: "italic",
  },
  nutritionContainer: {
    marginBottom: 12,
  },
  servingInfo: {
    marginBottom: 8,
  },
  servingText: {
    color: "#FFC107",
    fontSize: 12,
    fontWeight: "500",
  },
  nutritionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutritionItem: {
    alignItems: "center",
    flex: 1,
  },
  nutritionValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  nutritionLabel: {
    color: "#888",
    fontSize: 10,
    textTransform: "uppercase",
  },
  dataQuality: {
    marginTop: 8,
  },
  qualityBar: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    marginBottom: 4,
    overflow: "hidden",
  },
  qualityFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  qualityText: {
    color: "#888",
    fontSize: 10,
  },
  noResults: {
    padding: 40,
    alignItems: "center",
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  noResultsText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  noResultsHint: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
  },
  initialState: {
    padding: 40,
    alignItems: "center",
  },
  initialStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  initialStateTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  initialStateText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  tipsContainer: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  tipsTitle: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tip: {
    color: "#888",
    fontSize: 12,
    marginBottom: 4,
  },
});
