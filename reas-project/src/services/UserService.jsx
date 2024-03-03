import axios from "./customizeAxios";

const getUserById = (id) => {
  return axios.get(`/Users/${id}`);
};

const getUserList = (page = 1, pageSize = 10) => {
  return axios.get(`/staffs?page=${page}&pageSize=${pageSize}`);
};
const createUser = (newUser) => {
  return axios.post("/staffs", newUser);
};
const editUser = async (userToEdit) => {
  const response = await axios.put(`/staffs/${userToEdit.userId}`, userToEdit);
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`/staffs/${userId}`);
  return response.data;
};

export { getUserById, getUserList, createUser, editUser, deleteUser };
