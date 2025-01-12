/*
  # Enhanced Website Features Schema

  1. New Tables
    - `website_features` - Tracks enabled features for each website
      - `id` (uuid, primary key)
      - `website_id` (uuid, references websites)
      - `feature_type` (text) - e.g., 'contact', 'blog'
      - `enabled` (boolean)
      - `config` (jsonb) - Feature-specific configuration
      - Timestamps

    - `website_forms` - Stores dynamic form submissions
      - `id` (uuid, primary key)
      - `website_id` (uuid, references websites)
      - `form_type` (text) - e.g., 'contact', 'newsletter'
      - `form_data` (jsonb) - Dynamic form fields and values
      - Timestamps

    - `website_blogs` - Stores blog posts for websites
      - `id` (uuid, primary key)
      - `website_id` (uuid, references websites)
      - `slug` (text, unique within website)
      - `title` (text)
      - `content` (text) - MDX content
      - `metadata` (jsonb) - Additional blog post metadata
      - Published status and timestamps

  2. Security
    - Enable RLS on all tables
    - Policies for viewing own website data
    - Admin-only policies for modifications
*/

-- Website Features Table
CREATE TABLE IF NOT EXISTS website_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES websites(id) ON DELETE CASCADE,
  feature_type text NOT NULL,
  enabled boolean DEFAULT false,
  config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(website_id, feature_type)
);

-- Website Forms Table
CREATE TABLE IF NOT EXISTS website_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES websites(id) ON DELETE CASCADE,
  form_type text NOT NULL,
  form_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Website Blogs Table
CREATE TABLE IF NOT EXISTS website_blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES websites(id) ON DELETE CASCADE,
  slug text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(website_id, slug)
);

-- Enable RLS
ALTER TABLE website_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_blogs ENABLE ROW LEVEL SECURITY;

-- Website Features Policies
CREATE POLICY "Users can view their website features"
  ON website_features
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM websites 
      WHERE websites.id = website_features.website_id 
      AND websites.user_id = auth.uid()
    )
  );

-- Website Forms Policies
CREATE POLICY "Users can view their website form submissions"
  ON website_forms
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM websites 
      WHERE websites.id = website_forms.website_id 
      AND websites.user_id = auth.uid()
    )
  );

CREATE POLICY "Public can insert form submissions"
  ON website_forms
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Website Blogs Policies
CREATE POLICY "Users can view their website blogs"
  ON website_blogs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM websites 
      WHERE websites.id = website_blogs.website_id 
      AND websites.user_id = auth.uid()
    )
  );

-- Update trigger functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_website_features_updated_at
  BEFORE UPDATE ON website_features
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_forms_updated_at
  BEFORE UPDATE ON website_forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_blogs_updated_at
  BEFORE UPDATE ON website_blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();