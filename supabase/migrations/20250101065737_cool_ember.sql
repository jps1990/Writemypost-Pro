/*
  # Fix storage policies for images bucket

  1. Changes
    - Allow public uploads to images bucket
    - Allow public access to view images
    - Remove authentication requirement temporarily

  Note: In production, you should enable authentication and restrict access
*/

-- Update bucket to ensure it exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to view images" ON storage.objects;

-- Create new policies for public access
CREATE POLICY "Allow public uploads to images bucket"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow public to view images bucket"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');