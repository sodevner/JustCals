import React from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { NormalizedProduct } from "../../../core/types/openfoodfacts-types";
import { SearchStyles as styles } from "../styles/search-styles";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { LoadingState } from "./loading-state";
import { ProductItem } from "./product-item";

interface SearchResultsProps {
  results: NormalizedProduct[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  onProductPress: (product: NormalizedProduct) => void;
  fadeAnim: Animated.Value;
  onRetry: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  error,
  searchQuery,
  onProductPress,
  fadeAnim,
  onRetry,
}) => {
  if (loading) {
    return <LoadingState searchQuery={searchQuery} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  return (
    <ScrollView style={styles.resultsContainer}>
      {results.length > 0 && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {results.length} Produkte gefunden
          </Text>
        </View>
      )}

      {results.map((product, index) => (
        <Animated.View
          key={`${product.barcode}-${index}`}
          style={{ opacity: fadeAnim }}
        >
          <ProductItem
            product={product}
            index={index}
            onPress={onProductPress}
          />
        </Animated.View>
      ))}

      {!loading && searchQuery && results.length === 0 && (
        <EmptyState searchQuery={searchQuery} type="no-results" />
      )}

      {!loading && !searchQuery && (
        <EmptyState searchQuery={searchQuery} type="initial" />
      )}
    </ScrollView>
  );
};
