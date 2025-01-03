/*
  # Initial schema setup for AI content generation

  1. New Tables
    - `images`
      - Stores uploaded images and their analysis results
    - `content_generations` 
      - Stores generated content and metadata
    - `api_usage`
      - Tracks API usage and quotas

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Images table
CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  file_path text NOT NULL,
  file_type text NOT NULL,
  analysis jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Content generations table
CREATE TABLE IF NOT EXISTS content_generations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  image_id uuid REFERENCES images(id),
  content_type text NOT NULL, -- 'social' or 'marketplace'
  platform text,
  generated_content jsonb,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- API usage tracking
CREATE TABLE IF NOT EXISTS api_usage (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  api_calls_count integer DEFAULT 0,
  quota_limit integer DEFAULT 100,
  reset_date timestamptz DEFAULT now() + interval '1 month',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert their own images"
  ON images FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own images"
  ON images FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own content generations"
  ON content_generations FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own content generations"
  ON content_generations FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own API usage"
  ON api_usage FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION process_image_with_gpt4o(
  p_image_id uuid,
  p_user_id uuid
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_api_key text;
  v_result jsonb;
  v_usage record;
BEGIN
  -- Check API usage quota
  SELECT * INTO v_usage 
  FROM api_usage 
  WHERE user_id = p_user_id;

  IF v_usage.api_calls_count >= v_usage.quota_limit THEN
    RAISE EXCEPTION 'API quota exceeded';
  END IF;

  -- Get API key from vault
  v_api_key := current_setting('app.gpt4o_api_key', true);

  -- TODO: Implement actual GPT-4o mini API call
  -- For now, return mock data
  v_result := jsonb_build_object(
    'status', 'success',
    'data', jsonb_build_object(
      'analysis', jsonb_build_object(
        'categories', array['Electronics', 'Technology'],
        'tags', array['modern', 'innovative'],
        'description', 'Product analysis description'
      )
    )
  );

  -- Update API usage
  UPDATE api_usage 
  SET api_calls_count = api_calls_count + 1,
      updated_at = now()
  WHERE user_id = p_user_id;

  RETURN v_result;
END;
$$;