
-- Create storage bucket for notebook attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('notebook-files', 'notebook-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Users can upload notebook files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'notebook-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow authenticated users to read their own files
CREATE POLICY "Users can read own notebook files"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'notebook-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow authenticated users to delete their own files
CREATE POLICY "Users can delete own notebook files"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'notebook-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Add attachments column to notebook_entries
ALTER TABLE public.notebook_entries
ADD COLUMN IF NOT EXISTS attachments jsonb DEFAULT '[]'::jsonb;
