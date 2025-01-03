/*
  # Add secure API key storage
  
  1. New Tables
    - `api_keys`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `service` (text)
      - `key_value` (text, encrypted)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add encryption for key values
*/

-- Enable pgcrypto for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create API keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  service text NOT NULL,
  key_value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own API keys"
  ON api_keys
  USING (auth.uid() = user_id);

-- Function to encrypt API keys
CREATE OR REPLACE FUNCTION encrypt_api_key(key_text text, secret_key text)
RETURNS text AS $$
BEGIN
  RETURN encode(
    encrypt_iv(
      key_text::bytea,
      secret_key::bytea,
      '12345678'::bytea,
      'aes-cbc'
    ),
    'base64'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrypt API keys
CREATE OR REPLACE FUNCTION decrypt_api_key(encrypted_key text, secret_key text)
RETURNS text AS $$
BEGIN
  RETURN convert_from(
    decrypt_iv(
      decode(encrypted_key, 'base64'),
      secret_key::bytea,
      '12345678'::bytea,
      'aes-cbc'
    ),
    'utf8'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to safely store API key
CREATE OR REPLACE FUNCTION store_api_key(
  p_service text,
  p_key_value text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_secret_key text;
  v_encrypted_key text;
  v_key_id uuid;
BEGIN
  -- Get encryption key from vault (you need to set this in Supabase dashboard)
  v_secret_key := current_setting('app.settings.encryption_key', true);
  
  -- Encrypt the API key
  v_encrypted_key := encrypt_api_key(p_key_value, v_secret_key);
  
  -- Store encrypted key
  INSERT INTO api_keys (user_id, service, key_value)
  VALUES (auth.uid(), p_service, v_encrypted_key)
  RETURNING id INTO v_key_id;
  
  RETURN v_key_id;
END;
$$;