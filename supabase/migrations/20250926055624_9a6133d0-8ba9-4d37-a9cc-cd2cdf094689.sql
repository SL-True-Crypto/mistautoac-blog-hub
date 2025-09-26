-- Secure function by setting search_path
CREATE OR REPLACE FUNCTION public.increment_post_views(post_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE public.blog_posts 
  SET views = views + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SET search_path = public;