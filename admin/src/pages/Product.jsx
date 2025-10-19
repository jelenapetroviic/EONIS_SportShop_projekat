import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      await userRequest.put(`/product/${id}`, { ...inputs });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 w-[60vw] bg-[#faf9f6] rounded-xl shadow-md mx-auto mt-5 ml-12">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 tracking-wide">
          Product
        </h3>
        <Link to="/newproduct">
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-md transition-all shadow-md">
            Create
          </button>
        </Link>
      </div>

      {/* PRODUCT PREVIEW */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={product.img}
          alt=""
          className="h-28 w-28 rounded-full object-cover border border-red-300 shadow-sm mb-4"
        />
        <span className="text-2xl font-semibold text-gray-800">
          {product.title || "Product name"}
        </span>
        <p className="text-gray-500 mt-2 text-center max-w-[480px] text-[15px]">
          {product.desc || "No description available for this product."}
        </p>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <form className="flex flex-col md:flex-row gap-5">
          {/* LEFT SIDE */}
          <div className="flex-1 space-y-4">
            {[
              { label: "Product Name", name: "title", type: "text", value: product.title },
              { label: "Product Description", name: "desc", type: "text", value: product.desc },
              { label: "Product Original Price", name: "originalPrice", type: "number", value: product.originalPrice },
              { label: "Product Discounted Price", name: "discountedPrice", type: "number", value: product.discountedPrice },
            ].map((field, index) => (
              <div key={index}>
                <label className="block mb-2 font-semibold text-gray-800 text-[15px]">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.value}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-red-400 focus:ring-red-300 focus:ring-1 outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block mb-2 font-semibold text-gray-800 text-[15px]">
                In Stock
              </label>
              <select
                name="inStock"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-red-400 focus:ring-red-300 focus:ring-1 outline-none"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={product.img}
                alt=""
                className="h-36 w-36 rounded-full object-cover border border-red-300 shadow-sm"
              />
              <label className="cursor-pointer mt-4">
                <FaUpload className="text-2xl text-gray-600 hover:text-red-500 transition-colors" />
              </label>

              <button
                type="button"
                onClick={handleUpdate}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md mt-4 shadow-md transition-all"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
