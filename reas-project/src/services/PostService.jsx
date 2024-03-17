import axios from "./customizeAxios";

const getAllPost = () => {
  return axios.get("/auctions?Page=1&PageSize=10");
};

const getPostById = (id) => {
  return axios.get(`/auctions/${id}`);
};

export { getAllPost, getPostById };
