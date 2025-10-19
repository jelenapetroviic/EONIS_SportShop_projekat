import { useDispatch, useSelector } from "react-redux";
import { logOut, loginSuccess } from "../redux/userRedux";
import { useState } from "react";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myaccount = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [phone, setPhone] = useState(user.currentUser?.phone || "");
  const [address, setAddress] = useState(user.currentUser?.address || "");
  const [loading, setLoading] = useState(false);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Validate phone number (only digits, +, -, spaces, and parentheses)
    if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
      toast.error("Phone number can only contain numbers and basic formatting characters");
      return;
    }

    setLoading(true);

    try {
      const res = await userRequest.put(`/users/${user.currentUser._id}`, {
        phone,
        address,
      });

      // Update Redux state with new user data
      dispatch(
        loginSuccess({
          ...user.currentUser,
          phone: res.data.phone,
          address: res.data.address,
        })
      );

      toast.success("Changes saved successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to save changes. Please try again.");
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    setPasswordLoading(true);

    try {
      // First verify current password by trying to login
      const verifyRes = await userRequest.post("/auth/login", {
        email: user.currentUser.email,
        password: currentPassword,
      });

      if (!verifyRes.data) {
        toast.error("Current password is incorrect");
        setPasswordLoading(false);
        return;
      }

      // Update password
      await userRequest.put(`/users/${user.currentUser._id}`, {
        password: newPassword,
      });

      toast.success("Password updated successfully!");

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordLoading(false);
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.response?.status === 401) {
        toast.error("Current password is incorrect");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff5f5] via-[#fff1f1] to-[#ffe9e9] p-6">
      <ToastContainer position="top-right" autoClose={3000} />
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
              {user.currentUser?.phone && (
                <p className="text-gray-600">{user.currentUser.phone}</p>
              )}
              {user.currentUser?.address && (
                <p className="text-gray-600">{user.currentUser.address}</p>
              )}
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Account Settings
            </h3>
            <form className="space-y-5" onSubmit={handleSaveChanges}>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={user.currentUser?.name}
                  disabled
                  className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.currentUser?.email}
                  disabled
                  className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Telephone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numbers, spaces, +, -, and parentheses
                    if (value === "" || /^[\d\s\-\+\(\)]+$/.test(value)) {
                      setPhone(value);
                    }
                  }}
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#e84a4a] to-[#d43737] text-white font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-[1.03] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>

        {/* DESNI DEO - PASSWORD CHANGE */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4 text-gray-800 text-center lg:text-left">
            Change Password
          </h3>
          <form className="space-y-5" onSubmit={handlePasswordChange}>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full p-3 border border-[#f3d1d1] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e84a4a] transition"
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full py-3 bg-gradient-to-r from-[#e84a4a] to-[#d43737] text-white font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-[1.03] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
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
