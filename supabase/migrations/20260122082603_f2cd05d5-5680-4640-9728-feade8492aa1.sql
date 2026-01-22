-- Create meals table for diet suggestions
CREATE TABLE public.meals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- breakfast, lunch, dinner, snack
  diet_type TEXT NOT NULL, -- veg, non-veg, vegan
  calories INTEGER NOT NULL,
  protein_g NUMERIC,
  carbs_g NUMERIC,
  fat_g NUMERIC,
  fitness_goal TEXT[], -- lose_weight, build_muscle, stay_fit, gain_weight
  image_url TEXT,
  ingredients TEXT[],
  instructions TEXT[],
  prep_time_mins INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;

-- Anyone can view meals
CREATE POLICY "Anyone can view meals" ON public.meals FOR SELECT USING (true);

-- Create user_meal_logs table to track what users ate
CREATE TABLE public.meal_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  meal_id UUID REFERENCES public.meals(id),
  meal_name TEXT NOT NULL,
  calories INTEGER,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  meal_type TEXT -- breakfast, lunch, dinner, snack
);

-- Enable RLS
ALTER TABLE public.meal_logs ENABLE ROW LEVEL SECURITY;

-- Users can manage their own meal logs
CREATE POLICY "Users can view their own meal logs" ON public.meal_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own meal logs" ON public.meal_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own meal logs" ON public.meal_logs FOR DELETE USING (auth.uid() = user_id);