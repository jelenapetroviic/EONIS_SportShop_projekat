import { LineChart } from "@mui/x-charts/LineChart";

const Home = () => {
  return (
    <div className="flex justify-between h-screen p-6 bg-gradient-to-br from-[#f7f8fa] via-[#ffffff] to-[#eef3f8] w-[79.5vw] overflow-y-auto">
      {/* LEFT */}
      <div className="flex flex-col w-2/3">
        {/* STATS CARDS */}
        <div className="flex flex-wrap justify-start gap-6">
          {/* Orders */}
          <div className="bg-white hover:shadow-[0_10px_25px_rgba(255,80,80,0.15)] transition-all duration-300 h-56 w-60 rounded-2xl flex flex-col items-center justify-center border-t-[5px] border-[#e84a4a]">
            <div className="h-32 w-32 mb-3 border-[8px] border-[#e84a4a]/70 rounded-full flex items-center justify-center shadow-inner">
              <h2 className="font-bold text-3xl text-gray-800">699</h2>
            </div>
            <h2 className="font-semibold text-xl text-gray-700">Orders</h2>
          </div>

          {/* Products */}
          <div className="bg-white hover:shadow-[0_10px_25px_rgba(0,123,255,0.15)] transition-all duration-300 h-56 w-60 rounded-2xl flex flex-col items-center justify-center border-t-[5px] border-[#4a90e2]">
            <div className="h-32 w-32 mb-3 border-[8px] border-[#4a90e2]/70 rounded-full flex items-center justify-center shadow-inner">
              <h2 className="font-bold text-3xl text-gray-800">100</h2>
            </div>
            <h2 className="font-semibold text-xl text-gray-700">Products</h2>
          </div>

          {/* Users */}
          <div className="bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] transition-all duration-300 h-56 w-60 rounded-2xl flex flex-col items-center justify-center border-t-[5px] border-gray-400">
            <div className="h-32 w-32 mb-3 border-[8px] border-gray-400/60 rounded-full flex items-center justify-center shadow-inner">
              <h2 className="font-bold text-3xl text-gray-800">200</h2>
            </div>
            <h2 className="font-semibold text-xl text-gray-700">Users</h2>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white mt-10 p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] border border-gray-100">
          <h3 className="text-2xl font-bold mb-5 text-gray-800 border-b-2 border-[#e84a4a]/30 pb-2">
            Latest Transactions
          </h3>

          <table className="min-w-full table-auto text-gray-700">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 uppercase text-sm font-semibold tracking-wide">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-[#fff6f6] transition">
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">$200</td>
                <td className="py-3 px-4 text-green-600 font-semibold">
                  Approved
                </td>
              </tr>
              <tr className="border-b hover:bg-[#fff6f6] transition">
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">$200</td>
                <td className="py-3 px-4 text-red-500 font-semibold">Declined</td>
              </tr>
              <tr className="border-b hover:bg-[#fff6f6] transition">
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">$200</td>
                <td className="py-3 px-4 text-green-600 font-semibold">
                  Approved
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col w-1/3 bg-white p-6 shadow-[0_4px_25px_rgba(0,0,0,0.08)] rounded-2xl border border-gray-100">
        <div className="bg-gradient-to-r from-[#e84a4a] to-[#f56b6b] p-5 mb-6 rounded-2xl shadow-md flex flex-col items-center text-white">
          <h2 className="font-bold text-2xl">Total Revenue</h2>
          <p className="text-3xl font-extrabold mt-2">$200,000</p>
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
