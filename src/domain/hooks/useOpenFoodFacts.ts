// hooks/useOpenFoodFacts.ts
export const useOpenFoodFacts = () => {
  const searchProducts = async (query: string, country: string = 'de') => {
    try {
      const response = await fetch(
        `https://your-backend.com/api/off/search?q=${encodeURIComponent(query)}&country=${country}`
      );
      return await response.json();
    } catch (error) {
      console.error('Search error:', error);
      return { products: [] };
    }
  };

  const getProductByBarcode = async (barcode: string) => {
    try {
      const response = await fetch(
        `https://your-backend.com/api/off/product/${barcode}`
      );
      return await response.json();
    } catch (error) {
      console.error('Barcode lookup error:', error);
      return null;
    }
  };

  return {
    searchProducts,
    getProductByBarcode
  };
};