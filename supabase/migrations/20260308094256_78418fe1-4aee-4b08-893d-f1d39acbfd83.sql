
INSERT INTO public.admin_settings (key, value) VALUES 
  ('gemini_api_key', ''),
  ('gemini_usage_count', '0'),
  ('gemini_last_reset', NOW()::text);
