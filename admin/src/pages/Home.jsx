import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Home = () => {
  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    users: 0,
    loading: true,
  });
  const [latestOrders, setLatestOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          userRequest.get("/orders"),
          userRequest.get("/products"),
          userRequest.get("/users"),
        ]);

        setStats({
          orders: ordersRes.data.length,
          products: productsRes.data.length,
          users: usersRes.data.length,
          loading: false,
        });

        // Calculate total revenue from all orders
        const revenue = ordersRes.data.reduce((sum, order) => sum + order.total, 0);
        setTotalRevenue(revenue);

        // Get latest 5 orders (sorted by newest first)
        const sortedOrders = ordersRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setLatestOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex justify-between h-screen p-6 bg-gradient-to-br from-[#f7f8fa] via-[#ffffff] to-[#eef3f8] w-[79.5vw] overflow-y-auto">
      {/* LEFT */}
      <div className="flex flex-col w-2/3">
        {/* STATS CARDS */}
        <div className="flex flex-wrap justify-start gap-6">
          {/* Orders */}
          <div className="bg-white hover:shadow-[0_10px_25px_rgba(255,80,80,0.15)] transition-all duration-300 h-56 w-60 rounded-2xl flex flex-col items-center justify-center border-t-[5px] border-[#e84a4a]">
            <div className="h-32 w-32 mb-3 border-[8px] border-[#e84a4a]/70 rounded-full flex items-center justify-center shadow-inner">
              <h2 className="font-bold text-3xl text-gray-800">
                {stats.loading ? "..." : stats.orders}
              </h2>
            </div>
            <h2 className="font-semibold text-xl text-gray-700">Orders</h2>
          </div>

          {/* Products */}
          <div className="bg-white hover:shadow-[0_10px_25px_rgba(0,123,255,0.15)] transition-all duration-300 h-56 w-60 rounded-2xl flex flex-col items-center justify-center border-t-[5px] border-[#4a90e2]">
            <div className="h-32 w-32 mb-3 border-[8px] border-[#4a90e2]/70 rounded-full flex items-center justify-center shadow-inner">
              <h2 className="font-bold text-3xl text-gray-800">
                {stats.loading ? "..." : stats.products}
              </h2>
            </div>
            <h2 className="font-semibold text-xl text-gray-700">Products</h2>
          </div>

          {/* Users */}
          <div className="bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] transition-all duration-300 h-56 w-60 rounded-2xl flex flex-col items-center justify-center border-t-[5px] border-gray-400">
            <div className="h-32 w-32 mb-3 border-[8px] border-gray-400/60 rounded-full flex items-center justify-center shadow-inner">
              <h2 className="font-bold text-3xl text-gray-800">
                {stats.loading ? "..." : stats.users}
              </h2>
            </div>
            <h2 className="font-semibold text-xl text-gray-700">Users</h2>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white mt-10 p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] border border-gray-100">
          <h3 className="text-2xl font-bold mb-5 text-gray-800 border-b-2 border-[#e84a4a]/30 pb-2">
            Latest Transactions
          </h3>

          {stats.loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading transactions...
            </div>
          ) : latestOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No orders yet
            </div>
          ) : (
            <table className="min-w-full table-auto text-gray-700">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600 uppercase text-sm font-semibold tracking-wide">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-[#fff6f6] transition"
                  >
                    <td className="py-3 px-4 text-sm text-gray-500">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="py-3 px-4">{order.name}</td>
                    <td className="py-3 px-4 text-sm">{order.email}</td>
                    <td className="py-3 px-4 font-semibold">${order.total}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 0
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === 1
                            ? "bg-blue-100 text-blue-700"
                            : order.status === 2
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status === 0
                          ? "Pending"
                          : order.status === 1
                          ? "Processing"
                          : order.status === 2
                          ? "Delivered"
                          : "Cancelled"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col w-1/3 bg-white p-6 shadow-[0_4px_25px_rgba(0,0,0,0.08)] rounded-2xl border border-gray-100">
        <div className="bg-gradient-to-r from-[#e84a4a] to-[#f56b6b] p-5 mb-6 rounded-2xl shadow-md flex flex-col items-center text-white">
          <h2 className="font-bold text-2xl">Total Revenue</h2>
          <p className="text-3xl font-extrabold mt-2">
            {stats.loading ? "..." : `$${totalRevenue.toFixed(2)}`}
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#4a90e2] to-[#6bb3ff] p-5 mb-6 rounded-2xl shadow-md flex flex-col items-center text-white">
          <h2 className="font-bold text-2xl">Total Losses</h2>
          <p className="text-3xl font-extrabold mt-2">$0</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 shadow-inner">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                color: "#e84a4a",
              },
            ]}
            height={350}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
