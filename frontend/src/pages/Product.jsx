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
  const [selectedSize, setSelectedSize] = useState("");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

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

  const handleAddToCart = async () => {
    // Check if user is admin
    if (user.currentUser?.role === "admin") {
      toast.error("❌ Admin users cannot add products to cart!", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    // Check if product is in stock
    if (!product.inStock || product.stock === 0) {
      toast.error("❌ Product is out of stock!", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    // Check if size is selected for Clothing category
    if (product.categories && product.categories.includes("Clothing") && !selectedSize) {
      toast.error("❌ Please select a size!", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    // Check if requested quantity is available
    if (product.stock < quantity) {
      toast.error(`❌ Only ${product.stock} items available in stock!`, {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    try {
      // Decrease stock on backend
      await userRequest.post("/products/decrease-stock", {
        productId: product._id,
        quantity: quantity,
      });

      // Add to cart
      dispatch(
        addProduct({
          ...product,
          quantity,
          price,
          size: selectedSize || null,
          email: "jelenapetrovic@gmail.com",
        })
      );

      toast.success("✅ Product added to basket!", {
        position: "top-right",
        autoClose: 4000,
      });

      // Refresh product data to get updated stock
      const res = await userRequest.get("/products/find/" + id);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
      toast.error(
        `❌ ${error.response?.data?.message || "Failed to add product to cart"}`,
        {
          position: "top-right",
          autoClose: 4000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex justify-center items-center p-8">
      <ToastContainer />

      {/* Product Container */}
      <div className="flex flex-col lg:flex-row bg-white rounded-3xl w-full max-w-6xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500">

        {/* LEFT - IMAGE */}
        <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-gray-50 to-red-50 p-10 relative">
          <div className="absolute inset-0 bg-white/50"></div>
          <img
            src={product.img}
            alt={product.title}
            className="relative z-10 max-h-[400px] w-auto object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        {/* RIGHT - DETAILS */}
        <div className="flex-1 flex flex-col justify-between p-10 lg:p-12">
          <div className="space-y-6">
            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed">
              {product.desc}
            </p>

            {/* Rating & Stock */}
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full">
                <ReactStars
                  count={5}
                  value={product.rating || 4}
                  size={24}
                  color2={"#fbbf24"}
                  edit={false}
                />
                <span className="text-gray-600 text-sm font-medium">
                  (24 reviews)
                </span>
              </div>

              {/* Stock Status */}
              <div className={`px-4 py-2 rounded-full font-semibold text-sm ${
                product.inStock && product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {product.inStock && product.stock > 0
                  ? `In Stock: ${product.stock} available`
                  : "Out of Stock"}
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-5 rounded-2xl border-l-4 border-red-600">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-red-600">
                  ${Number.isInteger(price * quantity)
                    ? price * quantity
                    : (price * quantity).toFixed(2)}
                </span>
                <span className="text-gray-500 text-base">
                  ({quantity} × ${Number.isInteger(price) ? price : price.toFixed(2)})
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-5">
              <span className="text-gray-700 font-semibold text-lg">Quantity:</span>
              <div className="flex items-center gap-4 bg-gray-100 px-6 py-3 rounded-full">
                <FaMinus
                  className="bg-red-600 text-white cursor-pointer p-2.5 rounded-full text-2xl shadow-lg hover:bg-red-700 hover:scale-110 active:scale-95 transition-all"
                  onClick={() => handleQuantity("dec")}
                />
                <span className="text-2xl font-bold text-gray-900 min-w-[40px] text-center">
                  {quantity}
                </span>
                <FaPlus
                  className="bg-red-600 text-white cursor-pointer p-2.5 rounded-full text-2xl shadow-lg hover:bg-red-700 hover:scale-110 active:scale-95 transition-all"
                  onClick={() => handleQuantity("inc")}
                />
              </div>
            </div>

            {/* Size Selector - Only for Clothing */}
            {product.categories && product.categories.includes("Clothing") && (
              <div className="flex items-center gap-5">
                <span className="text-gray-700 font-semibold text-lg">Size:</span>
                <div className="flex items-center gap-3">
                  {["S", "M", "L"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 ${
                        selectedSize === size
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-800 border-2 border-gray-200 hover:border-red-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              className={`py-4 px-10 rounded-full shadow-xl font-bold text-lg tracking-wide transition-all duration-300 w-full lg:w-auto ${
                !product.inStock || product.stock === 0 || user.currentUser?.role === "admin"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transform hover:scale-105 active:scale-95"
              }`}
              onClick={handleAddToCart}
              disabled={!product.inStock || product.stock === 0 || user.currentUser?.role === "admin"}
            >
              {user.currentUser?.role === "admin"
                ? "Admin Cannot Order"
                : !product.inStock || product.stock === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
