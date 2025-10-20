// services/openfoodfacts-service.ts
import {
  NormalizedProduct,
  OpenFoodFactsProduct,
  SearchResponse
} from '../../core/types/openfoodfacts-types';

export class OpenFoodFactsService {
  private baseURL: string = 'https://world.openfoodfacts.org/api/v2';

  async searchProducts(
    query: string, 
    country: string = '', 
    page: number = 1, 
    pageSize: number = 20
  ): Promise<SearchResponse> {
    if (!query || query.trim() === '') {
      return { products: [], count: 0, page: 1, page_size: pageSize };
    }

    // Verwende die stabile v1-Suche!
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page=${page}&page_size=${pageSize}&countries_tags=${country}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const normalizedProducts: NormalizedProduct[] = (data.products || [])
        .map((product: OpenFoodFactsProduct) => this.normalizeProductData(product))
        .filter((product: NormalizedProduct | null): product is NormalizedProduct => product !== null);

      return {
        products: normalizedProducts,
        count: data.count || 0,
        page: data.page || 1,
        page_size: data.page_size || pageSize
      };
    } catch (error) {
      console.error('OFF API Error:', error);
      return { 
        products: [], 
        count: 0, 
        page: 1, 
        page_size: pageSize, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async getProductByBarcode(barcode: string): Promise<NormalizedProduct | null> {
    const url = `${this.baseURL}/product/${barcode}?fields=code,product_name,brands,categories,nutriments,images,serving_size,quantity,nutrition_grades,nutrition_score_fr_100g`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.status === 0) {
        return null;
      }
      
      return this.normalizeProductData(data.product);
    } catch (error) {
      console.error('OFF API Error:', error);
      return null;
    }
  }

  normalizeProductData(product: OpenFoodFactsProduct): NormalizedProduct | null {
    if (!product) return null;

    const nutriments = product.nutriments || {};
    
    // Berechne Serving-Werte falls nicht direkt vorhanden
    const calculateServingValue = (per100g: number | undefined): number | undefined => {
      if (!per100g || !product.serving_size) return undefined;
      
      const servingSizeMatch = product.serving_size.match(/(\d+(\.\d+)?)\s*g/);
      if (!servingSizeMatch) return undefined;
      
      const servingGrams = parseFloat(servingSizeMatch[1]);
      return (per100g * servingGrams) / 100;
    };

    const energyKcalPer100g = nutriments['energy-kcal_100g'] || nutriments['energy-kcal'] || 0;
    const energyKcalServing = nutriments['energy-kcal_serving'] || calculateServingValue(energyKcalPer100g);

    const proteinPer100g = nutriments['proteins_100g'] || nutriments.proteins || 0;
    const carbohydratesPer100g = nutriments['carbohydrates_100g'] || nutriments.carbohydrates || 0;
    const sugarPer100g = nutriments['sugars_100g'] || nutriments.sugars || 0;
    const fatPer100g = nutriments['fat_100g'] || nutriments.fat || 0;
    const saturatedFatPer100g = nutriments['saturated-fat_100g'] || nutriments['saturated-fat'] || 0;
    const fiberPer100g = nutriments['fiber_100g'] || nutriments.fiber || 0;
    const sodiumPer100g = nutriments['sodium_100g'] || nutriments.sodium || 0;

    return {
      barcode: product.code,
      product_name: product.product_name || 'Unbekannt',
      brand: product.brands || '',
      category: product.categories || '',
      nutrition_grade: product.nutrition_grades || '',
      
      // Nährwerte pro 100g
      energy_kcal: energyKcalPer100g,
      protein_g: proteinPer100g,
      carbohydrates_g: carbohydratesPer100g,
      sugar_g: sugarPer100g,
      fat_g: fatPer100g,
      saturated_fat_g: saturatedFatPer100g,
      fiber_g: fiberPer100g,
      sodium_mg: sodiumPer100g * 1000, // Convert g to mg
      
      // Nährwerte pro Portion
      energy_kcal_serving: energyKcalServing,
      protein_g_serving: nutriments['proteins_serving'] || calculateServingValue(proteinPer100g),
      carbohydrates_g_serving: nutriments['carbohydrates_serving'] || calculateServingValue(carbohydratesPer100g),
      sugar_g_serving: nutriments['sugars_serving'] || calculateServingValue(sugarPer100g),
      fat_g_serving: nutriments['fat_serving'] || calculateServingValue(fatPer100g),
      saturated_fat_g_serving: nutriments['saturated-fat_serving'] || calculateServingValue(saturatedFatPer100g),
      fiber_g_serving: nutriments['fiber_serving'] || calculateServingValue(fiberPer100g),
      sodium_mg_serving: nutriments['sodium_serving'] ? nutriments['sodium_serving'] * 1000 : calculateServingValue(sodiumPer100g),
      
      serving_size: product.serving_size || '100g',
      quantity: product.quantity || '',
      
      // Bild-URLs
      image_url: product.image_url || product.images?.front?.display?.de,
      image_thumb_url: product.image_thumb_url || product.images?.front?.thumb?.de,
      image_small_url: product.image_small_url || product.images?.front?.small?.de,
      
      source: 'openfoodfacts',
      data_quality_score: this.calculateDataQuality(product)
    };
  }

  private calculateDataQuality(product: OpenFoodFactsProduct): number {
    let score = 0;
    const requiredFields = [
      product.product_name,
      product.nutriments?.['energy-kcal_100g'],
      product.nutriments?.['proteins_100g'],
      product.nutriments?.['carbohydrates_100g'],
      product.nutriments?.['fat_100g']
    ];
    
    requiredFields.forEach(field => {
      if (field && field !== 0) score += 0.2;
    });
    
    return Math.round(score * 100) / 100;
  }
}

export const openFoodFactsService = new OpenFoodFactsService();