import { Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Platform, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { JSX } from "react/jsx-runtime";
import { NormalizedProduct } from "../../core/types/openfoodfacts-types";
import { formatNutritionInfo } from "../../core/utils/nutrition-calculations";
import { useOpenFoodFacts } from "../../domain/hooks/useOpenFoodFacts";
import { SearchStyles as styles } from "../../presentation/components/styles/search-styles";
import { SearchInput } from "../../presentation/components/ui/search-input";
import { SearchResults } from "../../presentation/components/ui/search-results";

export default function SearchIndex(): JSX.Element {
  const inputRef = useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<NormalizedProduct[]>([]);
  const { searchProducts, loading, error } = useOpenFoodFacts();
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [searchResults]);

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
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, searchProducts]);

  const handleSearchChange = (text: string): void => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchResults([]);
    }
  };

  const handleProductPress = (product: NormalizedProduct): void => {
    const nutritionInfo = formatNutritionInfo(product);
    Alert.alert(product.product_name, nutritionInfo, [
      { text: "OK", style: "default" },
    ]);
  };

  const handleRetry = (): void => {
    if (searchQuery) {
      handleSearchChange(searchQuery);
    }
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
      <SearchResults
        results={searchResults}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
        onProductPress={handleProductPress}
        fadeAnim={fadeAnim}
        onRetry={handleRetry}
      />
    </SafeAreaView>
  ) : (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.androidTitle}>Produkte suchen</Text>
        <SearchInput
          ref={inputRef} // Hier ref statt inputRef verwenden wenn forwardRef
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="Was möchtest du suchen? (z.B. Vollkornbrot, Joghurt)"
        />
        <SearchResults
          results={searchResults}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          onProductPress={handleProductPress}
          fadeAnim={fadeAnim}
          onRetry={handleRetry}
        />
      </SafeAreaView>
    </>
  );
}
