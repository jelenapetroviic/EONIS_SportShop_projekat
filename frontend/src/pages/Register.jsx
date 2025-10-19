import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address (e.g., example@domain.com)");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      await userRequest.post("/auth/register", { name, email, password });
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
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

      <div className="bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgba(255,99,99,0.15)] rounded-3xl px-12 py-14 w-[500px] border border-[#ffd5d5]">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10 tracking-wide">
          Create Account <span className="text-[#e84a4a]">❤️</span>
        </h2>

        <form className="space-y-7">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 mb-2 font-semibold text-lg"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-5 py-3 border border-[#f3d1d1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition text-gray-900 placeholder-gray-400"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
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
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            onClick={handleRegister}
            className="w-full py-4 bg-gradient-to-r from-[#e84a4a] to-[#d43737] text-white font-bold text-lg rounded-xl shadow-md transform transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-base text-center text-gray-700">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="text-[#e84a4a] font-semibold hover:underline hover:text-[#d43737] transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
