import {
  FaBox,
  FaChartBar,
  FaClipboard,
  FaClipboardList,
  FaCog,
  FaElementor,
  FaHdd,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  const handleExit = () => {
    // Just redirect back to frontend without logging out
    window.location.href = "http://localhost:5173";
  };

  return (
    <div className="h-[100vh] w-[320px] bg-gradient-to-b from-gray-100 to-gray-200 shadow-2xl border-r border-gray-300 flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 tracking-wide">Dashboard Menu</h2>

      <ul className="flex flex-col items-start justify-start w-full space-y-3">
        <Link to="/" className="w-full">
          <li className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white shadow-sm">
            <FaHome className="mr-[15px] text-blue-500 text-xl" />
            Home
          </li>
        </Link>

        <li className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white shadow-sm">
          <FaUser className="mr-[15px] text-blue-500 text-xl" />
          Profile
        </li>

        <hr className="w-full my-[10px] border-gray-300" />

        <Link to="/users" className="w-full">
          <li className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white shadow-sm">
            <FaUsers className="mr-[15px] text-blue-500 text-xl" />
            Users
          </li>
        </Link>

        <Link to="/products" className="w-full">
          <li className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white shadow-sm">
            <FaBox className="mr-[15px] text-blue-500 text-xl" />
            Products
          </li>
        </Link>

        <Link to="/orders" className="w-full">
          <li className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white shadow-sm">
            <FaClipboardList className="mr-[15px] text-blue-500 text-xl" />
            Orders
          </li>
        </Link>

        <hr className="w-full my-[10px] border-gray-300" />

        <Link to="/banners" className="w-full">
          <li className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white shadow-sm">
            <FaElementor className="mr-[15px] text-blue-500 text-xl" />
            Banners
          </li>
        </Link>

        <li className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white shadow-sm">
          <FaCog className="mr-[15px] text-blue-500 text-xl" />
          Settings
        </li>

        <li className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white shadow-sm">
          <FaHdd className="mr-[15px] text-blue-500 text-xl" />
          Backups
        </li>

        <hr className="w-full my-[10px] border-gray-300" />

        <li className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white shadow-sm">
          <FaChartBar className="mr-[15px] text-blue-500 text-xl" />
          Charts
        </li>

        <li className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white shadow-sm">
          <FaClipboard className="mr-[15px] text-blue-500 text-xl" />
          All logs
        </li>

        <li
          onClick={handleExit}
          className="flex items-center w-full text-[18px] font-medium cursor-pointer px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white shadow-sm"
        >
          <FaSignOutAlt className="mr-[15px] text-red-500 text-xl" />
          Exit
        </li>
      </ul>
    </div>
  );
};

export default Menu;