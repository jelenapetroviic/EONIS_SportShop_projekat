import { FaSearch, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);

  // Show "1" if cart has any products, otherwise show nothing
  const cartBadgeCount = cart.products.length > 0 ? 1 : 0;

  const handleAdminDashboard = () => {
    window.location.href = "http://localhost:5174";
  };

  return (
    <nav className="flex items-center justify-between h-[80px] bg-white shadow-md px-10 sticky top-0 z-50 border-b border-gray-200">
      {/* LOGO + TEXT */}
      <div className="flex items-center cursor-pointer space-x-3">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/SportShop.jpg"
            alt="Logo"
            className="h-[60px] w-auto object-cover rounded-xl hover:opacity-90 transition duration-300"
          />
          <span className="text-2xl font-bold text-red-600 tracking-wide hover:text-red-700 transition">
            Sport Shop
          </span>
        </Link>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[400px] focus-within:ring-2 focus-within:ring-red-500 transition">
        <input
          type="text"
          placeholder="Search for products..."
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500 px-2"
        />
        <Link to={`/products/${search}`}>
          <FaSearch className="text-gray-600 text-[18px] cursor-pointer hover:text-red-500 transition-all duration-200" />
        </Link>
      </div>

      {/* ICONS */}
      <div className="flex items-center space-x-6">
        {/* CART */}
        <Link
          to="/cart"
          className="relative group hover:scale-110 transition-transform duration-300"
        >
          <Badge
            badgeContent={cartBadgeCount}
            color="secondary"
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#ef4444",
                color: "#fff",
                fontWeight: "bold",
              },
            }}
          >
            <ShoppingBasketIcon className="text-gray-700 text-[28px] group-hover:text-red-600 transition-all duration-300" />
          </Badge>
        </Link>

        {/* ADMIN DASHBOARD - Only visible for admin users */}
        {user.currentUser?.role === "admin" && (
          <div
            onClick={handleAdminDashboard}
            className="relative group cursor-pointer hover:scale-110 transition-transform duration-300"
            title="Admin Dashboard"
          >
            <MdDashboard className="text-gray-700 text-[32px] group-hover:text-red-600 transition-all duration-300" />
          </div>
        )}

        {/* USER */}
        <Link
          to={!user.currentUser ? "/login" : "/myaccount"}
          className="flex items-center gap-2 border border-gray-300 py-2 px-5 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          <FaUser className="text-gray-700 group-hover:text-white transition duration-200" />
          {!user.currentUser ? (
            <span className="font-medium text-gray-700 group-hover:text-white">
              Login
            </span>
          ) : (
            <span className="font-medium text-gray-700 group-hover:text-white">
              {user.currentUser.name}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
