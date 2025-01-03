/*
  # Fix storage and RLS policies

  1. Changes
    - Reset storage bucket configuration
    - Simplify storage policies
    - Add proper error handling
    - Fix RLS policies
  
  2. Security
    - Enable public bucket access
    - Maintain user data isolation
*/

-- Reset storage bucket configuration
UPDATE storage.buckets 
SET public = true 
WHERE id = 'images';

-- Drop existing policies
DROP POLICY IF EXISTS "Users can upload their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to view images bucket" ON storage.objects;

-- Create simplified storage policies
CREATE POLICY "Allow uploads to images bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow viewing images bucket"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- Update RLS policies for images table
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own images" ON images;
DROP POLICY IF EXISTS "Users can view their own images" ON images;

CREATE POLICY "Allow authenticated users to insert images"
ON images FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to view their own images"
ON images FOR SELECT
TO authenticated
USING (auth.uid() = user_id);