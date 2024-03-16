import axios from "./customizeAxios";

const getAllPost = (page = 1, pageSize = 10) => {
  return axios.get(`/real-estates?page=${page}&pageSize=${pageSize}`);
};

const getPostById = (id) => {
  return axios.get(`/real-estates/${id}`);
};

export { getAllPost, getPostById };
