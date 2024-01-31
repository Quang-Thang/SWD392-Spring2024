import axios from "./customizeAxios";

const getUserById = (id) => {
  return axios.get(`/api/User/${id}`);
};

export { getUserById };
