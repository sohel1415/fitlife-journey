import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  age: number | null;
  height_cm: number | null;
  weight_kg: number | null;
  gender: 'male' | 'female' | 'other' | null;
  fitness_goal: 'lose_weight' | 'build_muscle' | 'stay_fit' | 'gain_weight' | null;
  activity_level: 'sedentary' | 'light' | 'moderate' | 'very_active' | null;
  units_preference: 'metric' | 'imperial';
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data as Profile | null);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data as Profile);
      toast({
        title: 'Profile updated!',
        description: 'Your changes have been saved.',
      });
      return { error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const isProfileComplete = () => {
    if (!profile) return false;
    return !!(
      profile.full_name &&
      profile.age &&
      profile.height_cm &&
      profile.weight_kg &&
      profile.gender &&
      profile.fitness_goal &&
      profile.activity_level
    );
  };

  return { profile, loading, updateProfile, refetch: fetchProfile, isProfileComplete };
}
