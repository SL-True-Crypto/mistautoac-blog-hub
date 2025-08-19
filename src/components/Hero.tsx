import heroImage from "@/assets/hero-blog.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern air conditioning and refrigeration services"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Mistautoac Blog
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-primary-foreground/90 mb-8">
            මගේ බ්ලොග්
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Expert insights and tips on air conditioning, refrigeration, and HVAC maintenance. 
            Stay updated with the latest in cooling technology and energy efficiency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;