import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface RunningLog {
  id: string;
  user_id: string;
  distance_km: number;
  duration_seconds: number;
  avg_speed_kmh: number | null;
  max_speed_kmh: number | null;
  avg_pace_min_km: number | null;
  calories_burned: number | null;
  start_time: string;
  end_time: string | null;
  route_data: any;
  notes: string | null;
  created_at: string;
}

interface NewRunningLog {
  distance_km: number;
  duration_seconds: number;
  avg_speed_kmh?: number;
  max_speed_kmh?: number;
  avg_pace_min_km?: number;
  calories_burned?: number;
  start_time: Date;
  end_time?: Date;
  route_data?: any;
  notes?: string;
}

export function useRunningLogs() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<RunningLog[]>([]);
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
        .from('running_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching running logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addLog = async (log: NewRunningLog) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase
        .from('running_logs')
        .insert({
          user_id: user.id,
          distance_km: log.distance_km,
          duration_seconds: log.duration_seconds,
          avg_speed_kmh: log.avg_speed_kmh,
          max_speed_kmh: log.max_speed_kmh,
          avg_pace_min_km: log.avg_pace_min_km,
          calories_burned: log.calories_burned,
          start_time: log.start_time.toISOString(),
          end_time: log.end_time?.toISOString(),
          route_data: log.route_data,
          notes: log.notes,
        })
        .select()
        .single();

      if (error) throw error;

      setLogs(prev => [data, ...prev]);
      toast({
        title: 'Run saved! 🏃',
        description: `Great run! ${log.distance_km.toFixed(2)} km in ${formatDuration(log.duration_seconds)}`,
      });
      return { error: null, data };
    } catch (error) {
      console.error('Error adding running log:', error);
      toast({
        title: 'Error',
        description: 'Failed to save run.',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const deleteLog = async (id: string) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { error } = await supabase
        .from('running_logs')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setLogs(prev => prev.filter(log => log.id !== id));
      toast({
        title: 'Run deleted',
        description: 'The running log has been removed.',
      });
      return { error: null };
    } catch (error) {
      console.error('Error deleting running log:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete run.',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const getWeeklyStats = () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weekLogs = logs.filter(log => new Date(log.start_time) >= weekAgo);

    return {
      totalRuns: weekLogs.length,
      totalDistance: weekLogs.reduce((acc, log) => acc + Number(log.distance_km), 0),
      totalDuration: weekLogs.reduce((acc, log) => acc + log.duration_seconds, 0),
      totalCalories: weekLogs.reduce((acc, log) => acc + (log.calories_burned || 0), 0),
      avgPace: weekLogs.length > 0
        ? weekLogs.reduce((acc, log) => acc + (Number(log.avg_pace_min_km) || 0), 0) / weekLogs.length
        : 0,
    };
  };

  const getRecentRuns = (limit = 5) => {
    return logs.slice(0, limit);
  };

  return {
    logs,
    loading,
    addLog,
    deleteLog,
    refetch: fetchLogs,
    getWeeklyStats,
    getRecentRuns,
  };
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
