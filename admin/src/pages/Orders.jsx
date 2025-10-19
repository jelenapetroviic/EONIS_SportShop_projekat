import { DataGrid } from "@mui/x-data-grid";
import { FaCheckCircle, FaCheckDouble, FaClock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const handleUpdateOrder = async (id) => {
    try {
      await userRequest.put(`/orders/${id}`, { status: 2 });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "Order ID", width: 120 },
    { field: "name", headerName: "Customer Name", width: 220 },
    { field: "email", headerName: "Customer Email", width: 230 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <>
          {params.row.status === 0 || params.row.status === 1 ? (
            <div className="flex items-center gap-2 text-yellow-600 font-medium">
              <FaClock className="text-[22px]" />
              Pending
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <FaCheckDouble className="text-[22px]" />
              Delivered
            </div>
          )}
        </>
      ),
    },
    {
      field: "Deliver",
      headerName: "Mark as Delivered",
      width: 180,
      renderCell: (params) =>
        params.row.status === 1 || params.row.status === 0 ? (
          <button
            onClick={() => handleUpdateOrder(params.row._id)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white px-3 py-1 rounded-full shadow-sm"
          >
            <FaCheckCircle className="text-[18px]" />
            Mark Done
          </button>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
  ];

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="w-[72vw] bg-white rounded-2xl shadow-md p-6 border border-red-400 mt-10 ml-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[24px] font-semibold text-red-600">
          All Orders
        </h1>
      </div>

      <div className="h-[70vh]">
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection
          pagination
          pageSizeOptions={[10]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#ffe5e5",
              color: "#b91c1c",
              fontWeight: 600,
              fontSize: "16px",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#fff5f5",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Orders;
