import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock } from "lucide-react";

interface BlogPostProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    category: string;
    readTime: string;
  };
  onBack: () => void;
}

const BlogPost = ({ post, onBack }: BlogPostProps) => {
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
                {post.readTime}
              </div>
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
      </div>
    </div>
  );
};

export default BlogPost;