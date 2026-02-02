-- Create step_logs table for tracking daily steps
CREATE TABLE public.step_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  steps INTEGER NOT NULL DEFAULT 0,
  goal INTEGER NOT NULL DEFAULT 10000,
  logged_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, logged_date)
);

-- Enable Row Level Security
ALTER TABLE public.step_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own step logs" 
ON public.step_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own step logs" 
ON public.step_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own step logs" 
ON public.step_logs 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own step logs" 
ON public.step_logs 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_step_logs_updated_at
BEFORE UPDATE ON public.step_logs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();