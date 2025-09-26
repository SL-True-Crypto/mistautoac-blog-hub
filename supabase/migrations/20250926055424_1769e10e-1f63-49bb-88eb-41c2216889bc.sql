-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post_views table
CREATE TABLE IF NOT EXISTS post_views (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to increment post views
CREATE OR REPLACE FUNCTION increment_post_views(post_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts 
  SET views = views + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS (Row Level Security)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access on blog_posts" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on blog_posts" ON blog_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on blog_posts" ON blog_posts
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on blog_posts" ON blog_posts
  FOR DELETE USING (true);

CREATE POLICY "Allow public read access on comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on comments" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on post_views" ON post_views
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on post_views" ON post_views
  FOR INSERT WITH CHECK (true);

-- Insert sample data (migrate existing blog post)
INSERT INTO blog_posts (title, excerpt, content, image, date, category, read_time) VALUES
(
  'ඔබගේ නිවසට සේවා ස්ථානයට සුදුසු වායු සමීකරණය තෝරාගන්නේ කෙසේද?',
  'විවිධ වර්ගයේ වායු සමීකරණ පද්ධති, ශක්ති කාර්යක්ෂමතාව සහ ඔබගේ අවශ්‍යතාවන්ට ගැලපෙන නිවැරදි තේරීම කිරීමට උපදේශන.',
  '<h2>වායු සමීකරණය තෝරාගැනීමේ මූලික කරුණු</h2><p>ඔබගේ නිවස හෝ කාර්යාලය සඳහා නිවැරදි වායු සමීකරණ පද්ධතිය තෝරාගැනීම ඉතා වැදගත් තීරණයකි. මෙම තීරණය ගැනීමේදී සලකා බලා යුතු ප්‍රධාන කරුණු:</p><h3>වායු සමීකරණ වර්ග:</h3><ul><li><strong>Split AC:</strong> කාමර එකට එකක් ලෙස භාවිතා කරන්න පුළුවන්</li><li><strong>Window AC:</strong> කුඩා ප්‍රමාණයේ කාමර සඳහා සුදුසුයි</li><li><strong>Central AC:</strong> විශාල ගොඩනැගිලි සඳහා වඩාත් සුදුසුයි</li></ul><h3>ප්‍රමාණය තීරණය කිරීම:</h3><p>කාමරයේ වර්ගඵලය, උස, ජනෙල් ප්‍රමාණය සහ තාප ප්‍රභවයන් සලකා බලන්න.</p><h3>ශක්ති කාර්යක්ෂමතාව:</h3><p>BEE Star Rating සහ Energy Efficiency Ratio (EER) පරීක්ෂා කරන්න. 5 ස්ටාර් ඇති AC වඩාත් ශක්තිමත්ය.</p><h3>අයවැය සලකා බැලීම:</h3><p>මුල් මිල, ස්ථාපන වියදම, සහ මාසික විදුලි බිල සහ නඩත්තු වියදම් සලකා බලන්න.</p>',
  'src/assets/blog-ac-home.jpg',
  'December 15, 2024',
  'AC Selection',
  '5 min read'
);