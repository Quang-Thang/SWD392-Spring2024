import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import PostItem from "./PostItem";
import { useDebounce } from "use-debounce";

const Sidebar = () => {
  const [inputText, setInputText] = useState("");
  const [value] = useDebounce(inputText, 500);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

  const handleCheck = (data) => {
    if (data == "first") {
      console.log("First is: ", first);
      setFirst(!first);
    }
    if (data == "second") {
      setSecond(!second);
      console.log("Second is: ", second);
    }
    if (data == "third") {
      setThird(!third);
      console.log("Third is: ", third);
    }
  };

  return (
    <>
      <div className="flex gap-5">
        <div className="basis-[30%]">
          <div className="p-5 rounded-lg bg-slate-100">
            <h1 className="p-5 text-2xl font-semibold">Tìm kiếm</h1>
            <div className="pl-5">
              <div className="flex items-center justify-between px-5 py-2 bg-white rounded-lg shadow-lg">
                <input
                  type="text"
                  placeholder="Nhập từ khóa..."
                  className="w-full outline-none"
                  onChange={(e) => setInputText(e.target.value)}
                />
                <IoSearchSharp size={25} color="grey" />
              </div>
            </div>
          </div>
          <div className="p-5 my-10 rounded-lg bg-slate-100">
            <h1 className="p-5 text-2xl font-semibold">Trạng thái tài sản</h1>
            <div className="pl-5">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="asset-status-1"
                  className="w-5 h-5 mr-2 accent-blue-600"
                  value={first}
                  onChange={() => handleCheck("first")}
                />
                <label for="asset-status-1">Sắp diễn ra</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="asset-status-2"
                  className="w-5 h-5 my-3 mr-2 accent-green-600"
                  value={second}
                  onChange={() => handleCheck("second")}
                />
                <label for="asset-status-2">Đang diễn ra</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="asset-status-3"
                  className="w-5 h-5 mr-2 accent-red-500"
                  value={third}
                  onChange={() => handleCheck("third")}
                />
                <label for="asset-status-3">Đã thanh lý</label>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[70%]">
          <PostItem
            searchValue={value}
            upcoming={first}
            ongoing={second}
            over={third}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
