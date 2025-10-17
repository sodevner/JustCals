// utils/userCalculations.ts
import { OnboardingData } from '../types/user-types';

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


  
  // Mifflin-St Jeor Equation
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

export const calculateMacros = (data: OnboardingData) => {
  const bmr = calculateBMR(data);
  const tdee = calculateTDEE(bmr, data.activity_level);
  
  // Makronährstoff-Verteilung (kann angepasst werden)
  const proteinGrams = Math.round((data.weight * 1.8)); // 1.8g Protein pro kg Körpergewicht
  const proteinCalories = proteinGrams * 4;
  
  const fatCalories = tdee * 0.25; // 25% Fett
  const fatGrams = Math.round(fatCalories / 9);
  
  const remainingCalories = tdee - proteinCalories - fatCalories;
  const carbGrams = Math.round(remainingCalories / 4);

  return {
    dailyCalories: Math.round(tdee),
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams
  };
};

export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};