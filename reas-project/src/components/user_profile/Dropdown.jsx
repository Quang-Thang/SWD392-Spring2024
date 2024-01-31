import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Dropdown = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center rounded-full shadow-lg">
        <div className="relative flex flex-col items-center w-[200px] h-[50px] rounded-bl-full rounded-tl-full">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center justify-between w-full px-4 py-2 text-lg font-normal tracking-wider duration-300 border-4 border-transparent rounded-tl-full rounded-bl-full active:border-blue-300 active:text-white"
          >
            List
            {!open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </button>
          {isOpen && (
            <div className="absolute flex flex-col items-start w-full p-2 bg-blue-400 rounded-lg top-14">
              {data.map((item, index) => (
                <div key={index}>
                  <h3>{item.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
        <form className="relative w-[500px]">
          <div className="relative rounded-full">
            <input
              type="search"
              placeholder="Search..."
              className="w-full py-3 rounded-tr-full rounded-br-full outline-none "
            />
            <button className="absolute right-0 px-3 py-3 -translate-y-1/2 rounded-full top-1/2 bg-slate-800">
              <FaSearch color="white" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dropdown;
