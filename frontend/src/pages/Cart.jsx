import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeProduct, updateQuantity } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemoveProduct = async (product) => {
    try {
      // Return stock to inventory
      await userRequest.post("/products/increase-stock", {
        productId: product._id,
        quantity: product.quantity,
      });

      // Remove from cart
      dispatch(removeProduct(product));
      toast.success("Product removed from cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove product");
    }
  };

  const handleClearProduct = async () => {
    try {
      // Return all products' stock to inventory
      for (const product of cart.products) {
        await userRequest.post("/products/increase-stock", {
          productId: product._id,
          quantity: product.quantity,
        });
      }

      // Clear cart
      dispatch(clearCart());
      toast.success("Cart cleared");
    } catch (error) {
      console.log(error);
      toast.error("Failed to clear cart");
    }
  };

  const handleIncreaseQuantity = async (product) => {
    try {
      // Decrease stock by 1
      await userRequest.post("/products/decrease-stock", {
        productId: product._id,
        quantity: 1,
      });

      // Update cart quantity
      dispatch(updateQuantity({ _id: product._id, quantity: product.quantity + 1 }));
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        toast.error("Not enough stock available");
      } else {
        toast.error("Failed to update quantity");
      }
    }
  };

  const handleDecreaseQuantity = async (product) => {
    if (product.quantity > 1) {
      try {
        // Increase stock by 1
        await userRequest.post("/products/increase-stock", {
          productId: product._id,
          quantity: 1,
        });

        // Update cart quantity
        dispatch(updateQuantity({ _id: product._id, quantity: product.quantity - 1 }));
      } catch (error) {
        console.log(error);
        toast.error("Failed to update quantity");
      }
    }
  };

  const handleCheckout = async () => {
    if (!user.currentUser) {
      toast.error("Please login to proceed to checkout.");
      return;
    }

    if (cart.products?.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setIsCheckingOut(true);
    try {
      console.log("Sending checkout request with data:", {
        cart,
        userId: user.currentUser._id,
        email: user.currentUser.email,
        name: user.currentUser.name,
      });

      const res = await userRequest.post("/stripe/create-checkout-session", {
        cart,
        userId: user.currentUser._id,
        email: user.currentUser.email,
        name: user.currentUser.name,
      });

      console.log("Checkout response:", res.data);

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Failed to create checkout session. No URL received.");
        setIsCheckingOut(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.error || error.message || "Failed to proceed to checkout");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-10">
      <ToastContainer position="top-right" autoClose={5000} />
      <h2 className="text-[30px] font-extrabold mb-12 text-center text-gray-900 uppercase tracking-wide">
        Shopping Cart
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
        {/* LEFT */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-3">
            Your Items
          </h3>

          {cart.products?.length === 0 ? (
            <div className="text-center text-gray-500 py-12 italic">
              Your cart is empty 🛒
            </div>
          ) : (
            <div className="flex flex-col space-y-6">
              {cart.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 p-5"
                >
                  <img
                    src={product.img}
                    alt=""
                    className="w-28 h-28 object-cover rounded-lg"
                  />

                  <div className="flex-1 ml-5">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {product.desc}
                    </p>

                    <div className="flex items-center gap-3">
                      <div
                        className="bg-red-600 hover:bg-red-700 cursor-pointer p-2 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                        onClick={() => handleDecreaseQuantity(product)}
                      >
                        <FaMinus className="text-white text-sm" />
                      </div>
                      <span className="text-lg font-semibold mx-1 text-gray-900 min-w-[30px] text-center">
                        {product.quantity}
                      </span>
                      <div
                        className="bg-red-600 hover:bg-red-700 cursor-pointer p-2 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                        onClick={() => handleIncreaseQuantity(product)}
                      >
                        <FaPlus className="text-white text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900 mb-4">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                    <FaTrashAlt
                      className="text-red-500 hover:text-red-600 cursor-pointer transition-all text-xl"
                      onClick={() => handleRemoveProduct(product)}
                    />
                  </div>
                </div>
              ))}

              <button
                className="bg-red-600 hover:bg-red-700 text-white w-[200px] p-3 mt-8 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                onClick={handleClearProduct}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-80 bg-white shadow-lg rounded-2xl p-8 border border-gray-100 h-fit">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            Order Summary
          </h2>

          <div className="flex flex-col space-y-5 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">$10.00</span>
            </div>
            <div className="flex justify-between text-gray-900 border-t border-gray-200 pt-4 text-lg font-semibold">
              <span>Total</span>
              <span>${(cart.total + 10).toFixed(2)}</span>
            </div>

            <button
              className="bg-red-600 hover:bg-red-700 text-white p-3 w-full rounded-lg font-semibold shadow-md hover:shadow-lg transition-all mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleCheckout}
              disabled={isCheckingOut || cart.products?.length === 0}
            >
              {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
