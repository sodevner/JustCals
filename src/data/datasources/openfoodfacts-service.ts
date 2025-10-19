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

    return {
      barcode: product.code,
      product_name: product.product_name || 'Unbekannt',
      brand: product.brands || '',
      category: product.categories || '',
      nutrition_grade: product.nutrition_grades || '',
      
      // Nährwerte standardisieren
      energy_kcal: product.nutriments?.['energy-kcal_100g'] || product.nutriments?.['energy-kcal'] || 0,
      protein_g: product.nutriments?.['proteins_100g'] || product.nutriments?.proteins || 0,
      carbohydrates_g: product.nutriments?.['carbohydrates_100g'] || product.nutriments?.carbohydrates || 0,
      sugar_g: product.nutriments?.['sugars_100g'] || product.nutriments?.sugars || 0,
      fat_g: product.nutriments?.['fat_100g'] || product.nutriments?.fat || 0,
      saturated_fat_g: product.nutriments?.['saturated-fat_100g'] || product.nutriments?.['saturated-fat'] || 0,
      fiber_g: product.nutriments?.['fiber_100g'] || product.nutriments?.fiber || 0,
      sodium_mg: product.nutriments?.['sodium_100g'] || product.nutriments?.sodium || 0,
      
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