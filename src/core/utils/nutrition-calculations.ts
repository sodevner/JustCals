import { NormalizedProduct } from "../types/openfoodfacts-types";

export const formatNutritionInfo = (product: NormalizedProduct): string => {
  const servingSize = product.serving_size || "100g";
  
  // Verwende NUR die direkten Serving-Werte von der API
  const servingCalories = product.energy_kcal_serving 
    ? Math.round(product.energy_kcal_serving) 
    : Math.round(product.energy_kcal);
  
  const servingCarbs = product.carbohydrates_g_serving 
    ? Math.round(product.carbohydrates_g_serving) 
    : Math.round(product.carbohydrates_g);
  
  const servingProtein = product.protein_g_serving 
    ? Math.round(product.protein_g_serving) 
    : Math.round(product.protein_g);
  
  const servingFat = product.fat_g_serving 
    ? Math.round(product.fat_g_serving) 
    : Math.round(product.fat_g);
  
  const servingSugar = product.sugar_g_serving 
    ? Math.round(product.sugar_g_serving) 
    : Math.round(product.sugar_g);

  const servingSaturatedFat = product.saturated_fat_g_serving 
    ? Math.round(product.saturated_fat_g_serving) 
    : Math.round(product.saturated_fat_g);

  const servingFiber = product.fiber_g_serving 
    ? Math.round(product.fiber_g_serving) 
    : Math.round(product.fiber_g);

  return `
Portionsgröße: ${servingSize}

Nährwerte pro Portion:
• Kalorien: ${servingCalories} kcal
• Kohlenhydrate: ${servingCarbs}g
• Eiweiß: ${servingProtein}g  
• Fett: ${servingFat}g
${servingSaturatedFat > 0 ? `• Gesättigte Fettsäuren: ${servingSaturatedFat}g` : ""}
${servingSugar > 0 ? `• Zucker: ${servingSugar}g` : ""}
${servingFiber > 0 ? `• Ballaststoffe: ${servingFiber}g` : ""}

Nährwerte pro 100g:
• Kalorien: ${Math.round(product.energy_kcal)} kcal
• Kohlenhydrate: ${Math.round(product.carbohydrates_g)}g
• Eiweiß: ${Math.round(product.protein_g)}g
• Fett: ${Math.round(product.fat_g)}g
${product.saturated_fat_g > 0 ? `• Gesättigte Fettsäuren: ${Math.round(product.saturated_fat_g)}g` : ""}
${product.sugar_g > 0 ? `• Zucker: ${Math.round(product.sugar_g)}g` : ""}
${product.fiber_g > 0 ? `• Ballaststoffe: ${Math.round(product.fiber_g)}g` : ""}
  `.trim();
};

// Vereinfachte Funktion nur für Kalorien - verwendet NUR direkte Serving-Werte
export const getServingCalories = (product: NormalizedProduct): number => {
  return product.energy_kcal_serving 
    ? Math.round(product.energy_kcal_serving)
    : Math.round(product.energy_kcal);
};

// Funktion um alle Serving-Werte als Objekt zu bekommen - NUR direkte Werte
export const getServingNutrition = (product: NormalizedProduct) => {
  return {
    calories: getServingCalories(product),
    carbs: product.carbohydrates_g_serving 
      ? Math.round(product.carbohydrates_g_serving)
      : Math.round(product.carbohydrates_g),
    protein: product.protein_g_serving 
      ? Math.round(product.protein_g_serving)
      : Math.round(product.protein_g),
    fat: product.fat_g_serving 
      ? Math.round(product.fat_g_serving)
      : Math.round(product.fat_g),
    sugar: product.sugar_g_serving 
      ? Math.round(product.sugar_g_serving)
      : Math.round(product.sugar_g),
    saturatedFat: product.saturated_fat_g_serving 
      ? Math.round(product.saturated_fat_g_serving)
      : Math.round(product.saturated_fat_g),
    fiber: product.fiber_g_serving 
      ? Math.round(product.fiber_g_serving)
      : Math.round(product.fiber_g),
    servingSize: product.serving_size || "100g"
  };
};

// Hilfsfunktion um zu prüfen, ob Serving-Werte verfügbar sind
export const hasServingData = (product: NormalizedProduct): boolean => {
  return !!product.energy_kcal_serving;
};

// Prüft ob direkte Serving-Werte für alle Nährwerte vorhanden sind
export const hasCompleteServingData = (product: NormalizedProduct): boolean => {
  return !!(
    product.energy_kcal_serving &&
    product.carbohydrates_g_serving &&
    product.protein_g_serving &&
    product.fat_g_serving
  );
};