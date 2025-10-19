// types/openfoodfacts.ts
export interface Nutriments {
  'energy-kcal_100g'?: number;
  'energy-kcal'?: number;
  'proteins_100g'?: number;
  proteins?: number;
  'carbohydrates_100g'?: number;
  carbohydrates?: number;
  'sugars_100g'?: number;
  sugars?: number;
  'fat_100g'?: number;
  fat?: number;
  'saturated-fat_100g'?: number;
  'saturated-fat'?: number;
  'fiber_100g'?: number;
  fiber?: number;
  'sodium_100g'?: number;
  sodium?: number;
  
}

export interface ProductImages {
  front?: {
    display?: {
      de?: string;
    };
    thumb?: {
      de?: string;
    };
    small?: {
      de?: string;
    };
  };
}

export interface OpenFoodFactsProduct {
  code: string;
  product_name?: string;
  brands?: string;
  categories?: string;
  nutriments?: Nutriments;
  images?: ProductImages;
  image_url?: string;
  image_thumb_url?: string;
  image_small_url?: string;
  serving_size?: string;
  quantity?: string;
  nutrition_grades?: string;
  nutrition_score_fr_100g?: number;
  selected_images?: ProductImages;
}

export interface NormalizedProduct {
  barcode: string;
  product_name: string;
  brand: string;
  category: string;
  nutrition_grade: string;
  
  // Nährwerte
  energy_kcal: number;
  protein_g: number;
  carbohydrates_g: number;
  sugar_g: number;
  fat_g: number;
  saturated_fat_g: number;
  fiber_g: number;
  sodium_mg: number;
  
  serving_size: string;
  quantity: string;
  
  // Bild-URLs
  image_url?: string;
  image_thumb_url?: string;
  image_small_url?: string;
  
  source: 'openfoodfacts';
  data_quality_score: number;
}

export interface SearchResponse {
  products: NormalizedProduct[];
  count: number;
  page: number;
  page_size: number;
  error?: string;
}