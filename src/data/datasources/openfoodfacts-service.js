// services/openfoodfacts-service.js
class OpenFoodFactsService {
  constructor() {
    this.baseURL = 'https://world.openfoodfacts.org/api/v2';
  }

  async searchProducts(query, country = 'de', page = 1, pageSize = 20) {
    const url = `${this.baseURL}/search?fields=code,product_name,brands,nutriments,images&search_terms=${encodeURIComponent(query)}&countries=${country}&page=${page}&page_size=${pageSize}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      return {
        products: data.products || [],
        count: data.count || 0,
        page: data.page || 1,
        page_size: data.page_size || pageSize
      };
    } catch (error) {
      console.error('OFF API Error:', error);
      return { products: [], count: 0 };
    }
  }

  async getProductByBarcode(barcode) {
    const url = `${this.baseURL}/product/${barcode}?fields=code,product_name,brands,categories,nutriments,images,serving_size,quantity`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 0) {
        return null; // Produkt nicht gefunden
      }
      
      return this.normalizeProductData(data.product);
    } catch (error) {
      console.error('OFF API Error:', error);
      return null;
    }
  }

  normalizeProductData(product) {
    if (!product) return null;

    return {
      barcode: product.code,
      product_name: product.product_name || 'Unbekannt',
      brand: product.brands || '',
      category: product.categories || '',
      
      // Nährwerte standardisieren
      energy_kcal: product.nutriments?.['energy-kcal_100g'] || 0,
      protein_g: product.nutriments?.['proteins_100g'] || 0,
      carbohydrates_g: product.nutriments?.['carbohydrates_100g'] || 0,
      sugar_g: product.nutriments?.['sugars_100g'] || 0,
      fat_g: product.nutriments?.['fat_100g'] || 0,
      saturated_fat_g: product.nutriments?.['saturated-fat_100g'] || 0,
      fiber_g: product.nutriments?.['fiber_100g'] || 0,
      sodium_mg: product.nutriments?.['sodium_100g'] || 0,
      
      serving_size: product.serving_size || '100g',
      quantity: product.quantity || '',
      
      // Bild-URLs
      image_url: product.image_url || product.selected_images?.front?.display?.de,
      image_thumb_url: product.image_thumb_url || product.selected_images?.front?.thumb?.de,
      
      source: 'openfoodfacts',
      data_quality_score: this.calculateDataQuality(product)
    };
  }

  calculateDataQuality(product) {
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
    
    return score;
  }
}