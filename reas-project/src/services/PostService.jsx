import axios from "./customizeAxios";

const getAllPost = () => {
  return axios.get("/auctions?Page=1&PageSize=10");
};

const getPostById = (id) => {
  return axios.get(`/auctions/${id}`);
};

const createPost = (newPost) => {
  return axios.post("/auctions", {
    adminId: newPost?.adminId,
    title: newPost?.title,
    status: newPost?.status,
    description: newPost?.description,
    registrationPeriodEnd: newPost?.registrationPeriodEnd,
    registrationPeriodStart: newPost?.registrationPeriodStart,
    initialPrice: newPost?.initialPrice,
    auctionPeriodStart: newPost?.auctionPeriodStart,
    auctionPeriodEnd: newPost.auctionPeriodEnd,
    incrementalPrice: newPost.incrementalPrice,
    realEstateCode: newPost.realEstateCode,
    ownerId: newPost.ownerId,
  });
};

const editPost = async (postToEdit) => {
  const response = await axios.put(`/auctions/${postToEdit.auctionId}`, {
    title: postToEdit?.title,
    description: postToEdit?.description,
    realEstateCode: postToEdit?.realEstateCode,
    address: postToEdit?.address,
    thumbnailUrl: postToEdit?.thumbnailUrl,
    registrationPeriodStart: postToEdit?.registrationPeriodStart,
    registrationPeriodEnd: postToEdit?.registrationPeriodEnd,
    initialPrice: postToEdit?.initialPrice,
    listingDate: postToEdit?.listingDate,
    auctionPeriodStart: postToEdit?.auctionPeriodStart,
    auctionPeriodEnd: postToEdit?.auctionPeriodEnd,
    incrementalPrice: postToEdit?.incrementalPrice,
    status: postToEdit?.status,
    ownerId: postToEdit?.ownerId,
  });
  return response.data;
};

const deletePost = async (postId) => {
  const response = await axios.delete(`/auctions/${postId}`);
  return response.data;
};

export { getAllPost, getPostById, deletePost, createPost, editPost };
