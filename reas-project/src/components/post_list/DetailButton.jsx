import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DetailButton = ({ postId }) => {
  const navigate = useNavigate();
  const [auctionPostId, setAuctionPostIdPostId] = useState("");

  const handleClick = () => {
    navigate("/postDetail", { state: { postId } });
    console.log(postId);
  };
  useEffect(() => {
    setAuctionPostIdPostId(postId);
  }, []);
  return (
    <>
      <button
        onClick={handleClick}
        className="px-4 py-2 font-extrabold text-white bg-red-700 rounded-lg"
      >
        Chi tiết
      </button>
    </>
  );
};

export default DetailButton;
