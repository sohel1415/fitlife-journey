
-- Strengthen RLS policies for all tables to explicitly require authenticated role

-- profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- weight_logs
DROP POLICY IF EXISTS "Users can view their own weight logs" ON public.weight_logs;
DROP POLICY IF EXISTS "Users can insert their own weight logs" ON public.weight_logs;
DROP POLICY IF EXISTS "Users can delete their own weight logs" ON public.weight_logs;

CREATE POLICY "Users can view their own weight logs" ON public.weight_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own weight logs" ON public.weight_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own weight logs" ON public.weight_logs FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- running_logs
DROP POLICY IF EXISTS "Users can view their own running logs" ON public.running_logs;
DROP POLICY IF EXISTS "Users can insert their own running logs" ON public.running_logs;
DROP POLICY IF EXISTS "Users can delete their own running logs" ON public.running_logs;

CREATE POLICY "Users can view their own running logs" ON public.running_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own running logs" ON public.running_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own running logs" ON public.running_logs FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- meal_logs
DROP POLICY IF EXISTS "Users can view their own meal logs" ON public.meal_logs;
DROP POLICY IF EXISTS "Users can insert their own meal logs" ON public.meal_logs;

CREATE POLICY "Users can view their own meal logs" ON public.meal_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own meal logs" ON public.meal_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- step_logs
DROP POLICY IF EXISTS "Users can view their own step logs" ON public.step_logs;
DROP POLICY IF EXISTS "Users can insert their own step logs" ON public.step_logs;
DROP POLICY IF EXISTS "Users can update their own step logs" ON public.step_logs;

CREATE POLICY "Users can view their own step logs" ON public.step_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own step logs" ON public.step_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own step logs" ON public.step_logs FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- workout_logs
DROP POLICY IF EXISTS "Users can view their own workout logs" ON public.workout_logs;
DROP POLICY IF EXISTS "Users can insert their own workout logs" ON public.workout_logs;

CREATE POLICY "Users can view their own workout logs" ON public.workout_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own workout logs" ON public.workout_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
