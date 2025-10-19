// hooks/useOpenFoodFacts.ts
import { useCallback, useState } from 'react';
import { NormalizedProduct, SearchResponse } from '../../core/types/openfoodfacts-types';
import { openFoodFactsService } from '../../data/datasources/openfoodfacts-service';

export const useOpenFoodFacts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = useCallback(async (
    query: string, 
    country: string = 'de', 
    page: number = 1
  ): Promise<SearchResponse> => {
    if (!query || query.trim() === '') {
      return { products: [], count: 0, page: 1, page_size: 20 };
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await openFoodFactsService.searchProducts(query, country, page);
      return result;
    } catch (err) {
      const errorMsg = `Search failed: ${err instanceof Error ? err.message : 'Unknown error'}`;
      setError(errorMsg);
      console.error('Search error:', err);
      return { products: [], count: 0, page: 1, page_size: 20, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductByBarcode = useCallback(async (barcode: string): Promise<NormalizedProduct | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const product = await openFoodFactsService.getProductByBarcode(barcode);
      return product;
    } catch (err) {
      const errorMsg = `Barcode lookup failed: ${err instanceof Error ? err.message : 'Unknown error'}`;
      setError(errorMsg);
      console.error('Barcode lookup error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    searchProducts,
    getProductByBarcode,
    loading,
    error,
    clearError
  };
};

// Default export für den Hook
export default useOpenFoodFacts;