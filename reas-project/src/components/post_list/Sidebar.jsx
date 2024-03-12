import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <>
      <div className="p-5 rounded-lg bg-slate-100">
        <h1 className="p-5 text-2xl font-semibold">Tìm kiếm</h1>
        <div className="flex items-center justify-between px-5 py-2 bg-white rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Nhập từ khóa..."
            className="w-full outline-none"
          />
          <IoSearchSharp size={25} className="cursor-pointer" />
        </div>
      </div>
      <div className="p-5 my-10 rounded-lg bg-slate-100">
        <h1 className="p-5 text-2xl font-semibold">Trạng thái tài sản</h1>
        <div className="p-5">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="asset-status-1"
              className="mr-2 accent-blue-500"
            />
            <label for="asset-status-1">Sắp diễn ra</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="asset-status-2"
              className="mr-2 accent-green-600"
            />
            <label for="asset-status-2">Đang hoạt động</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="asset-status-3"
              className="mr-2 accent-red-500"
            />
            <label for="asset-status-3">Đã thanh lý</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
