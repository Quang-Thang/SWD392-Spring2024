import axios from "./customizeAxios";

const getAllPost = () => {
  return axios.get("/api/real-estates?Page=5&PageSize=5");
};

const getPostById = (id) => {
  return axios.get(`/api/real-estates/${id}`);
};

export { getAllPost, getPostById };
