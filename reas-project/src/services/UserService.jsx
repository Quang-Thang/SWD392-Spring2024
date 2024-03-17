import axios from "./customizeAxios";

const getUserById = (id) => {
  return axios.get(`/Users/${id}`);
};

const getUserList = (page = 1, pageSize = 10) => {
  return axios.get(`/users?page=${page}&pageSize=${pageSize}`);
};

const createUser = (newUser) => {
  return axios.post("/users", {
    username: newUser?.username,
    email: newUser?.email,
    password: newUser?.password,
    confirmPassword: newUser?.confirmPassword,
    role: newUser?.role || "Member",
    gender: newUser?.gender,
    dateOfBirth: newUser?.dateOfBirth,
    citizenId: newUser?.citizenId,
    firstName: newUser?.firstName,
    lastName: newUser?.lastName,
    phoneNumber: newUser?.phoneNumber,
  });
};

const editUser = async (userToEdit) => {
  const response = await axios.put(`/users/${userToEdit.userId}`, {
    username: userToEdit?.username,
    email: userToEdit?.email,
    password: userToEdit?.password,
    confirmPassword: userToEdit?.confirmPassword,
    role: userToEdit?.role,
    gender: userToEdit?.gender,
    dateOfBirth: userToEdit?.dateOfBirth,
    citizenId: userToEdit?.citizenId,
    firstName: userToEdit?.firstName,
    lastName: userToEdit?.lastName,
    phoneNumber: userToEdit?.phoneNumber,
  });
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`/users/${userId}`);
  return response.data;
};

const getAdmins = async (page = 1, pageSize = 30) => {
  const response = await axios.get(`/admins?Page=${page}&PageSize=${pageSize}`);
  return response?.data;
};
const getStaffs = async (page = 1, pageSize = 30) => {
  const response = await axios.get(`/staffs?Page=${page}&PageSize=${pageSize}`);
  return response?.data;
};
const getMembers = async (page = 1, pageSize = 30) => {
  const response = await axios.get(
    `/members?Page=${page}&PageSize=${pageSize}`
  );
  return response?.data;
};

const getOwners = async () => {
  try {
    const response = await fetch(
      "https://swdprojectapi.azurewebsites.net/api/owners"
    );
    const data = await response.json();
    return data.map((owner) => ({
      realEstateOwnerId: owner.realEstateOwnerId,
      fullName: owner.fullName,
    }));
  } catch (error) {
    console.error("Error fetching owners:", error);
    throw error;
  }
};
const getAdminId = async () => {
  try {
    const response = await fetch(
      "https://swdprojectapi.azurewebsites.net/api/admins"
    );
    const data = await response.json();
    return data.map((admin) => ({
      userId: admin.userId,
      firstName: admin.firstName,
      lastName: admin.lastName,
    }));
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};
export {
  getUserById,
  getUserList,
  createUser,
  editUser,
  deleteUser,
  getAdmins,
  getStaffs,
  getMembers,
  getOwners,
  getAdminId,
};
