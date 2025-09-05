import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, MessageCircle, Youtube, Facebook, Twitter } from "lucide-react";

const Contact = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/94711597373", "_blank");
  };

  const handleLocationClick = () => {
    window.open("https://maps.app.goo.gl/814t8NRZodujZfcK6", "_blank");
  };

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            අප හා සම්බන්ධ වන්න
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AC සහ Refrigeration සේවා සඳහා අප හා සම්බන්ධ වන්න. 24/7 සේවාවක් ලබා දෙන්නෙමු.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">අමතන්න</h3>
              <p className="text-muted-foreground mb-4">ඕනෑම වේලාවක අමතන්න</p>
              <a href="tel:0711597373" className="text-primary font-medium hover:underline">
                071 159 7373
              </a>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ස්ථානය</h3>
              <p className="text-muted-foreground mb-4">අපගේ කාර්යාලය</p>
              <button 
                onClick={handleLocationClick}
                className="text-primary font-medium hover:underline"
              >
                F31, Kannaththota, Ruwanwella
              </button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">ක්ෂණික පණිවිඩයක්</p>
              <Button onClick={handleWhatsAppClick} className="w-full">
                WhatsApp එකෙන් පණිවිඩයක්
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">අප හා සම්බන්ධ වන්න</h3>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("https://wa.me/94711597373", "_blank")}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("https://youtube.com/@mist-auto-ac?si=hr362_VIOgK1d8u5", "_blank")}
              className="flex items-center gap-2"
            >
              <Youtube className="w-5 h-5" />
              YouTube
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("https://www.facebook.com/Aselasenarath20", "_blank")}
              className="flex items-center gap-2"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("https://x.com/MistAuto89473", "_blank")}
              className="flex items-center gap-2"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;