-- Create resized_images table
CREATE TABLE IF NOT EXISTS resized_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  original_image text NOT NULL,
  resized_image text NOT NULL,
  options jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE resized_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own resized images" ON resized_images;
DROP POLICY IF EXISTS "Users can view their own resized images" ON resized_images;
DROP POLICY IF EXISTS "Users can delete their own resized images" ON resized_images;

-- Create policies for authenticated users
CREATE POLICY "Users can insert their own resized images"
  ON resized_images FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own resized images"
  ON resized_images FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resized images"
  ON resized_images FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create function to automatically set user_id
CREATE OR REPLACE FUNCTION set_resized_image_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for setting user_id
DROP TRIGGER IF EXISTS set_resized_image_user_id_trigger ON resized_images;

CREATE TRIGGER set_resized_image_user_id_trigger
  BEFORE INSERT ON resized_images
  FOR EACH ROW
  EXECUTE FUNCTION set_resized_image_user_id();