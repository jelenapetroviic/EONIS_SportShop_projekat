import ReactStars from "react-stars";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartRedux";
import { useSearchParams, useNavigate } from "react-router-dom";

const Order = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({}); // Store ratings per product
  const [comments, setComments] = useState({}); // Store comments per product
  const [submittedProducts, setSubmittedProducts] = useState({}); // Track submitted reviews
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear cart only if coming from successful payment
    const fromPayment = searchParams.get("payment_success");
    if (fromPayment === "true") {
      console.log("Clearing cart after successful payment");
      dispatch(clearCart());
      // Remove the query parameter from URL to prevent clearing cart on refresh
      window.history.replaceState({}, document.title, "/orders");
    }

    const getUserOrder = async () => {
      try {
        console.log("Fetching orders for user:", user.currentUser._id);
        const res = await userRequest.get(`/orders/find/${user.currentUser._id}`);
        console.log("Orders received:", res.data);
        setOrders(res.data);
      } catch (error) {
        console.log("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user.currentUser?._id) {
      // If coming from payment, wait 2 seconds for webhook to process
      if (fromPayment === "true") {
        console.log("Waiting for webhook to process order...");
        setLoading(true);
        const timer = setTimeout(() => {
          getUserOrder();
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        getUserOrder();
      }
    } else {
      setLoading(false);
    }
  }, [user.currentUser?._id, dispatch, searchParams]);

  const handleRatingChange = (productId, newRating) => {
    setRatings((prev) => ({ ...prev, [productId]: newRating }));
  };

  const handleCommentChange = (productId, newComment) => {
    setComments((prev) => ({ ...prev, [productId]: newComment }));
  };

  const handleSubmitReview = (productId) => {
    // Mark product as submitted
    setSubmittedProducts((prev) => ({
      ...prev,
      [productId]: {
        rating: ratings[productId] || 0,
        comment: comments[productId] || "",
      },
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fff7f6] via-[#fff0f1] to-[#fff8f8] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#e63946] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f6] via-[#fff0f1] to-[#fff8f8] p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-[#f4d1d1]">

        {/* HEADER */}
        <div className="text-center mb-10">
          <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#333]">
            {orders.length > 0 ? "Thank You for Your Order!" : "Your Orders"}
          </h1>
          <p className="text-gray-600 mt-2">
            {orders.length > 0
              ? "Here's a summary of your recent purchase."
              : "You haven't placed any orders yet."}
          </p>
        </div>

        {/* NO ORDERS MESSAGE */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-6">
              You don't have any orders yet. Start shopping to see your orders here!
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-[#e63946] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-[#d62828] transition"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* ORDERS */}
        {orders.map((order, index) => (
          <div
            className="mb-10 border border-gray-100 rounded-xl shadow-sm bg-[#fff6f6] p-6"
            key={index}
          >
            <h2 className="text-2xl font-semibold text-[#e63946] mb-4">
              Order #{order._id}
            </h2>

            <div className="space-y-6">
              {order.products.map((product, i) => (
                <div
                  className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition"
                  key={i}
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.img}
                        alt=""
                        className="w-24 h-24 rounded-lg object-cover border border-gray-200"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-[#333]">
                          {product.title}
                        </h4>
                        <p className="text-gray-600">Qty: {product.quantity}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-[#e63946]">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Rating Section */}
                  {!submittedProducts[product._id] ? (
                    <div className="mt-2">
                      <h3 className="text-[#e63946] font-medium mb-2">
                        Rate this product:
                      </h3>
                      <ReactStars
                        count={5}
                        value={ratings[product._id] || 0}
                        size={28}
                        color1={"#ddd"}
                        color2={"#e63946"}
                        onChange={(newRating) => handleRatingChange(product._id, newRating)}
                      />
                      <textarea
                        placeholder="Leave your comment..."
                        value={comments[product._id] || ""}
                        onChange={(e) => handleCommentChange(product._id, e.target.value)}
                        className="w-full mt-3 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f4b2b0] outline-none bg-white"
                      ></textarea>
                      <button
                        onClick={() => handleSubmitReview(product._id)}
                        className="mt-3 bg-[#e63946] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d62828] transition"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-700">Your Review:</span>
                        <ReactStars
                          count={5}
                          value={submittedProducts[product._id].rating}
                          size={20}
                          color1={"#ddd"}
                          color2={"#e63946"}
                          edit={false}
                        />
                      </div>
                      {submittedProducts[product._id].comment && (
                        <p className="text-gray-700 italic">
                          "{submittedProducts[product._id].comment}"
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* SHIPPING INFO */}
        {orders.length > 0 && (
          <>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-5">
              <h3 className="text-xl font-semibold text-[#e63946] mb-2">
                Shipping Information
              </h3>
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> {orders[0].name || user.currentUser?.name || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {orders[0].email || user.currentUser?.email || "N/A"}
              </p>
              {(user.currentUser?.phone || orders[0].phone) && (
                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span> {user.currentUser?.phone || orders[0].phone}
                </p>
              )}
              {(user.currentUser?.address || orders[0].address) && (
                <p className="text-gray-700">
                  <span className="font-semibold">Address:</span> {user.currentUser?.address || orders[0].address}
                </p>
              )}
            </div>

            {/* PAYMENT */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-5">
              <h3 className="text-xl font-semibold text-[#e63946] mb-2">
                Payment Method
              </h3>
              <p className="text-gray-700">Stripe Payment (VISA/Mastercard)</p>
            </div>

            {/* SUMMARY */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold text-[#e63946] mb-3">
                Order Summary
              </h3>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Subtotal:</span>
                <span className="font-medium">${orders[0].total}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Shipping:</span>
                <span className="font-medium">$10</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-lg">
                <span className="font-semibold text-[#4a4a4a]">Total:</span>
                <span className="font-bold text-[#e63946]">
                  ${orders[0].total + 10}
                </span>
              </div>
            </div>
          </>
        )}

        {/* BUTTON */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-[#e63946] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-[#d62828] transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
