const Category = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 px-6 py-10 bg-white">
      {[
        { title: "Serums", img: "/serum.jpg" },
        { title: "Toners", img: "/serum1.jpg" },
        { title: "Lotions", img: "/lotion.jpg" },
        { title: "Foundation", img: "/foundation.jpg" },
      ].map((item, i) => (
        <div
          key={i}
          className="relative h-[500px] w-[380px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-500"
        >
          {/* Slika */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${item.img})` }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-red-800/70 transition-all duration-500"></div>

          {/* Tekst */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-md group-hover:scale-105 transition-transform duration-300">
              {item.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
