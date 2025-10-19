import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      login(dispatch, { email, password });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fff5f5] via-[#fff1f1] to-[#ffe9e9]">
      <ToastContainer position="top-right" autoClose={4000} />

      <div className="bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgba(255,99,99,0.15)] rounded-3xl px-12 py-14 w-[480px] border border-[#ffd5d5]">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10 tracking-wide">
          Welcome Back <span className="text-[#e84a4a]">❤️</span>
        </h2>

        <form className="space-y-7">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 font-semibold text-lg"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-5 py-3 border border-[#f3d1d1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition text-gray-900 placeholder-gray-400"
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 font-semibold text-lg"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-5 py-3 border border-[#f3d1d1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition text-gray-900 placeholder-gray-400"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-4 bg-gradient-to-r from-[#e84a4a] to-[#d43737] text-white font-bold text-lg rounded-xl shadow-md transform transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            {loading ? "Loading..." : "Login"}
            {user.currentUser ? <Navigate to="/" /> : ""}
          </button>
        </form>

        <div className="mt-8 text-base text-center text-gray-700">
          <span>Don’t have an account? </span>
          <Link
            to="/create-account"
            className="text-[#e84a4a] font-semibold hover:underline hover:text-[#d43737] transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
