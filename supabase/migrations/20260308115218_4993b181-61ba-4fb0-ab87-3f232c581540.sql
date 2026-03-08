
-- Drop the incorrectly structured functions
DROP FUNCTION IF EXISTS public.update_streak_on_submission() CASCADE;
DROP FUNCTION IF EXISTS public.update_streak_on_solve() CASCADE;

-- Clean streak update function for submissions
CREATE OR REPLACE FUNCTION public.handle_streak_on_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _last_solved_at timestamp with time zone;
  _current_streak integer;
  _today date;
  _last_date date;
BEGIN
  IF NEW.verdict != 'Accepted' THEN
    RETURN NEW;
  END IF;

  SELECT last_solved_at, streak INTO _last_solved_at, _current_streak
  FROM public.profiles WHERE user_id = NEW.user_id;

  _today := (now() AT TIME ZONE 'UTC')::date;
  
  IF _last_solved_at IS NOT NULL THEN
    _last_date := (_last_solved_at AT TIME ZONE 'UTC')::date;
    IF _last_date = _today THEN RETURN NEW; END IF;
    IF _last_date = _today - 1 THEN
      UPDATE public.profiles SET streak = _current_streak + 1, last_solved_at = now() WHERE user_id = NEW.user_id;
    ELSE
      UPDATE public.profiles SET streak = 1, last_solved_at = now() WHERE user_id = NEW.user_id;
    END IF;
  ELSE
    UPDATE public.profiles SET streak = 1, last_solved_at = now() WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$;

-- Streak update for DSA progress
CREATE OR REPLACE FUNCTION public.handle_streak_on_dsa()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _last_solved_at timestamp with time zone;
  _current_streak integer;
  _today date;
  _last_date date;
BEGIN
  IF NEW.completed != true THEN RETURN NEW; END IF;

  SELECT last_solved_at, streak INTO _last_solved_at, _current_streak
  FROM public.profiles WHERE user_id = NEW.user_id;

  _today := (now() AT TIME ZONE 'UTC')::date;
  
  IF _last_solved_at IS NOT NULL THEN
    _last_date := (_last_solved_at AT TIME ZONE 'UTC')::date;
    IF _last_date = _today THEN RETURN NEW; END IF;
    IF _last_date = _today - 1 THEN
      UPDATE public.profiles SET streak = _current_streak + 1, last_solved_at = now() WHERE user_id = NEW.user_id;
    ELSE
      UPDATE public.profiles SET streak = 1, last_solved_at = now() WHERE user_id = NEW.user_id;
    END IF;
  ELSE
    UPDATE public.profiles SET streak = 1, last_solved_at = now() WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$;

-- Streak update for Python progress
CREATE OR REPLACE FUNCTION public.handle_streak_on_python()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _last_solved_at timestamp with time zone;
  _current_streak integer;
  _today date;
  _last_date date;
BEGIN
  IF NEW.completed != true THEN RETURN NEW; END IF;

  SELECT last_solved_at, streak INTO _last_solved_at, _current_streak
  FROM public.profiles WHERE user_id = NEW.user_id;

  _today := (now() AT TIME ZONE 'UTC')::date;
  
  IF _last_solved_at IS NOT NULL THEN
    _last_date := (_last_solved_at AT TIME ZONE 'UTC')::date;
    IF _last_date = _today THEN RETURN NEW; END IF;
    IF _last_date = _today - 1 THEN
      UPDATE public.profiles SET streak = _current_streak + 1, last_solved_at = now() WHERE user_id = NEW.user_id;
    ELSE
      UPDATE public.profiles SET streak = 1, last_solved_at = now() WHERE user_id = NEW.user_id;
    END IF;
  ELSE
    UPDATE public.profiles SET streak = 1, last_solved_at = now() WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$;

-- Create triggers
CREATE TRIGGER on_submission_streak
  AFTER INSERT ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_streak_on_submission();

CREATE TRIGGER on_dsa_streak
  AFTER INSERT OR UPDATE ON public.dsa_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_streak_on_dsa();

CREATE TRIGGER on_python_streak
  AFTER INSERT OR UPDATE ON public.python_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_streak_on_python();
