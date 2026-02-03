-- Create running_logs table for storing running session data
CREATE TABLE public.running_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  distance_km NUMERIC NOT NULL DEFAULT 0,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  avg_speed_kmh NUMERIC,
  max_speed_kmh NUMERIC,
  avg_pace_min_km NUMERIC,
  calories_burned INTEGER,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  route_data JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.running_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own running logs"
ON public.running_logs
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own running logs"
ON public.running_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own running logs"
ON public.running_logs
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own running logs"
ON public.running_logs
FOR DELETE
USING (auth.uid() = user_id);