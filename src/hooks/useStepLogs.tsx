import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from 'date-fns';

export interface StepLog {
  id: string;
  user_id: string;
  steps: number;
  goal: number;
  logged_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function useStepLogs() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<StepLog[]>([]);
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
        .from('step_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('logged_date', { ascending: false });

      if (error) throw error;
      setLogs((data as StepLog[]) || []);
    } catch (error) {
      console.error('Error fetching step logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTodayLog = (): StepLog | null => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return logs.find(log => log.logged_date === today) || null;
  };

  const addSteps = async (steps: number, goal: number = 10000) => {
    if (!user) return { error: new Error('No user logged in') };

    const today = format(new Date(), 'yyyy-MM-dd');
    const existingLog = getTodayLog();

    try {
      if (existingLog) {
        // Update existing log
        const newSteps = existingLog.steps + steps;
        const { error } = await supabase
          .from('step_logs')
          .update({ steps: newSteps })
          .eq('id', existingLog.id);

        if (error) throw error;

        toast({
          title: 'Steps added!',
          description: `${steps} steps logged. Total today: ${newSteps}`,
        });
      } else {
        // Create new log
        const { error } = await supabase
          .from('step_logs')
          .insert({
            user_id: user.id,
            steps,
            goal,
            logged_date: today,
          });

        if (error) throw error;

        toast({
          title: 'Steps logged!',
          description: `${steps} steps recorded for today.`,
        });
      }

      await fetchLogs();
      return { error: null };
    } catch (error) {
      console.error('Error adding steps:', error);
      toast({
        title: 'Error',
        description: 'Failed to log steps.',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const updateGoal = async (goal: number) => {
    if (!user) return { error: new Error('No user logged in') };

    const today = format(new Date(), 'yyyy-MM-dd');
    const existingLog = getTodayLog();

    try {
      if (existingLog) {
        const { error } = await supabase
          .from('step_logs')
          .update({ goal })
          .eq('id', existingLog.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('step_logs')
          .insert({
            user_id: user.id,
            steps: 0,
            goal,
            logged_date: today,
          });

        if (error) throw error;
      }

      toast({
        title: 'Goal updated!',
        description: `Daily step goal set to ${goal.toLocaleString()}`,
      });

      await fetchLogs();
      return { error: null };
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: 'Error',
        description: 'Failed to update goal.',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const getWeeklyData = () => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const log = logs.find(l => l.logged_date === dateStr);
      return {
        date: day,
        dateStr,
        dayName: format(day, 'EEE'),
        steps: log?.steps || 0,
        goal: log?.goal || 10000,
        isToday: isToday(day),
      };
    });
  };

  const getWeeklyStats = () => {
    const weeklyData = getWeeklyData();
    const totalSteps = weeklyData.reduce((sum, day) => sum + day.steps, 0);
    const daysWithSteps = weeklyData.filter(day => day.steps > 0).length;
    const averageSteps = daysWithSteps > 0 ? Math.round(totalSteps / daysWithSteps) : 0;
    const goalsAchieved = weeklyData.filter(day => day.steps >= day.goal).length;

    return {
      totalSteps,
      averageSteps,
      daysWithSteps,
      goalsAchieved,
    };
  };

  const getCurrentStreak = () => {
    let streak = 0;
    const sortedLogs = [...logs].sort((a, b) => 
      new Date(b.logged_date).getTime() - new Date(a.logged_date).getTime()
    );

    for (const log of sortedLogs) {
      if (log.steps >= log.goal) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  return {
    logs,
    loading,
    getTodayLog,
    addSteps,
    updateGoal,
    getWeeklyData,
    getWeeklyStats,
    getCurrentStreak,
    refetch: fetchLogs,
  };
}
