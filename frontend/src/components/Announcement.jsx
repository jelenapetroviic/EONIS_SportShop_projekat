import { Typewriter } from "react-simple-typewriter";

const Announcement = () => {
  return (
    <div className="flex items-center justify-center h-[40px] 
    bg-gradient-to-r from-[#c084fc] via-[#e879f9] to-[#f472b6] 
    text-white text-[17px] font-semibold tracking-wide shadow-md animate-pulse-slow">
      <Typewriter
        words={[
          "✨ Beauty Bliss ✨",
          "New Arrivals Just Landed 💅",
          "Everything on Sale – 20% OFF 🛍️",
        ]}
        loop={5}
        cursor
        cursorStyle="|"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </div>
  );
};

export default Announcement;
