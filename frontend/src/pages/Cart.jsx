import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeProduct } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  const handleClearProduct = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    if (user.currentUser) {
      try {
        const res = await userRequest.post("/stripe/create-checkout-session", {
          cart,
          userId: user.currentUser._id,
          email: user.currentUser.email,
          name: user.currentUser.name,
        });
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error("Please login to proceed to checkout.");
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

                    <div className="flex items-center">
                      <FaMinus className="bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer p-2 rounded-full mr-3 text-xl transition-all" />
                      <span className="text-lg font-semibold mx-3 text-gray-900">
                        {product.quantity}
                      </span>
                      <FaPlus className="bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer p-2 rounded-full text-xl transition-all" />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900 mb-4">
                      ${product.originalPrice}
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
              <span className="font-medium">${cart.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">$10</span>
            </div>
            <div className="flex justify-between text-gray-900 border-t border-gray-200 pt-4 text-lg font-semibold">
              <span>Total</span>
              <span>${cart.total}</span>
            </div>

            <button
              className="bg-red-600 hover:bg-red-700 text-white p-3 w-full rounded-lg font-semibold shadow-md hover:shadow-lg transition-all mt-4"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
