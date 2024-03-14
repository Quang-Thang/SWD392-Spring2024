import axios from "./customizeAxios";

const getAllPost = () => {
  return axios.get("/real-estates?Page=5&PageSize=5");
};

const getPostById = (id) => {
  return axios.get(`/real-estates/${id}`);
};

export { getAllPost, getPostById };
