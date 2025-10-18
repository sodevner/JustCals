export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type GoalType = "lose_weight" | "maintain" | "gain_weight" | "build_muscle";
export type DietType = "recommended" | "high_protein" | "low_carb" | "balanced";

export interface UserProfile {
  id: string;
  weight?: number;
  birth_date?: Date;
  height?: number;
  gender?: 'male' | 'female';
  activity_level?: ActivityLevel;
  goal?: GoalType;
  diet_type?: DietType;
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
  activity_level: ActivityLevel;
  goal: GoalType;
  diet_type: DietType;
}