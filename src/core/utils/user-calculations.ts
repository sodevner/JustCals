// utils/userCalculations.ts
import { DietType, GoalType, OnboardingData } from '../types/user-types';

export const calculateAgeFromBirthDate = (birth_date: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birth_date.getFullYear();
  const monthDiff = today.getMonth() - birth_date.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth_date.getDate())) {
    age--;
  }
  
  return age;
};

export const calculateBMR = (data: OnboardingData): number => {
  const { weight, height, birth_date, gender } = data;
  const age = calculateAgeFromBirthDate(birth_date);

  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

export const calculateTDEE = (bmr: number, activity_level: string): number => {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  return bmr * (multipliers[activity_level as keyof typeof multipliers] || 1.2);
};

export const adjustCaloriesForGoal = (tdee: number, goal: string, weight: number, gender: string) => {
  let targetCalories;
  
  switch (goal) {
    case 'lose_weight':
      targetCalories = tdee * 0.85;
      break;
    case 'build_muscle':
      targetCalories = tdee * 1.1;
      break;
    case 'gain_weight':
      targetCalories = tdee * 1.05;
      break;
    case 'maintain':
    default:
      targetCalories = tdee;
      break;
  }
  
  const absoluteMinCalories = gender === 'male' 
    ? Math.max(1500, weight * 22)
    : Math.max(1200, weight * 20);
  
  const absoluteMaxCalories = tdee + 800;
  
  const isBelowMinimum = targetCalories < absoluteMinCalories;
  const isAboveMaximum = targetCalories > absoluteMaxCalories;
  
  let finalCalories = targetCalories;
  
  if (isBelowMinimum) {
    finalCalories = absoluteMinCalories;
  } else if (isAboveMaximum) {
    finalCalories = absoluteMaxCalories;
  }
  
  return {
    targetCalories: Math.round(finalCalories),
    usedCalculatedValue: !isBelowMinimum && !isAboveMaximum,
    calculatedValue: Math.round(targetCalories),
    minCalories: Math.round(absoluteMinCalories),
    maxCalories: Math.round(absoluteMaxCalories),
    wasAdjusted: isBelowMinimum || isAboveMaximum
  };
};

export const getMacroDistribution = (goal: GoalType, diet_type: DietType = 'recommended') => {
  const distributions = {
    lose_weight: {
      recommended: { proteinPerKg: 1.6, fatRatio: 0.25 },
      high_protein: { proteinPerKg: 2.0, fatRatio: 0.25 },
      low_carb: { proteinPerKg: 1.8, fatRatio: 0.35 },
      balanced: { proteinPerKg: 1.6, fatRatio: 0.25 }
    },
    build_muscle: {
      recommended: { proteinPerKg: 1.8, fatRatio: 0.25 },
      high_protein: { proteinPerKg: 2.2, fatRatio: 0.25 },
      low_carb: { proteinPerKg: 2.0, fatRatio: 0.30 },
      balanced: { proteinPerKg: 1.8, fatRatio: 0.25 }
    },
    gain_weight: {
      recommended: { proteinPerKg: 1.6, fatRatio: 0.25 },
      high_protein: { proteinPerKg: 1.8, fatRatio: 0.25 },
      low_carb: { proteinPerKg: 1.6, fatRatio: 0.35 },
      balanced: { proteinPerKg: 1.6, fatRatio: 0.25 }
    },
    maintain: {
      recommended: { proteinPerKg: 1.4, fatRatio: 0.25 },
      high_protein: { proteinPerKg: 1.8, fatRatio: 0.25 },
      low_carb: { proteinPerKg: 1.6, fatRatio: 0.30 },
      balanced: { proteinPerKg: 1.4, fatRatio: 0.25 }
    }
  };

  return distributions[goal][diet_type] || distributions[goal].recommended;
};

export const calculateMacros = (data: OnboardingData) => {
  const bmr = calculateBMR(data);
  const tdee = calculateTDEE(bmr, data.activity_level);
  
  const calorieResult = adjustCaloriesForGoal(tdee, data.goal, data.weight, data.gender);
  const targetCalories = calorieResult.targetCalories;

  const distribution = getMacroDistribution(data.goal, data.diet_type || 'recommended');
  
  const proteinGrams = Math.round(data.weight * distribution.proteinPerKg);
  const proteinCalories = proteinGrams * 4;

  const fatCalories = targetCalories * distribution.fatRatio;
  const fatGrams = Math.round(fatCalories / 9);

  const remainingCalories = targetCalories - proteinCalories - fatCalories;
  const carbGrams = Math.max(0, Math.round(remainingCalories / 4));

  return {
    dailyCalories: targetCalories,
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
    metadata: {
      dietType: data.diet_type || 'recommended',
      proteinPerKg: distribution.proteinPerKg,
      usedMinimumCalories: calorieResult.wasAdjusted && calorieResult.targetCalories === calorieResult.minCalories,
      calculatedCalories: calorieResult.calculatedValue,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    }
  };
};

export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};