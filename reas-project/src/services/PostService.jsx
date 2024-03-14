import axios from "./customizeAxios";

const getAllPost = () => {
  return axios.get("/real-estates?Page=1&PageSize=10");
};

const getPostById = (id) => {
  return axios.get(`/real-estates/${id}`);
};

export { getAllPost, getPostById };
