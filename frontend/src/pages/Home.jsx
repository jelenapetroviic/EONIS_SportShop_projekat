import { useState } from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Create filters object for Products component
  const filters = selectedCategory === "All" ? {} : { categories: selectedCategory };

  return (
    <div>
      <Banner />
      <Category
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <Products filters={filters} />
    </div>
  );
};

export default Home;
