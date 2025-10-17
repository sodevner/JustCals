// hooks/useUser.ts
import { useEffect, useState } from 'react';
import { OnboardingData, UserProfile } from '../../core/types/user-types';
import { supabase } from '../../core/utils/supabase';
import { calculateMacros } from '../../core/utils/user-calculations';

// 🔥 Globaler State für User (löst das Synchronisationsproblem)
let globalUser: UserProfile | null = null;
let listeners: ((user: UserProfile | null) => void)[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener(globalUser));
};

export const useUser = () => {
  const [user, setUser] = useState<UserProfile | null>(globalUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listener für globale Updates registrieren
    const listener = (newUser: UserProfile | null) => {
      setUser(newUser);
    };
    
    listeners.push(listener);
    
    // Initialen User laden
    if (!globalUser) {
      checkUser();
    } else {
      setIsLoading(false);
    }

    return () => {
      // Listener cleanup
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const updateUser = (newUser: UserProfile | null) => {
    globalUser = newUser;
    notifyListeners();
  };

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        await signInAnonymously();
      }
    } catch (error) {
      console.error('Error checking user:', error);
      await signInAnonymously();
    } finally {
      setIsLoading(false);
    }
  };

  const signInAnonymously = async () => {
    try {
      const { data, error } = await supabase.auth.signInAnonymously();
      
      if (error) throw error;
      
      if (data.user) {
        updateUser({
          id: data.user.id,
          hasCompletedOnboarding: false
        });
      }
    } catch (error) {
      console.error('Error with anonymous sign in:', error);
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const mappedUser: UserProfile = {
          id: data.id,
          weight: data.weight || undefined,
          birth_date: data.birth_date || undefined,
          height: data.height || undefined,
          gender: data.gender as 'male' | 'female' || undefined,
          activity_level: data.activity_level as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' || undefined,
          dailyCalories: data.daily_calories || undefined,
          protein: data.protein || undefined,
          carbs: data.carbs || undefined,
          fat: data.fat || undefined,
          hasCompletedOnboarding: data.has_completed_onboarding || false
        };
        
        updateUser(mappedUser);
      } else {
        updateUser({
          id: userId,
          hasCompletedOnboarding: false
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      updateUser({
        id: userId,
        hasCompletedOnboarding: false
      });
    }
  };

  const createUserProfile = async (onboardingData: OnboardingData) => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) throw new Error('No user found');

      const { dailyCalories, protein, carbs, fat } = calculateMacros(onboardingData);

      const newProfile = {
        id: currentUser.id,
        weight: onboardingData.weight,
        birth_date: onboardingData.birth_date.toISOString().split('T')[0], // 👈 Format als YYYY-MM-DD
        height: onboardingData.height,
        gender: onboardingData.gender,
        activity_level: onboardingData.activity_level, // Achte auf die Benennung!
        daily_calories: dailyCalories,
        protein,
        carbs,
        fat,
        has_completed_onboarding: true
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .insert(newProfile)
        .select()
        .single();

      if (error) throw error;

      const mappedUser: UserProfile = {
        id: data.id,
        weight: data.weight || undefined,
        birth_date: data.birth_date ? new Date(data.birth_date) : undefined, // 👈 Zurück zu Date
        height: data.height || undefined,
        gender: data.gender as 'male' | 'female' || undefined,
        activity_level: data.activity_level as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' || undefined,
        dailyCalories: data.daily_calories || undefined,
        protein: data.protein || undefined,
        carbs: data.carbs || undefined,
        fat: data.fat || undefined,
        hasCompletedOnboarding: data.has_completed_onboarding || false
      };

      console.log("✅ Profile created and updating global state");
      updateUser(mappedUser);
      
      return mappedUser;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  return {
    user,
    isLoading,
    createUserProfile,
    signInAnonymously
  };
};