import ReactStars from "react-stars";
import PropTypes from "prop-types";

const Product = ({ img, title, originalPrice, discountedPrice }) => {
  // Show discounted price if available, otherwise show original price
  const displayPrice = discountedPrice || originalPrice;
  const hasDiscount = discountedPrice && discountedPrice < originalPrice;

  return (
    <div className="group flex flex-col items-center justify-between h-[480px] w-[320px] m-[12px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 hover:border-red-600/40">
      {/* Slika proizvoda */}
      <div className="w-full h-[340px] overflow-hidden rounded-t-2xl relative">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Blagi overlay pri hoveru */}
        <div className="absolute inset-0 bg-black/4 group-hover:bg-black/15 transition-all duration-500"></div>
      </div>

      {/* Donji deo sa tekstom */}
      <div className="flex flex-col items-center py-4 px-3 w-full text-center">
        <h2 className="font-semibold text-[18px] text-gray-800 truncate w-[90%] group-hover:text-red-700 transition-colors duration-300">
          {title}
        </h2>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-[20px] font-bold text-red-600">${displayPrice}</span>
          {hasDiscount && (
            <span className="text-[16px] text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        <div className="flex items-center justify-center mt-2">
          <ReactStars
            count={5}
            value={4.2}
            size={22}
            color2={"#FFD700"}
            edit={false}
          />
        </div>

        {/* Dugme “View Details” pri hoveru */}
        <button className="opacity-0 group-hover:opacity-100 mt-4 bg-red-600 text-white py-2 px-6 rounded-full text-sm font-medium tracking-wide shadow-md hover:bg-red-700 transition-all duration-500">
          View Details
        </button>
      </div>
    </div>
  );
};

Product.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  originalPrice: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number,
};

export default Product;
