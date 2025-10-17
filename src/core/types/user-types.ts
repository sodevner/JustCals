export interface UserProfile {
  id: string;
  weight?: number;
  birth_date?: Date;
  height?: number;
  gender?: 'male' | 'female';
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dailyCalories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  hasCompletedOnboarding: boolean;
}

export interface OnboardingData {
  weight: number;
  birth_date: Date;
  height: number;
  gender: 'male' | 'female';
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}