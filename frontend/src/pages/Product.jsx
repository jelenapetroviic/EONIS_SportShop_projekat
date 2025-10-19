import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct } from "../redux/cartRedux";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Fetch product by ID
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

  // Price calculation (discounts, wholesale)
  const calculatePrice = (
    originalPrice,
    discountedPrice,
    wholesalePrice,
    wholesaleMinQty,
    qty
  ) => {
    if (qty > wholesaleMinQty && wholesalePrice) return wholesalePrice;
    else if (discountedPrice) return discountedPrice;
    else return originalPrice;
  };

  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      const newPrice = calculatePrice(
        product.originalPrice,
        product.discountedPrice,
        product.wholesalePrice,
        product.wholesaleMinimumQuantity || 0,
        quantity
      );
      setPrice(newPrice);
    }
  }, [product, quantity]);

  const handleQuantity = (action) => {
    if (action === "dec") setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
    else if (action === "inc") setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        ...product,
        quantity,
        price,
        email: "jelenapetrovic@gmail.com",
      })
    );
    toast.success("✅ Product added to basket!", {
      position: "top-right",
      autoClose: 4000,
    });
    console.log(cart);
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] flex justify-center items-center p-6">
      <ToastContainer />

      {/* Product Container */}
      <div className="flex flex-col lg:flex-row bg-white rounded-3xl w-full max-w-5xl overflow-hidden border-2 border-[#d62828] shadow-[0_0_18px_rgba(214,40,40,0.25)] hover:shadow-[0_0_25px_rgba(214,40,40,0.4)] transition-all duration-300">
        
        {/* LEFT - IMAGE */}
        <div className="flex-1 flex justify-center items-center bg-[#fff9f9] p-6 border-b lg:border-b-0 lg:border-r border-[#f2c2c2]">
          <img
            src={product.img}
            alt={product.title}
            className="max-h-[320px] w-auto object-contain rounded-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* RIGHT - DETAILS */}
        <div className="flex-1 flex flex-col justify-between p-7">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-3">
              {product.title}
            </h2>

            <p className="text-gray-600 text-[15px] mb-5 leading-relaxed">
              {product.desc}
            </p>

            <h2 className="text-xl font-bold text-[#d62828] mb-5">
              ${Number.isInteger(price * quantity)
                ? price * quantity
                : (price * quantity).toFixed(2)}
              <span className="text-gray-500 text-[14px] ml-2">
                ({quantity} × $
                {Number.isInteger(price) ? price : price.toFixed(2)})
              </span>
            </h2>

            <div className="flex items-center mb-4">
              <ReactStars
                count={5}
                value={product.rating || 4}
                size={22}
                color2={"#ffd700"}
                edit={false}
              />
              <span className="ml-2 text-gray-700 text-[14px]">
                (24 reviews)
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center my-5">
              <FaMinus
                className="bg-[#d62828] text-white cursor-pointer p-2 rounded-full text-xl shadow-sm hover:bg-[#b91d1d] transition"
                onClick={() => handleQuantity("dec")}
              />
              <span className="text-lg font-semibold mx-4">{quantity}</span>
              <FaPlus
                className="bg-[#d62828] text-white cursor-pointer p-2 rounded-full text-xl shadow-sm hover:bg-[#b91d1d] transition"
                onClick={() => handleQuantity("inc")}
              />
            </div>

            {/* Add to Cart Button */}
            <button
              className="bg-[#d62828] hover:bg-[#b91d1d] transition-all duration-300 text-white py-2.5 px-8 rounded-full shadow-md font-semibold tracking-wide w-fit"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            {/* Wholesale Info */}
            {product.wholesalePrice && (
              <div className="mt-5 bg-[#fff1f1] border border-[#f1b1b1] text-[#d62828] px-3 py-2 rounded-xl font-medium shadow-sm text-sm">
                Wholesale: ${product.wholesalePrice} for{" "}
                {product.wholesaleMinimumQuantity}+ items
              </div>
            )}
          </div>

          {/* Box Info */}
          <div className="mt-6 bg-[#fff9f9] border border-[#f3d1d1] rounded-2xl p-3 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-[#1e1e1e] mb-1 text-md text-center uppercase">
              What's in the Box
            </h3>
            <hr className="border-[#f5c2c2] mb-2" />
            <p className="text-gray-700 text-center text-sm">
              {product.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
