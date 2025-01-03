-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resized_images_user_id 
  ON resized_images(user_id);

CREATE INDEX IF NOT EXISTS idx_resized_images_created_at 
  ON resized_images(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_resized_images_user_created 
  ON resized_images(user_id, created_at DESC);

-- Create secure view for recent resized images with built-in security check
CREATE OR REPLACE VIEW recent_resized_images AS
SELECT 
  ri.id,
  ri.user_id,
  ri.original_image,
  ri.resized_image,
  ri.options,
  ri.created_at,
  au.email as user_email
FROM resized_images ri
JOIN auth.users au ON ri.user_id = au.id
WHERE 
  ri.created_at > NOW() - INTERVAL '30 days'
  AND ri.user_id = auth.uid()  -- Built-in RLS using auth.uid()
ORDER BY ri.created_at DESC;

-- Grant access to authenticated users
GRANT SELECT ON recent_resized_images TO authenticated;