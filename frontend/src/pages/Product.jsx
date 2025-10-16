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

  const calculatePrice = (
    originalPrice,
    discountedPrice,
    wholesalePrice,
    wholesaleMinQty,
    qty
  ) => {
    if (qty > wholesaleMinQty && wholesalePrice) {
      return wholesalePrice;
    } else if (discountedPrice) {
      return discountedPrice;
    } else {
      return originalPrice;
    }
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
    if (action === "dec") {
      setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
    } else if (action === "inc") {
      setQuantity((prev) => prev + 1);
    }
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
    toast.success("Product has been added to basket successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    console.log(cart)
  };

  return (
    <div className="h-auto flex justify-stretch p-[30px]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* LEFT */}
      <div className="flex-1 h-[500px] w-[600px]">
        <img
          src={product.img}
          alt=""
          className="h-[100%] w-[100%] object-cover"
        />
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 flex-col ml-10">
        <h2 className="text-[25px] font-semibold mb-[20px]">{product.title}</h2>

        <span>{product.desc}</span>

        <h2 className="font-semibold mt-2 text-[20px]">
          ${" "}
          {Number.isInteger(price * quantity)
            ? price * quantity
            : (price * quantity).toFixed(2)}{" "}
          <span className="text-gray-500 text-[15px] ml-2">
            ({quantity} × ${Number.isInteger(price) ? price : price.toFixed(2)})
          </span>
        </h2>

        <span className="flex items-center mt-2">
          <ReactStars
            count={5}
            value={product.rating || 2.8}
            size={30}
            color2={"#ffd700"}
            edit={false}
          />
          <span className="ml-2 text-[18px] text-gray-700">(2)</span>
        </span>

        {/* BOX INFO */}
        <div className="h-52 w-96 border-2 border-gray-300 rounded-lg shadow-md my-4 p-6">
          <h2 className="flex items-center justify-center font-semibold text-lg text-gray-700 mb-4">
            WHAT'S IN THE BOX
          </h2>
          <hr className="mb-4" />
          <span className="block text-gray-600 text-base text-[18px]">
            {product.title}
          </span>
        </div>

        {/* WHOLESALE INFO */}
        {product.wholesalePrice && (
          <div className="inline-flex items-center bg-[#ef93db] text-white font-semibold text-sm p-4 rounded-full shadow-md">
            Wholesale Available: ${product.wholesalePrice} as from{" "}
            {product.wholesaleMinimumQuantity} items
          </div>
        )}

        {/* QUANTITY */}
        <div className="flex items-center my-5 p-4">
          <FaMinus
            className="bg-[#ef93db] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl"
            onClick={() => handleQuantity("dec")}
          />
          <span className="text-lg font-semibold mx-4">{quantity}</span>
          <FaPlus
            className="bg-[#ef93db] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl"
            onClick={() => handleQuantity("inc")}
          />
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          className="bg-[#1e1e1e] p-[10px] w-[200px] text-white cursor-pointer"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>

        <hr className="my-6" />

        {/* REVIEWS */}
        <div className="flex flex-col">
          <h2 className="font-semibold text-[18px] mb-2">Reviews</h2>

          <div className="flex items-center mb-2">
            <ReactStars
              count={5}
              value={4}
              size={30}
              color2={"#ffd700"}
              edit={false}
            />
            <span className="font-semibold mx-[20px]">John K.</span>
          </div>

          <div className="flex items-center">
            <ReactStars
              count={5}
              value={3}
              size={30}
              color2={"#ffd700"}
              edit={false}
            />
            <span className="font-semibold mx-[20px]">Jane L.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
