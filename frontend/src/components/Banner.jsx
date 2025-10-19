import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Banner = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchRandomBanner = async () => {
      try {
        const res = await userRequest.get("/banners/random");
        setBanner(res.data);
      } catch (error) {
        console.log("Failed to fetch random banner", error);
      }
    };

    fetchRandomBanner();
  }, []);

  if (!banner) {
    return <div className="text-center py-16 text-gray-500">Loading...</div>;
  }

  return (
    <div
      className="relative h-[70vh] flex items-center justify-start overflow-hidden rounded-2xl mx-6 mt-6"
      style={{
        backgroundImage: `url(${banner.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Tamni overlay sa blagim gradijentom */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent rounded-2xl"></div>

      {/* Tekst i dugmad */}
      <div className="relative z-10 max-w-xl text-white px-12">
        <p className="uppercase tracking-widest text-red-400 text-sm mb-2">
          {banner.subtitle}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight drop-shadow-md">
          {banner.title}
        </h1>

        <div className="flex flex-wrap gap-4 mt-6">
          <button className="bg-gradient-to-r from-red-600 to-black py-3 px-8 rounded-full text-[17px] font-semibold shadow-lg hover:scale-105 transition-transform duration-300 hover:from-red-700 hover:to-gray-900">
            Shop Now
          </button>
          <button className="border border-white py-3 px-8 rounded-full text-[17px] font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            CALL: (176) 678 890
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
