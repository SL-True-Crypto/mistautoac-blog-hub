import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import blogAcHome from "@/assets/blog-ac-home.jpg";
import blogCarAc from "@/assets/blog-car-ac.jpg";
import blogMaintenance from "@/assets/blog-maintenance.jpg";
import blogRefrigerator from "@/assets/blog-refrigerator.jpg";
import blogEnergySaving from "@/assets/blog-energy-saving.jpg";

const blogPosts = [
  {
    id: 1,
    title: "ඔබගේ නිවසට සේවා ස්ථානයට සුදුසු වායු සමීකරණය තෝරාගන්නේ කෙසේද?",
    excerpt: "විවිධ වර්ගයේ වායු සමීකරණ පද්ධති, ශක්ති කාර්යක්ෂමතාව සහ ඔබගේ අවශ්‍යතාවන්ට ගැලපෙන නිවැරදි තේරීම කිරීමට උපදේශන.",
    image: blogAcHome,
    date: "December 15, 2024",
    category: "AC Selection",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Hybrid Electric Car භාවිතා කරන ඔබ AC පද්ධතිය පිළිබඳ දැනුවත් විය යුතු මූලික කරුණු",
    excerpt: "하이브리드් සහ විදුලි මෝටර් රථවල වායු සමීකරණ පද්ධතිවල විශේෂත්වයන්, නඩත්තුව සහ සාමාන්‍ය ගැටළු පිළිබඳ විස්තර.",
    image: blogCarAc,
    date: "December 12, 2024",
    category: "Automotive AC",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "නිවසේ හෝ කාර්යාලයේ ඇති ඔබගේ වායු සමීකරණය නඩත්තුව පිළිබඳ ඔබ දැනුවත් විය යුතු කරුණු",
    excerpt: "නිත්‍ය නඩත්තු කටයුතු, වෘත්තීය සේවාවන්හි ප්‍රයෝජන සහ වියදම් අඩු කර ගැනීමට නඩත්තුවේ වැදගත්කම.",
    image: blogMaintenance,
    date: "December 10, 2024",
    category: "Maintenance",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "ඔබගේ ශීතකරණයේ දෝෂ ඇතිවීම වලක්වා ගැනීමට ඔබට කළ හැකි කාරයන්",
    excerpt: "ශීතකරණය නිවැරදිව භාවිතා කිරීම, සාමාන්‍ය ගැටළු වැළැක්වීම සහ උපකරණයේ ආයු කාලය වැඩි කිරීමේ ක්‍රම.",
    image: blogRefrigerator,
    date: "December 8, 2024",
    category: "Refrigeration",
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "වායුසමීකරණ හා ශීතකරණ සඳහා වැඩි විදුලි පරිභෝජනය අවම කර ගැනීමට ඔබට ගත හැකි ක්‍රියාමාර්ග",
    excerpt: "ශක්ති ඉතිරිකිරීමේ උපාය මාර්ග, smart thermostat භාවිතය සහ විදුලි බිල අඩු කර ගැනීමේ ක්‍රමවේද.",
    image: blogEnergySaving,
    date: "December 5, 2024",
    category: "Energy Efficiency",
    readTime: "5 min read"
  }
];

const BlogGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert advice and insights on air conditioning, refrigeration, and energy efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group cursor-pointer bg-gradient-card border-border hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
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
                  <span>{post.readTime}</span>
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