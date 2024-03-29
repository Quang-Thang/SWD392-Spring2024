import React from "react";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import Sidebar from "../components/post_list/Sidebar";
import PostItem from "../components/post_list/PostItem";

const PostList = () => {
  return (
    <>
      <div className="mt-10 px-28">
        <h1 className="mb-10 text-3xl font-semibold">Danh sách cuộc đấu giá</h1>
        <div className="gap-8 pt-5 border-t-2 ">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default PostList;
