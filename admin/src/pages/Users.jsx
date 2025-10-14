import { FaTrash } from "react-icons/fa";
import {DataGrid} from "@mui/x-data-grid"

const Users = () => {

  const columns = [
    { field: "_id", headerName: "ID", width: 90},
    { field: "name", headerName: "Name", width: 150},
    { field: "email", headerName: "Email", width: 200},
    { field: "phone", headerName: "Phone", width: 150},
    { field: "role", headerName: "Role", width: 130},
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: () => {
        return (
          <>
            <FaTrash className="text-red-500 cursor-pointer m-2" />
          </>
        );
      },
    },
  ];

  const data= [
    { _id: "u001", name: "Alice Johnson", email: "alice@example.com", phone: "123-456-7890", role: "Admin" },
    { _id: "u002", name: "Bob Smith", email: "bob@example.com", phone: "342-413-5314", role: "User" },
    { _id: "u003", name: "Charlie Brown", email: "charlie@example.com", phone: "123-423-5167", role: "User" },
    { _id: "u004", name: "David Clark", email: "david@example.com", phone: "122-312-5234", role: "Admin" },
    { _id: "u005", name: "Eve Stone", email: "eve@example.com", phone: "123-456-7532", role: "User" },
    { _id: "u006", name: "Frank Wilson", email: "frank@example.com", phone: "123-126-7890", role: "Admin" },
    { _id: "u007", name: "Grace Lee", email: "grace@example.com", phone: "123-543-7854", role: "User" },
    { _id: "u008", name: "Henry Kim", email: "henry@example.com", phone: "123-016-8840", role: "Admin" }
  ];

  return (
    <div className="p-5 w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px]">All Users</h1>
      </div>
      <div className="m-[30px]">
        <DataGrid getRowId={(row) => row._id} rows={data} checkboxSelection columns={columns} />
      </div>
    </div>
  )
}

export default Users;
