import ReactStars from "react-stars";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Order = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const getUserOrder = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${user.currentUser._id}`);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserOrder();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f6] via-[#fff0f1] to-[#fff8f8] p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-[#f4d1d1]">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#333]">Thank You for Your Order!</h1>
          <p className="text-gray-600 mt-2">
            Here’s a summary of your recent purchase.
          </p>
        </div>

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
                      ${product.price}
                    </p>
                  </div>

                  {/* Rating Section */}
                  <div className="mt-2">
                    <h3 className="text-[#e63946] font-medium mb-2">
                      Rate this product:
                    </h3>
                    <ReactStars
                      count={5}
                      value={rating}
                      size={28}
                      color1={"#ddd"}
                      color2={"#e63946"}
                      onChange={(newRating) => setRating(newRating)}
                    />
                    <textarea
                      placeholder="Leave your comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full mt-3 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f4b2b0] outline-none bg-white"
                    ></textarea>
                    <button className="mt-3 bg-[#e63946] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d62828] transition">
                      Submit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* SHIPPING INFO */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-5">
          <h3 className="text-xl font-semibold text-[#e63946] mb-2">
            Shipping Information
          </h3>
          <p className="text-gray-700">jelenapee123@gmail.com</p>
          <p className="text-gray-700">+(656) 678 567</p>
          <p className="text-gray-700">Jelena Petrovic</p>
        </div>

        {/* PAYMENT */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-5">
          <h3 className="text-xl font-semibold text-[#e63946] mb-2">
            Payment Method
          </h3>
          <p className="text-gray-700">VISA</p>
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-semibold text-[#e63946] mb-3">
            Order Summary
          </h3>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal:</span>
            <span className="font-medium">$720</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Shipping:</span>
            <span className="font-medium">$10</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 text-lg">
            <span className="font-semibold text-[#4a4a4a]">Total:</span>
            <span className="font-bold text-[#e63946]">$730</span>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-10 text-center">
          <button className="bg-[#e63946] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-[#d62828] transition">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
