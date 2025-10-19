import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { userRequest } from "../requestMethods";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputs, setInputs] = useState({});
  const [uploading, setUploading] = useState("Uploading is 0%");
  const [selectedOptions, setSelectedOptions] = useState({
    categories: [],
  });

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: [...prev[name], value],
    }));
  };

  const handleRemoveOption = (name, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: prev[name].filter((options) => options !== value),
    }));
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpload = async(e) =>{
    e.preventDefault();
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "uploads");

    setUploading("Uploading ...")
    try {

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/datjymz90/image/upload",
        data,
      );

      const {url} = uploadRes.data;

      setUploading("Uploaded 100%")
      await userRequest.post("/products", {img: url, ...inputs, ...selectedOptions})

      // Navigate to products page after successful creation
      navigate("/products");
    } catch (error) {
      console.log(error);
      setUploading("Uploading failed")
    }

  }
  return (
    <div className="flex justify-center mt-10 mb-10 ml-14">
      <div className="bg-white w-[80vw] max-w-[1200px] p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Add New Product
        </h1>

        <form
          className="flex flex-col lg:flex-row gap-10"
          onSubmit={handleUpload}
        >
          {/* LEFT SIDE */}
          <div className="flex-1 space-y-6">
            {/* Image */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Product Image
              </label>

              {!selectedImage ? (
                <div className="border-2 border-dashed border-gray-400 h-[120px] w-[120px] rounded-lg flex items-center justify-center hover:border-gray-600 transition-all cursor-pointer">
                  <label htmlFor="file">
                    <FaPlus className="text-gray-500 text-[24px]" />
                  </label>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt=""
                  className="h-[120px] w-[120px] object-cover rounded-lg border border-gray-300"
                />
              )}

              <input
                type="file"
                id="file"
                onChange={imageChange}
                style={{ display: "none" }}
              />
              <span className="block mt-2 text-sm text-green-600">
                {uploading}
              </span>
            </div>

            {/* Basic Info */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Description
              </label>
              <textarea
                name="desc"
                rows={6}
                onChange={handleChange}
                placeholder="Enter product description..."
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Original Price
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  onChange={handleChange}
                  placeholder="$100"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-400"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Discounted Price
                </label>
                <input
                  type="number"
                  name="discountedPrice"
                  onChange={handleChange}
                  placeholder="$80"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                onChange={handleChange}
                placeholder="Available quantity"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-400"
              />
            </div>


            {/* Category */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Category
              </label>
              <select
                name="categories"
                onChange={handleSelectChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-gray-400"
              >
                <option>Select Category</option>
                <option>Clothing</option>
                <option>Footwear</option>
                <option>Backpacks</option>
                <option>Accessories</option>
              </select>

              {selectedOptions.categories.map((option) => (
                <div
                  key={option}
                  className="flex items-center mt-1 space-x-2 text-sm"
                >
                  <span>{option}</span>
                  <FaTrash
                    className="cursor-pointer text-red-500"
                    onClick={() => handleRemoveOption("categories", option)}
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white py-2 px-6 rounded-lg font-semibold transition-all w-full"
              >
                Create Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
