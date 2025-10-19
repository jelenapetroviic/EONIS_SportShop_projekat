import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userRedux";

const Myaccount = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff5f5] via-[#fff1f1] to-[#ffe9e9] p-6">
      <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-[0_8px_30px_rgba(255,99,99,0.15)] w-full max-w-5xl border border-[#ffd5d5] flex flex-col lg:flex-row gap-10">
        
        {/* LEVI DEO - ACCOUNT INFO & SETTINGS */}
        <div className="flex-1">
          {/* Account Info */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center lg:text-left">
              My Account <span className="text-[#e84a4a]"></span>
            </h2>
            <div className="space-y-3 text-center lg:text-left">
              <p className="text-lg font-semibold text-gray-800">
                {user.currentUser?.name}
              </p>
              <p className="text-gray-600">{user.currentUser?.email}</p>
              <p className="text-gray-600">+1 (555) 223-4567</p>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Account Settings
            </h3>
            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={user.currentUser?.name}
                  className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.currentUser?.email}
                  className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Telephone
                </label>
                <input
                  type="text"
                  value="+1 (555) 123-4567"
                  className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value="Despota Stefana 7"
                  className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#e84a4a] to-[#d43737] text-white font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* DESNI DEO - PASSWORD CHANGE */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4 text-gray-800 text-center lg:text-left">
            Change Password
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#e84a4a] to-[#d43737] text-white font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              Update Password
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-3 bg-gradient-to-r from-[#f8b4b4] to-[#f07272] text-white font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
