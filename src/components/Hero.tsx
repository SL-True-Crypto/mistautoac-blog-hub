import heroImage from "@/assets/hero-blog.jpg";

const Hero = () => {
  return (
    <section className="hero-bg text-white h-[60vh] min-h-[400px] flex items-center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url(${heroImage})`}}>
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 uppercase text-[#e9e9ff] shizuru-regular">
          Mist Auto Mobile Air Conditioning
        </h1>
        <p className="text-lg md:text-xl max-w-3xl">
          Servicing Electric, Hybrid, Petrol, Diesel & Heavy-Duty Vehicles. All work performed by qualified, experienced technicians.
        </p>
      </div>
    </section>
  );
};

export default Hero;