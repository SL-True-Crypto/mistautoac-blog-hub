import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogGrid from "@/components/BlogGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <BlogGrid />
      <Footer />
    </div>
  );
};

export default Index;