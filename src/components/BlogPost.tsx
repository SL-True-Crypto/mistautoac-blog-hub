import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock, Eye } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import CommentSection from "./CommentSection";

interface BlogPostProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    category: string;
    readTime?: string;
    read_time?: string;
    views?: number;
  };
  onBack: () => void;
}

const BlogPost = ({ post, onBack }: BlogPostProps) => {
  useEffect(() => {
    // Track view
    const trackView = async () => {
      try {
        // Get user's IP (simplified approach)
        const response = await fetch('https://api.ipify.org?format=json');
        const { ip } = await response.json();
        
        // Check if this IP already viewed this post today
        const today = new Date().toDateString();
        const { data: existingView } = await supabase
          .from('post_views')
          .select('id')
          .eq('post_id', post.id)
          .eq('ip_address', ip)
          .gte('created_at', new Date(today).toISOString())
          .single();

        if (!existingView) {
          // Add new view
          await supabase
            .from('post_views')
            .insert([{ post_id: post.id, ip_address: ip }]);

          // Update post views count
          await supabase.rpc('increment_post_views', { post_id: post.id });
        }
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    };

    trackView();
  }, [post.id]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <Card className="bg-gradient-card border-border">
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover rounded-t-lg"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                {post.category}
              </Badge>
            </div>
          </div>
          
          <CardHeader>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime || post.read_time}
              </div>
              {post.views !== undefined && (
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views} views
                </div>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {post.title}
            </h1>
          </CardHeader>
          
          <CardContent>
            <div className="prose prose-lg max-w-none text-foreground">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </CardContent>
        </Card>

        <CommentSection postId={post.id} />
      </div>
    </div>
  );
};

export default BlogPost;