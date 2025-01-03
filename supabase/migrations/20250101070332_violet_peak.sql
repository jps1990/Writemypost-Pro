/*
  # Fix RLS policies and storage access

  1. Changes
    - Drop existing storage policies
    - Create new storage policies with proper RLS
    - Add missing user_id to images table inserts
    - Update RLS policies for images table
    - Add storage bucket configuration

  2. Security
    - Enable RLS on storage.objects
    - Add policies for authenticated users
    - Ensure user_id is properly set
*/

-- Drop existing storage policies
DROP POLICY IF EXISTS "Allow public uploads to images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to view images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create storage policies for authenticated users
CREATE POLICY "Users can upload their own images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  auth.uid() = owner
);

CREATE POLICY "Users can view their own images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.uid() = owner
);

-- Update images table RLS policies
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

-- Create trigger to automatically set user_id on insert
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS set_user_id_trigger ON images;

CREATE TRIGGER set_user_id_trigger
  BEFORE INSERT ON images
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();