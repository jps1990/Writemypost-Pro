/*
  # Fix storage policies and bucket configuration

  1. Changes
    - Reset storage bucket configuration
    - Update storage policies for authenticated users
    - Add owner column to track image ownership
    - Fix RLS policies for storage objects
  
  2. Security
    - Ensure proper authentication checks
    - Restrict access to user's own files
    - Add owner tracking for uploaded files
*/

-- Reset storage bucket configuration
UPDATE storage.buckets 
SET public = false 
WHERE id = 'images';

-- Add owner column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'storage' 
    AND table_name = 'objects' 
    AND column_name = 'owner'
  ) THEN
    ALTER TABLE storage.objects ADD COLUMN owner uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can upload their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own images" ON storage.objects;

-- Create new storage policies
CREATE POLICY "Users can upload their own images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  (owner IS NULL OR owner = auth.uid())
);

CREATE POLICY "Users can view their own images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'images' AND
  (owner IS NULL OR owner = auth.uid())
);

-- Function to automatically set owner on upload
CREATE OR REPLACE FUNCTION storage_objects_set_owner()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.owner IS NULL THEN
    NEW.owner = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for setting owner
DROP TRIGGER IF EXISTS storage_objects_set_owner_trigger ON storage.objects;

CREATE TRIGGER storage_objects_set_owner_trigger
  BEFORE INSERT ON storage.objects
  FOR EACH ROW
  EXECUTE FUNCTION storage_objects_set_owner();