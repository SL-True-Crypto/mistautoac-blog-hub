import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogPost from "./BlogPost";
import { supabase, BlogPost as BlogPostType } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import blogAcHome from "@/assets/blog-ac-home.jpg";
import blogCarAc from "@/assets/blog-car-ac.jpg";
import blogMaintenance from "@/assets/blog-maintenance.jpg";
import blogRefrigerator from "@/assets/blog-refrigerator.jpg";
import blogEnergySaving from "@/assets/blog-energy-saving.jpg";

const BlogGrid = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fallback posts for when database is not available
  const fallbackPosts = [
    {
      id: 1,
      title: "ඔබගේ නිවසට සේවා ස්ථානයට සුදුසු වායු සමීකරණය තෝරාගන්නේ කෙසේද?",
      excerpt: "විවිධ වර්ගයේ වායු සමීකරණ පද්ධති, ශක්ති කාර්යක්ෂමතාව සහ ඔබගේ අවශ්‍යතාවන්ට ගැලපෙන නිවැරදි තේරීම කිරීමට උපදේශන.",
      content: `
        <h2>වායු සමීකරණය තෝරාගැනීමේ මූලික කරුණු</h2>
        <p>ඔබගේ නිවස හෝ කාර්යාලය සඳහා නිවැරදි වායු සමීකරණ පද්ධතිය තෝරාගැනීම ඉතා වැදගත් තීරණයකි. මෙම තීරණය ගැනීමේදී සලකා බලා යුතු ප්‍රධාන කරුණු:</p>
        
        <h3>වායු සමීකරණ වර්ග:</h3>
        <ul>
          <li><strong>Split AC:</strong> කාමර එකට එකක් ලෙස භාවිතා කරන්න පුළුවන්</li>
          <li><strong>Window AC:</strong> කුඩා ප්‍රමාණයේ කාමර සඳහා සුදුසුයි</li>
          <li><strong>Central AC:</strong> විශාල ගොඩනැගිලි සඳහා වඩාත් සුදුසුයි</li>
        </ul>
        
        <h3>ප්‍රමාණය තීරණය කිරීම:</h3>
        <p>කාමරයේ වර්ගඵලය, උස, ජනෙල් ප්‍රමාණය සහ තාප ප්‍රභවයන් සලකා බලන්න.</p>
        
        <h3>ශක්ති කාර්යක්ෂමතාව:</h3>
        <p>BEE Star Rating සහ Energy Efficiency Ratio (EER) පරීක්ෂා කරන්න. 5 ස්ටාර් ඇති AC වඩාත් ශක්තිමත්ය.</p>
        
        <h3>අයවැය සලකා බැලීම:</h3>
        <p>මුල් මිල, ස්ථාපන වියදම, සහ මාසික විදුලි බිල සහ නඩත්තු වියදම් සලකා බලන්න.</p>
      `,
      image: blogAcHome,
      date: "December 15, 2024",
      category: "AC Selection",
      readTime: "5 min read",
      read_time: "5 min read",
      views: 0,
      created_at: "",
      updated_at: ""
    },
    {
      id: 2,
      title: "Hybrid Electric Car භාවිතා කරන ඔබ AC පද්ධතිය පිළිබඳ දැනුවත් විය යුතු මූලික කරුණු",
      excerpt: "하이브리드් සහ විදුලි මෝටර් රථවල වායු සමීකරණ පද්ධතිවල විශේෂත්වයන්, නඩත්තුව සහ සාමාන්‍ය ගැටළු පිළිබඳ විස්තර.",
      content: `
        <h2>Hybrid සහ Electric Vehicle AC පද්ධති</h2>
        <p>Hybrid සහ electric vehicle වල AC පද්ධති සාම්ප්‍රදායික වාහනවලට වඩා වෙනස්ය. මෙහි ප්‍රධාන විශේෂතා:</p>
        
        <h3>Electric Compressor:</h3>
        <p>Engine belt drive කරන compressor වෙනුවට electric compressor භාවිතා කරනවා. මෙය battery power භාවිතා කරනවා.</p>
        
        <h3>Dual Zone Climate Control:</h3>
        <p>Driver සහ passenger සඳහා වෙනම temperature control කරන්න පුළුවන්.</p>
        
        <h3>Pre-conditioning:</h3>
        <p>Vehicle එක charge වෙන අතරම AC operate කරන්න පුළුවන්. මෙමගින් battery range save කර ගන්න පුළුවන්.</p>
        
        <h3>නඩත්තුව:</h3>
        <ul>
          <li>Cabin air filter නිතර හැරවීම</li>
          <li>Coolant level check කිරීම</li>
          <li>Electric connections inspect කිරීම</li>
          <li>Software updates install කිරීම</li>
        </ul>
        
        <h3>සාමාන්‍ය ගැටළු:</h3>
        <p>Battery drain, compressor failure, software glitches වැනි ගැටළු ඇති විය හැක. Professional technician කෙනෙකුගෙන් service කර ගන්න.</p>
      `,
      image: blogCarAc,
      date: "December 12, 2024",
      category: "Automotive AC",
      readTime: "4 min read",
      read_time: "4 min read",
      views: 0,
      created_at: "",
      updated_at: ""
    },
    {
      id: 3,
      title: "නිවසේ හෝ කාර්යාලයේ ඇති ඔබගේ වායු සමීකරණය නඩත්තුව පිළිබඳ ඔබ දැනුවත් විය යුතු කරුණු",
      excerpt: "නිත්‍ය නඩත්තු කටයුතු, වෘත්තීය සේවාවන්හි ප්‍රයෝජන සහ වියදම් අඩු කර ගැනීමට නඩත්තුවේ වැදගත්කම.",
      content: `
        <h2>AC නඩත්තුවේ වැදගත්කම</h2>
        <p>නිවැරදි නඩත්තුව මගින් ඔබගේ AC එකේ ආයු කාලය වැඩි කර, ශක්ති පරිභෝජනය අඩු කර, හොඳ cooling performance ලබා ගන්න පුළුවන්.</p>
        
        <h3>මාසික නඩත්තුව:</h3>
        <ul>
          <li><strong>Air Filter:</strong> මාසයකට වරක් පිරිසිදු කරන්න හෝ හරවන්න</li>
          <li><strong>Coil Cleaning:</strong> Indoor සහ outdoor coils පිරිසිදු කරන්න</li>
          <li><strong>Drain Check:</strong> Condensate drain වල block වීම් check කරන්න</li>
        </ul>
        
        <h3>කාර්තුමය නඩත්තුව:</h3>
        <ul>
          <li>Thermostat calibration</li>
          <li>Electrical connections inspect කිරීම</li>
          <li>Refrigerant level check කිරීම</li>
          <li>Fan motor lubrication</li>
        </ul>
        
        <h3>වාර්ෂික Professional Service:</h3>
        <p>Technical expert කෙනෙකුගෙන් comprehensive service එකක් කර ගන්න. මෙහිදී:</p>
        <ul>
          <li>System pressure test</li>
          <li>Compressor performance check</li>
          <li>Ductwork inspection</li>
          <li>Overall system optimization</li>
        </ul>
        
        <h3>නඩත්තුවේ ප්‍රයෝජන:</h3>
        <p>30% දක්වා විදුලි බිල අඩු කර ගන්න පුළුවන්, AC එකේ ආයු කාලය 50% දක්වා වැඩි කර ගන්න පුළුවන්.</p>
      `,
      image: blogMaintenance,
      date: "December 10, 2024",
      category: "Maintenance",
      readTime: "6 min read",
      read_time: "6 min read",
      views: 0,
      created_at: "",
      updated_at: ""
    }
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // If no posts in database, use fallback data
        setPosts(fallbackPosts);
        console.log('Using fallback posts');
      } else if (data && data.length > 0) {
        setPosts(data);
      } else {
        setPosts(fallbackPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts(fallbackPosts);
      toast({
        title: "Using offline posts",
        description: "Could not connect to database, showing cached content.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (selectedPost) {
    return <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/admin'}
            className="mb-4"
          >
            Admin Panel
          </Button>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert advice and insights on air conditioning, refrigeration, and energy efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card 
              key={post.id} 
              className="group cursor-pointer bg-gradient-card border-border hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <span>{post.read_time || post.readTime}</span>
                  {post.views !== undefined && (
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;