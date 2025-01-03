/*
  # Fix storage policies and bucket configuration

  1. Changes
    - Reset storage bucket configuration
    - Update storage policies for public access
    - Add proper RLS policies
    - Fix owner tracking
  
  2. Security
    - Enable public access to images bucket
    - Allow authenticated uploads
    - Track image ownership
*/

-- Reset storage bucket configuration
UPDATE storage.buckets 
SET public = true 
WHERE id = 'images';

-- Drop existing policies
DROP POLICY IF EXISTS "Users can upload their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads to images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to view images bucket" ON storage.objects;

-- Create new storage policies
CREATE POLICY "Allow authenticated uploads to images bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images'
);

CREATE POLICY "Allow public to view images bucket"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- Update images table policies
DROP POLICY IF EXISTS "Users can insert their own images" ON images;
DROP POLICY IF EXISTS "Users can view their own images" ON images;

CREATE POLICY "Users can insert their own images"
ON images FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
);

CREATE POLICY "Users can view their own images"
ON images FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
);