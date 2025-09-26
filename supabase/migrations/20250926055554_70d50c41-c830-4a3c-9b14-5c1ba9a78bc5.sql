-- Update function to fix search path security issue
CREATE OR REPLACE FUNCTION increment_post_views(post_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts 
  SET views = views + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;