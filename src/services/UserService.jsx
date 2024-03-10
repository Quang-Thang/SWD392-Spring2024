import axios from "./customizeAxios";

const getUserById = (id) => {
  return axios.get(`/api/User/${id}`);
};

const getUserList = () => {
  return axios.get("/members");
};

export { getUserById, getUserList };
