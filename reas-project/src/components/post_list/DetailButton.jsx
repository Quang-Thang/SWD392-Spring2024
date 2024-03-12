import React from "react";
import { Link } from "react-router-dom";

const DetailButton = ({ id }) => {
  const handleClick = () => {
    console.log(id);
  };
  return (
    <>
      <Link to="/postDetail">
        <button
          onClick={handleClick}
          className="px-4 py-2 font-extrabold text-white bg-red-700 rounded-lg"
        >
          Chi tiết
        </button>
      </Link>
    </>
  );
};

export default DetailButton;
