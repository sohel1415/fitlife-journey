import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface WorkoutLog {
  id: string;
  user_id: string;
  workout_plan_id: string | null;
  exercises_completed: string[] | null;
  duration_seconds: number | null;
  calories_burned: number | null;
  notes: string | null;
  completed_at: string;
}

export function useWorkoutLogs() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLogs();
    } else {
      setLogs([]);
      setLoading(false);
    }
  }, [user]);

  const fetchLogs = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching workout logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addLog = async (log: Omit<WorkoutLog, 'id' | 'user_id' | 'completed_at'>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase
        .from('workout_logs')
        .insert({
          ...log,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      
      setLogs(prev => [data, ...prev]);
      toast({
        title: 'Workout completed! 💪',
        description: 'Great job! Your progress has been saved.',
      });
      return { error: null, data };
    } catch (error) {
      console.error('Error adding workout log:', error);
      toast({
        title: 'Error',
        description: 'Failed to save workout.',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const getWeeklyStats = () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weekLogs = logs.filter(log => new Date(log.completed_at) >= weekAgo);
    
    return {
      workoutsCompleted: weekLogs.length,
      totalDuration: weekLogs.reduce((acc, log) => acc + (log.duration_seconds || 0), 0),
      totalCalories: weekLogs.reduce((acc, log) => acc + (log.calories_burned || 0), 0),
    };
  };

  const getCurrentStreak = () => {
    if (logs.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      
      const hasWorkout = logs.some(log => {
        const logDate = new Date(log.completed_at);
        logDate.setHours(0, 0, 0, 0);
        return logDate.getTime() === checkDate.getTime();
      });
      
      if (hasWorkout) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  };

  return { logs, loading, addLog, refetch: fetchLogs, getWeeklyStats, getCurrentStreak };
}
