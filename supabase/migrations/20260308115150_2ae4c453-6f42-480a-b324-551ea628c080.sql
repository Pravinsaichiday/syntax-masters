
-- Add last_solved_at column to track when user last solved a problem
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_solved_at timestamp with time zone DEFAULT NULL;

-- Function to update streak when a problem is solved
CREATE OR REPLACE FUNCTION public.update_streak_on_solve()
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
  -- Get current profile data
  SELECT last_solved_at, streak INTO _last_solved_at, _current_streak
  FROM public.profiles
  WHERE user_id = NEW.user_id;

  _today := (now() AT TIME ZONE 'UTC')::date;

  IF _last_solved_at IS NOT NULL THEN
    _last_date := (_last_solved_at AT TIME ZONE 'UTC')::date;
  ELSE
    _last_date := NULL;
  END IF;

  -- If already solved today, do nothing to streak
  IF _last_date = _today THEN
    RETURN NEW;
  END IF;

  -- If solved yesterday, increment streak
  IF _last_date = _today - INTERVAL '1 day' THEN
    UPDATE public.profiles
    SET streak = _current_streak + 1, last_solved_at = now()
    WHERE user_id = NEW.user_id;
  ELSE
    -- Missed a day (or first solve ever), reset streak to 1
    UPDATE public.profiles
    SET streak = 1, last_solved_at = now()
    WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger on submissions (accepted verdicts)
CREATE OR REPLACE FUNCTION public.update_streak_on_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only update streak for accepted submissions
  IF NEW.verdict = 'Accepted' THEN
    PERFORM public.update_streak_on_solve() FROM (SELECT NEW.*) AS t;
    -- Inline the logic instead
    DECLARE
      _last_solved_at timestamp with time zone;
      _current_streak integer;
      _today date;
      _last_date date;
    BEGIN
      SELECT last_solved_at, streak INTO _last_solved_at, _current_streak
      FROM public.profiles WHERE user_id = NEW.user_id;
      _today := (now() AT TIME ZONE 'UTC')::date;
      IF _last_solved_at IS NOT NULL THEN
        _last_date := (_last_solved_at AT TIME ZONE 'UTC')::date;
      ELSE
        _last_date := NULL;
      END IF;
      IF _last_date = _today THEN
        RETURN NEW;
      END IF;
      IF _last_date = _today - INTERVAL '1 day' THEN
        UPDATE public.profiles SET streak = _current_streak + 1, last_solved_at = now() WHERE user_id = NEW.user_id;
      ELSE
        UPDATE public.profiles SET streak = 1, last_solved_at = now() WHERE user_id = NEW.user_id;
      END IF;
    END;
  END IF;
  RETURN NEW;
END;
$$;
