import { NormalizedProduct } from "../types/openfoodfacts-types";

export const calculateServingNutrition = (
  valuePer100g: number,
  servingSize: string
): number => {
  if (!servingSize || !valuePer100g) return 0;

  const match = servingSize.match(/(\d+(\.\d+)?)/);
  if (!match) return Math.round(valuePer100g);

  const servingGrams = parseFloat(match[1]);
  return Math.round((valuePer100g * servingGrams) / 100);
};

export const formatNutritionInfo = (product: NormalizedProduct): string => {
  const servingCalories = calculateServingNutrition(product.energy_kcal, product.serving_size);
  const servingCarbs = calculateServingNutrition(product.carbohydrates_g, product.serving_size);
  const servingProtein = calculateServingNutrition(product.protein_g, product.serving_size);
  const servingFat = calculateServingNutrition(product.fat_g, product.serving_size);
  const servingSugar = calculateServingNutrition(product.sugar_g, product.serving_size);

  return `
Portionsgröße: ${product.serving_size}

Nährwerte pro Portion:
• Kalorien: ${servingCalories} kcal
• Kohlenhydrate: ${servingCarbs}g
• Eiweiß: ${servingProtein}g
• Fett: ${servingFat}g
${servingSugar > 0 ? `• Zucker: ${servingSugar}g` : ""}

Nährwerte pro 100g:
• Kalorien: ${product.energy_kcal} kcal
• Kohlenhydrate: ${product.carbohydrates_g}g
• Eiweiß: ${product.protein_g}g
• Fett: ${product.fat_g}g
${product.sugar_g > 0 ? `• Zucker: ${product.sugar_g}g` : ""}
  `.trim();
};
