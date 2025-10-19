import { FaTrash } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Users = () => {
  const [users, setUsers] = useState([]);

  const handleDeleteUser = async (id) => {
    if (window.confirm("Da li ste sigurni da želite obrisati ovog korisnika?")) {
      try {
        await userRequest.delete(`/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.log(error);
        alert("Greška pri brisanju korisnika!");
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await userRequest.put(`/users/${id}`, { role: newRole });
      setUsers(users.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.log(error);
      alert("Greška pri promeni uloge!");
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 160 },
    {
      field: "role",
      headerName: "Role",
      width: 160,
      renderCell: (params) => (
        <select
          value={params.row.role}
          onChange={(e) => handleRoleChange(params.row._id, e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer transition-all"
          style={{
            color: params.row.role === "admin" ? "#dc2626" : "#374151",
            fontWeight: params.row.role === "admin" ? "600" : "500",
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <FaTrash
          onClick={() => handleDeleteUser(params.row._id)}
          className="text-red-500 hover:text-red-600 transition cursor-pointer text-[18px]"
        />
      ),
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-2">
          All Users
        </h1>
      </div>

      {/* DataGrid container */}
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-6">
        <DataGrid
          getRowId={(row) => row._id}
          rows={users}
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
              backgroundColor: "#fef2f2", // svetlocrvena pozadina headera
              color: "#b91c1c", // tamnocrveni tekst
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
              color: "#dc2626 !important", // crvena checkbox boja
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

export default Users;
