import { Button } from "@/components/ui/button";

const Contact = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/94711597373", "_blank");
  };

  return (
    <section className="py-12 md:py-18 bg-gray-600 text-white" style={{backgroundImage: "url('./contakbrac.png')"}}>
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          අප සමග සම්බන්ධ වන්න!
        </h2>
        <p className="max-w-2xl mx-auto mb-8">
          ඔබගේ Auto A/C සේවාව සඳහා කලින්ම වේලාවක් වෙන් කරවාගෙන, අනවශ්‍ය රස්තියාදුවකින් තොරව කාර්යක්ෂම සේවාවක් ලබා ගන්න. අපගේ සේවාවන් පිළිබඳ වැඩි විස්තර, පාරිභෝගික අත්දැකීම් සහ නවතම වැඩකටයුතු දැක බලා ගැනීමට පහතින් ඇති අපගේ සමාජ මාධ්‍ය අනුගමනය කරන්න (Follow කරන්න).
        </p>
        
        <Button 
          onClick={handleWhatsAppClick}
          className="inline-block bg-white text-blue-800 font-bold text-lg py-3 px-8 rounded-md hover:bg-gray-200 transition-colors mb-8"
        >
          Schedule An Appointment
        </Button>
        
        <div className="flex justify-center items-center flex-wrap gap-4">
          <a href="tel:0711597373" className="flex items-center justify-center w-14 h-14 bg-sky-500 rounded-full hover:bg-sky-600" title="Call 0711597373">
            <i className="fas fa-phone-alt text-2xl"></i>
          </a>
          <a href="https://wa.me/94711597373" target="_blank" className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full hover:bg-green-600" title="WhatsApp">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-12 h-12" />
          </a>
          <a href="https://youtube.com/@mist-auto-ac?si=hr362_VIOgK1d8u5" target="_blank" className="flex items-center justify-center w-14 h-14 bg-red-600 rounded-full hover:bg-red-700" title="YouTube Channel">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" className="w-10 h-10" />
          </a>
          <a href="https://www.facebook.com/Aselasenarath20" target="_blank" className="flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full hover:bg-blue-700" title="Facebook Page">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-10 h-10" />
          </a>
          <a href="https://x.com/MistAuto89473" target="_blank" className="flex items-center justify-center w-14 h-14 bg-gray-800 rounded-full hover:bg-gray-700" title="X (Twitter)">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" alt="X" className="w-7 h-7" />
          </a>
          <a href="https://maps.app.goo.gl/814t8NRZodujZfcK6" target="_blank" className="flex items-center justify-center w-14 h-14 bg-white rounded-full hover:bg-gray-200" title="Google Maps Location">
            <i className="fas fa-map-marker-alt text-2xl text-red-500"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;