
-- Admin settings table
CREATE TABLE public.admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read settings (needed for maintenance mode check)
CREATE POLICY "Anyone can read settings" ON public.admin_settings FOR SELECT USING (true);

-- Insert default settings
INSERT INTO public.admin_settings (key, value) VALUES 
  ('maintenance_mode', 'false'),
  ('python_locked', 'false');

-- Python progress tracking
CREATE TABLE public.python_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  question_id text NOT NULL,
  difficulty text NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, topic_id, question_id)
);

ALTER TABLE public.python_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress" ON public.python_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.python_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.python_progress FOR UPDATE USING (auth.uid() = user_id);
