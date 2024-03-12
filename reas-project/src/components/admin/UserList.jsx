import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useReactTable, flexRender } from "@tanstack/react-table";
import { getUserList, createUser, editUser, deleteUser } from "../../services/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserList.css";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { format } from "date-fns";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState(0);

  const fetchUserData = async () => {
    try {
      const response = await getUserList(pageNumber, itemsPerPage);
      console.log(response)

      setTotal(response?.data?.total);
      console.log("Total:", response?.data?.total)
      setUsers(response?.data?.data);
      console.log("Response:", response?.data?.data)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [pageNumber]);


  const handleEdit = (userId) => {
    const user = users.find((u) => u.userId === userId);

    if (user) {
      setUserToEdit(user);
      setEditUserModalOpen(true);
    } else {
      console.error(`User with ID ${userId} not found.`);
    }
  };



  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleEditUser = async (editedUser) => {
    console.log(editedUser)
    // {
    //   userId: 'cf41890d-a58d-48c0-b14f-08dc427117a7',
    //   username: 'string12345',
    //   email: 'user1341@example.com',
    //   firstName: 'string',
    //   lastName: 'string',
    //   gender: 'Male',
    //   dateOfBirth: '3/12/2024',
    //   citizenId: 'string',
    //   role: 'Member',
    //   phoneNumber: 'string'
    // }
    try {
      console.log(editedUser)
      if (!editedUser || !editedUser.userId) {
        console.error("Edited user or user ID is undefined.");
        toast.error("Error updating user. Please try again.");
        return;
      }

      editUser(editedUser)
      .then((response) => {
        console.log(response)
        fetchUserData();
        toast.success("User updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Error updating user. Please try again.");
      })

    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user. Please try again.");
    } finally {
      setEditUserModalOpen(false);
    }
  };




  const handleOpenAddUserModal = () => {
    setAddUserModalOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setAddUserModalOpen(false);
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await createUser(newUser);
      fetchUserData();
      toast.success("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user. Please try again.");
    } finally {
      handleCloseAddUserModal();
    }
  };
  const handleDelete = (userId) => {
    const user = users.find((u) => u.userId === userId);

    console.log(user, userId)

    if (user) {
      setUserToDelete(user);
      setDeleteModalOpen(true);
    } else {
      console.error(`User with ID ${userId} not found.`);
    }
  };

  const handleDeleteConfirm = () => {
    console.log(userToDelete)
    if (userToDelete) {
      try {
        deleteUser(userToDelete.userId)
        .then((response) => {
          console.log(response)
          fetchUserData();
          toast.success("User deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("Error deleting user. Please try again.");
        })
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error deleting user. Please try again.");
      } finally {
        setDeleteModalOpen(false);
      }
    }
  };

  const totalPageCount = Math.ceil(total / itemsPerPage);
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = Array.isArray(users) ? users.slice(startIndex, endIndex) : [];
  const [userToEdit, setUserToEdit] = useState(null);
  return (
    <>
      <div className="w3-container">
        <div>
          <div style={{float : 'right'}} className="px-4 py-2 mb-5 font-semibold text-gray-300  rounded">
            <input
            style={{height: 30, width: 300}}
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>

          <button
            className="px-4 py-2 mb-5 font-semibold text-gray-300 bg-blue-500 rounded"
            onClick={handleOpenAddUserModal}
          >
            Thêm người dùng mới
          </button>
        </div>



        <AddUserForm
          isOpen={isAddUserModalOpen}
          onRequestClose={handleCloseAddUserModal}
          onAddUser={handleAddUser}
        />
        <EditUserForm
          isOpen={isEditUserModalOpen}
          onRequestClose={() => setEditUserModalOpen(false)}
          onEditUser={handleEditUser}
          userToEdit={userToEdit}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setDeleteModalOpen(false)}
          onDeleteConfirm={handleDeleteConfirm}
        />
        <table className="w3-table-all">
          <thead>
            <tr>
              <th>ID</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>DOB</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user.userId}>
                <td>{(pageNumber - 1) * itemsPerPage + index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{format(new Date(user?.dateOfBirth), "PPP")}</td>
                <td>
                  <button onClick={() => handleEdit(user?.userId)}>
                    <FaUserEdit />
                  </button>
                </td>
                <td>
                  <button onClick={() =>{
                    handleDelete(user?.userId)
                  }}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={() => setPageNumber((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <span className="pagination-info">Page {pageNumber} of {totalPageCount}</span>
          <button
            className="pagination-button"
            onClick={() => setPageNumber((prevPage) => Math.min(prevPage + 1, totalPageCount))}
            disabled={pageNumber === totalPageCount}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default UserList;
