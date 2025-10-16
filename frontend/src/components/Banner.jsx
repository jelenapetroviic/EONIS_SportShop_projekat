import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Banner = () => {
  const [banner, setBanner] = useState({});

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

  console.log(banner);

  if (!banner) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`relative bg-[url(--banner.img)] bg-no-repeat bg-cover h-[80vh] px-[200px]`}
      style={{backgroundImage: `url(${banner.img})`}}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative flex flex-col text-white w-[50%] pt-[10%]">
        <span className="text-[30px] mt-3">
          {banner.subtitle}
          <h1 className="text-3x1 mt-3">{banner.title}</h1>
          
          <div className="flex items-center mt-[20px] space-x-8">
            <button className="bg-[#e48bcd] py-[16px] px-[55px] w-[250px] text-[19px] text-white cursor-pointer hover:bg-[#d06eb8] transition-all duration-300 shadow-md">
              Shop Now
            </button>
            <button className="bg-gray-600 py-[16px] px-[55px] w-[280px] text-[19px] text-white cursor-pointer hover:bg-gray-500 transition-all duration-300 shadow-md">
              CALL: (176) 678 890
            </button>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Banner;
