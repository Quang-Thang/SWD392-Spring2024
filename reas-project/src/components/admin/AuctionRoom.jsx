import React, { useEffect, useState } from "react";
import { getAllPost } from "../../services/PostService";
import "react-toastify/dist/ReactToastify.css";
import "./PostList.css";

const AuctionRoom = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await getAllPost(1, 9999); // Fetch all posts
      const postList = response?.data?.data || [];
      const filteredPostList = postList.filter((post) =>
        `${post.realEstateName} ${post.address} ${post.status}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setTotal(filteredPostList.length);
      setPosts(postList);
      setFilteredPosts(filteredPostList);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [pageNumber, searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const ownerFullName = posts?.owner?.fullName;

  const totalPageCount = Math.ceil(total / itemsPerPage);
  // const startIndex = (pageNumber - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const paginatedUsers = Array.isArray(users)
  //   ? users.slice(startIndex, endIndex)
  //   : [];
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
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
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
        <table className="w3-table-all">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Status</th>
              <th>Test</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((post, index) => (
              <tr key={post.realEstateId}>
                <td>{(pageNumber - 1) * itemsPerPage + index + 1}</td>
                <td>{post.realEstateName}</td>
                <td>{post.address}</td>
                <td>{post.status}</td>
                <td>{post.owner ? post.owner.fullName : ""}</td>
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
