import { DataGrid } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "product",
      headerName: "Product",
      width: 280,
      renderCell: (params) => (
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full object-cover mr-3 border border-gray-200 shadow-sm"
            src={params.row.img}
            alt=""
          />
          <span className="font-medium text-gray-800">{params.row.title}</span>
        </div>
      ),
    },
    { field: "desc", headerName: "Description", width: 200 },
    { field: "originalPrice", headerName: "Price ($)", width: 120 },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
      renderCell: (params) => (
        <span className="font-semibold text-gray-700">
          {params.row.stock || 0}
        </span>
      ),
    },
    {
      field: "inStock",
      headerName: "Status",
      width: 140,
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            params.row.inStock && params.row.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {params.row.inStock && params.row.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      renderCell: (params) => (
        <Link to={`/product/${params.row._id}`}>
          <button className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-3 py-1 rounded-md transition">
            Edit
          </button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <FaTrash
          className="text-red-500 hover:text-red-600 text-[18px] cursor-pointer transition"
          onClick={() => handleDelete(params.row._id)}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-2">
          All Products
        </h1>
        <Link to="/newproduct">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-md shadow-md transition">
            + Create Product
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-6">
        <DataGrid
          rows={products}
          getRowId={(row) => row._id}
          columns={columns}
          checkboxSelection
          autoHeight
          pagination
          pageSizeOptions={[10]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              fontWeight: "bold",
              fontSize: "1rem",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#fff5f5",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.95rem",
              color: "#374151",
            },
            "& .MuiCheckbox-root.Mui-checked": {
              color: "#dc2626 !important",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#fafafa",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Products;
