import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { getUserList } from "../../services/UserService";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getAllUsers } from "../../store/APIRequest";
import { loginSuccess } from "../../store/authSlice";

const data = [
  {
    id: 1,
    name: "Admin",
    email: "admin1@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 2,
    name: "Admin2",
    email: "admin2@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 123,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 564,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 3,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 685,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 3,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 100,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 333,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 3,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 3,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 321,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
  {
    id: 3,
    name: "Member",
    email: "member@gmail.com",
    dob: "2002-07-20",
  },
];

const UserList = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const dispatch = useDispatch();
  let axiosJWT = axios.create();

  const [users, setUsers] = useState([]);

  const [sorting, setSorting] = useState([]);

  console.log("Render out of useEffect");

  const table = useReactTable({
    data,
    columns: [
      {
        header: "ID",
        accessorKey: "id",
        footer: "ID",
      },
      {
        header: "LAST NAME",
        accessorKey: "name",
        footer: "NAME",
      },
      {
        header: "EMAIL",
        accessorKey: "email",
        footer: "EMAIL",
      },
      {
        header: "DOB",
        accessorKey: "dob",
        footer: "DOB",
      },
      {
        header: "Edit",
        accessorKey: "edit",
        footer: "Edit",
        cell: ({ row }) => <EditButton userId={row.original.id} />,
      },
      {
        header: "Delete",
        accessorKey: "delete",
        footer: "Delete",
        cell: ({ row }) => <DeleteButton userId={row.original.id} />,
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  const handleEdit = (userId) => {
    console.log("Edit user with ID:", userId);
    // Implement edit logic here
  };

  const handleDelete = (userId) => {
    console.log("Delete user with ID: ", userId);
  };

  const EditButton = ({ userId }) => (
    <button onClick={() => handleEdit(userId)}>
      <FaUserEdit />
    </button>
  );

  const DeleteButton = ({ userId }) => (
    <button onClick={() => handleDelete(userId)}>
      <MdDelete />
    </button>
  );

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        "https://swdprojectapi.azurewebsites.net/api/token/refresh",
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log("error token: ", error);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.token);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          token: data.token,
          refreshToken: data.refreshToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.token;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  useEffect(() => {
    try {
      const res = getAllUsers(user.token, dispatch, axiosJWT);
      if (res) {
        console.log("Success res: ", res);
      } else {
        console.log("Faill");
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Render in useEffect");
  }, []);
  console.log("userList: ", userList);

  return (
    <>
      <div className="w3-container">
        <button className="px-4 py-2 mb-5 font-semibold text-gray-300 bg-blue-500 rounded">
          Thêm người dùng mới
        </button>
        <table className="w3-table-all ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="text-center"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🚀", desc: "✈" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, {
                      ...cell.getContext(),
                      row,
                    })}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end gap-2 mt-2">
          <button
            className="px-2 py-1 bg-red-400 rounded-md"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="px-2 py-1 bg-blue-400 rounded-md"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="px-2 py-1 bg-blue-400 rounded-md"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="px-2 py-1 bg-red-400 rounded-md"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                console.log(e);
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 px-2 py-1 bg-green-400 rounded-md"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default UserList;
