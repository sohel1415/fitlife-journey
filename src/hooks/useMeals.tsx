import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';
import { meals as localMeals, Meal } from '@/data/meals';

export interface MealLog {
  id: string;
  user_id: string;
  meal_id: string | null;
  meal_name: string;
  calories: number | null;
  logged_at: string;
  meal_type: string | null;
}

export function useMeals() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMealLogs();
    } else {
      setMealLogs([]);
      setLoading(false);
    }
  }, [user]);

  const fetchMealLogs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('meal_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('logged_at', { ascending: false });

      if (error) throw error;
      setMealLogs(data as MealLog[]);
    } catch (error) {
      console.error('Error fetching meal logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const logMeal = async (meal: Meal, mealType: string) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase
        .from('meal_logs')
        .insert({
          user_id: user.id,
          meal_id: meal.id,
          meal_name: meal.name,
          calories: meal.calories,
          meal_type: mealType,
        })
        .select()
        .single();

      if (error) throw error;

      setMealLogs(prev => [data as MealLog, ...prev]);
      toast({
        title: 'Meal logged!',
        description: `${meal.name} added to your log.`,
      });
      return { error: null };
    } catch (error) {
      console.error('Error logging meal:', error);
      toast({
        title: 'Error',
        description: 'Failed to log meal.',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const getTodaysMeals = () => {
    const today = new Date().toDateString();
    return mealLogs.filter(log => new Date(log.logged_at).toDateString() === today);
  };

  const getTodaysCalories = () => {
    return getTodaysMeals().reduce((sum, log) => sum + (log.calories || 0), 0);
  };

  const getSuggestedMeals = (fitnessGoal: string | null, dietPreference?: string) => {
    let filtered = [...localMeals];
    
    if (fitnessGoal) {
      filtered = filtered.filter(meal => meal.fitness_goal.includes(fitnessGoal));
    }
    
    if (dietPreference && dietPreference !== 'all') {
      filtered = filtered.filter(meal => meal.diet_type === dietPreference);
    }
    
    return filtered;
  };

  const getMealsByCategory = (category: string, fitnessGoal?: string | null) => {
    let filtered = localMeals.filter(meal => meal.category === category);
    
    if (fitnessGoal) {
      filtered = filtered.filter(meal => meal.fitness_goal.includes(fitnessGoal));
    }
    
    return filtered;
  };

  return {
    meals: localMeals,
    mealLogs,
    loading,
    logMeal,
    getTodaysMeals,
    getTodaysCalories,
    getSuggestedMeals,
    getMealsByCategory,
    refetch: fetchMealLogs,
  };
}
