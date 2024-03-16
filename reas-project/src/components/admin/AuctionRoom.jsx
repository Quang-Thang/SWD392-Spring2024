import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import {
  getAllPost,
  createPost,
  editPost,
  deletePost,
} from "../../services/PostService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PostList.css";
import AddPostForm from "./AddPostForm";
import EditPostForm from "./EditPostForm";
import DeletePostConfirmationModal from "./DeletePostConfirmationModal";
const AuctionRoom = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [isAddPostModalOpen, setAddPostModalOpen] = useState(false);
  const [isEditPostModalOpen, setEditPostModalOpen] = useState(false);
  const [isDeletePostModalOpen, setDeletePostModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPostData = async () => {
    try {
      const response = await getAllPost(1, 9999); // Fetch all posts
      const postList = response?.data?.data || [];
      const filteredPostList = postList.filter((post) =>
        `${post.realEstateName} ${post.status} ${post.address}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setTotal(filteredPostList.length);
      setPosts(postList);
      setFilteredPosts(filteredPostList);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [pageNumber, searchQuery]);

  const handleEdit = (realEstateId) => {
    const post = posts.find((u) => u.realEstateId === realEstateId);

    if (post) {
      setPostToEdit(post);
      setEditPostModalOpen(true);
    } else {
      console.error(`Post with ID ${realEstateId} not found.`);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditPost = async (editedPost) => {
    console.log(editedPost);
    // {
    //   userId: 'cf41890d-a58d-48c0-b14f-08dc427117a7',
    //   username: 'string12345',
    //   email: 'user1341@example.com',
    //   firstName: 'string',
    //   lastName: 'string',
    //   gender: 'Male',
    //   dateOfBirth: '3/12/2024',
    //   citizenId: 'string',
    //   role: 'Member',
    //   phoneNumber: 'string'
    // }
    try {
      console.log(editedPost);
      if (!editedPost || !editedPost.realEstateId) {
        console.error("Edited post or post ID is undefined.");
        toast.error("Error updating post. Please try again.");
        return;
      }

      editPost(editedPost)
        .then((response) => {
          console.log(response);
          fetchPostData();
          toast.success("Post updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating post:", error);
          toast.error("Error updating post. Please try again.");
        });
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Error updating post. Please try again.");
    } finally {
      setEditPostModalOpen(false);
    }
  };

  const handleOpenAddPostModal = () => {
    setAddPostModalOpen(true);
  };

  const handleCloseAddPostModal = () => {
    setAddPostModalOpen(false);
  };

  const handleAddPost = async (newPost) => {
    try {
      await createPost(newPost);
      fetchPostData();
      toast.success("Post added successfully!");
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("Error adding post. Please try again.");
    } finally {
      handleCloseAddPostModal();
    }
  };
  const handleDelete = (postId) => {
    const post = posts.find((u) => u.realEstateId === postId);

    console.log(post, postId);

    if (post) {
      setPostToDelete(post);
      setDeletePostModalOpen(true);
    } else {
      console.error(`Post with ID ${postId} not found.`);
    }
  };

  const handleDeleteConfirm = () => {
    console.log(postToDelete);
    if (postToDelete) {
      try {
        deletePost(postToDelete.postId)
          .then((response) => {
            console.log(response);
            fetchPostData();
            toast.success("Post deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting {post}:", error);
            toast.error("Error deleting post. Please try again.");
          });
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Error deleting post. Please try again.");
      } finally {
        setDeletePostModalOpen(false);
      }
    }
  };

  const totalPageCount = Math.ceil(total / itemsPerPage);
  // const startIndex = (pageNumber - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const paginatedUsers = Array.isArray(users)
  //   ? users.slice(startIndex, endIndex)
  //   : [];
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  const [postToEdit, setPostToEdit] = useState(null);
  return (
    <>
      <div className="w3-container">
        <div>
          <div
            style={{ float: "right" }}
            className="px-4 py-2 mb-5 font-semibold text-gray-300 rounded"
          >
            <input
              style={{ height: 30, width: 300 }}
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>

          <button
            className="px-4 py-2 mb-5 font-semibold text-gray-300 bg-blue-500 rounded"
            onClick={handleOpenAddPostModal}
          >
            Thêm đấu giá mới
          </button>
        </div>

        <AddPostForm
          isOpen={isAddPostModalOpen}
          onRequestClose={handleCloseAddPostModal}
          onAddPost={handleAddPost}
        />
        <EditPostForm
          isOpen={isEditPostModalOpen}
          onRequestClose={() => setEditPostModalOpen(false)}
          onEditPost={handleEditPost}
          postToEdit={postToEdit}
        />
        <DeletePostConfirmationModal
          isOpen={isDeletePostModalOpen}
          onRequestClose={() => setDeletePostModalOpen(false)}
          onDeleteConfirm={handleDeleteConfirm}
        />
        <table className="w3-table-all">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>STATUS</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((post, index) => (
              <tr key={post.realEstateId}>
                <td>{(pageNumber - 1) * itemsPerPage + index + 1}</td>
                <td>{post.realEstateName}</td>
                <td>{post.address}</td>
                <td>{post.status}</td>
                <td>
                  <button onClick={() => handleEdit(post?.realEstateId)}>
                    <FaUserEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(post?.realEstateId);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={() =>
              setPageNumber((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {pageNumber} of {totalPageCount}
          </span>
          <button
            className="pagination-button"
            onClick={() =>
              setPageNumber((prevPage) =>
                Math.min(prevPage + 1, totalPageCount)
              )
            }
            disabled={pageNumber === totalPageCount}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AuctionRoom;
