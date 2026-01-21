import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface WeightLog {
  id: string;
  user_id: string;
  weight_kg: number;
  body_fat_percentage: number | null;
  notes: string | null;
  logged_at: string;
}

export function useWeightLogs() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<WeightLog[]>([]);
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
        .from('weight_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('logged_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching weight logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addLog = async (weight_kg: number, body_fat_percentage?: number, notes?: string) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase
        .from('weight_logs')
        .insert({
          user_id: user.id,
          weight_kg,
          body_fat_percentage: body_fat_percentage || null,
          notes: notes || null
        })
        .select()
        .single();

      if (error) throw error;
      
      setLogs(prev => [data, ...prev]);
      toast({
        title: 'Weight logged!',
        description: 'Your progress has been recorded.',
      });
      return { error: null, data };
    } catch (error) {
      console.error('Error adding weight log:', error);
      toast({
        title: 'Error',
        description: 'Failed to log weight.',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const deleteLog = async (id: string) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { error } = await supabase
        .from('weight_logs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setLogs(prev => prev.filter(log => log.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting weight log:', error);
      return { error };
    }
  };

  return { logs, loading, addLog, deleteLog, refetch: fetchLogs };
}
