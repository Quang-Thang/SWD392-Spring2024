import axios from "./customizeAxios";

const getAllPost = () => {
  return axios.get("/real-estates?Page=1&PageSize=10");
};

const getPostById = (id) => {
  return axios.get(`/real-estates/${id}`);
};
const createPost = (newPost) => {
  return axios.post("/real-estates", {
    realEstateName: newPost?.realEstateName,
    address: newPost?.address,
    status: newPost?.status,
    imageUrl: newPost?.imageUrl,
    description: newPost?.description,
    realEstateId: newPost?.realEstateId,
    ownerId: newPost?.ownerId,
  });
};

const editPost = async (PostToEdit) => {
  const response = await axios.put(`/real-estates/${PostToEdit.realEstateId}`, {
    realEstateName: PostToEdit?.realEstateName,
    address: PostToEdit?.address,
    status: PostToEdit?.status,
    imageUrl: PostToEdit?.imageUrl,
    description: PostToEdit?.description,
    ownerId: PostToEdit?.ownerId,
  });
  return response.data;
};

const deletePost = async (postId) => {
  const response = await axios.delete(`/real-estates/${postId}`);
  return response.data;
};

export { getAllPost, getPostById, deletePost, createPost, editPost };
