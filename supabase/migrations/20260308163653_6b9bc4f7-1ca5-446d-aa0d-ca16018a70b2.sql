
-- Notes system for problems and global notebook
CREATE TABLE public.problem_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  problem_id text NOT NULL,
  understanding text DEFAULT '',
  approach_brute text DEFAULT '',
  approach_optimized text DEFAULT '',
  edge_cases text DEFAULT '',
  time_complexity text DEFAULT '',
  space_complexity text DEFAULT '',
  revision_notes text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

ALTER TABLE public.problem_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notes" ON public.problem_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notes" ON public.problem_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notes" ON public.problem_notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notes" ON public.problem_notes FOR DELETE USING (auth.uid() = user_id);

-- Global notebook
CREATE TABLE public.notebook_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  category text NOT NULL DEFAULT 'general',
  title text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.notebook_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notebook" ON public.notebook_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notebook" ON public.notebook_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notebook" ON public.notebook_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notebook" ON public.notebook_entries FOR DELETE USING (auth.uid() = user_id);

-- Add default_language to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS default_language text DEFAULT 'C++';

-- Add time_taken_seconds to submissions
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS time_taken_seconds integer DEFAULT 0;
