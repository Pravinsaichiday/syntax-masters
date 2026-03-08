CREATE TABLE public.dsa_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  topic_id text NOT NULL,
  problem_id text NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  code text,
  language text DEFAULT 'python',
  used_solution boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, topic_id, problem_id)
);

ALTER TABLE public.dsa_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own dsa progress" ON public.dsa_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own dsa progress" ON public.dsa_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own dsa progress" ON public.dsa_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);