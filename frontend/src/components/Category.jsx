import PropTypes from "prop-types";

const Category = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    "All",
    "Clothing",
    "Footwear",
    "Backpacks",
    "Accessories",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 px-6 py-10 bg-gradient-to-br from-gray-50 to-white">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 ${
            selectedCategory === category
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-white text-gray-800 border-2 border-gray-200 hover:border-red-600 hover:text-red-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

Category.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default Category;
