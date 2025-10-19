import { useLocation } from "react-router-dom";
import Products from "../components/Products";
import { useState } from "react";

const ProductList = () => {
  const location = useLocation();
  const query = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#ffffff] to-[#f0f4ff] p-8">
      {/* FILTER + SORT WRAPPER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6 mb-10 border border-gray-100">
        {/* LEFT */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-xl font-semibold text-gray-800 mr-4 mb-3 sm:mb-0">
            🏋️ Filter Products
          </span>

          <select
            name="concern"
            className="p-3 mb-3 sm:mb-0 sm:mr-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e84a4a] hover:border-[#e84a4a] transition-all duration-300"
            onChange={handleFilters}
          >
            <option value="">Select Concern</option>
            <option>Dry Skin</option>
            <option>Pigmentation</option>
            <option>Oil Control</option>
            <option>Anti Acne</option>
            <option>Sunburn</option>
            <option>Skin Brightening</option>
            <option>Tan Removal</option>
            <option>Night Routine</option>
            <option>UV Protection</option>
            <option>Damaged Hair</option>
            <option>Frizzy Hair</option>
            <option>Stretch Marks</option>
            <option>Color Protection</option>
            <option>Dry Hair</option>
            <option>Soothing</option>
            <option>Dandruff</option>
            <option>Greying</option>
            <option>Hairfall</option>
            <option>Hair Color</option>
            <option>Well Being</option>
            <option>Acne</option>
            <option>Hair Growth</option>
          </select>

          <select
            name="brand"
            className="p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e84a4a] hover:border-[#e84a4a] transition-all duration-300"
            onChange={handleFilters}
          >
            <option value="">Select Brand</option>
            <option>Garnier</option>
            <option>Kylie</option>
            <option>Kiss Beauty</option>
            <option>Dr Rashel</option>
            <option>Luron</option>
            <option>Nivea</option>
            <option>Heaven Dove</option>
            <option>Disaar</option>
            <option>Johnsons Baby</option>
            <option>Rexona</option>
          </select>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col sm:flex-row sm:items-center mt-4 md:mt-0">
          <span className="text-xl font-semibold text-gray-800 mr-4 mb-3 sm:mb-0">
            ⚡ Sort Products
          </span>

          <select
            name="price"
            onChange={(e) => setSort(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] hover:border-[#4a90e2] transition-all duration-300"
          >
            <option value="newest">Newest</option>
            <option value="asc">Price (Low → High)</option>
            <option value="desc">Price (High → Low)</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="max-w-7xl mx-auto">
        <Products query={query} filters={filters} sort={sort} />
      </div>
    </div>
  );
};

export default ProductList;
