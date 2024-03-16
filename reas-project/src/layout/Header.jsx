import Footer from "./Footer";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";

const navbar = [
  {
    title: "Trang chủ",
    link: "/",
  },
  {
    title: "Bài đăng",
    link: "/postlist",
  },
  {
    title: "Liên hệ",
    link: "/contact",
  },
];

const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    location.reload();
    // user = null;
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="h-[100px] flex items-center justify-between border-b-2 p-5">
          <div className="flex items-center gap-20">
            <img
              src="https://cdn.discordapp.com/attachments/1192751698825977880/1218439887204782120/image2-removebg-preview.png?ex=6607ab92&is=65f53692&hm=772369cfa91037bf0abe5602ca00b21634368ec5aa13bd790bdb2fa7736d24f7&"
              alt=""
              className="w-[100px] h-[80px]"
            />
            {navbar &&
              navbar.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold text-red-500"
                      : "text-xl font-semibold"
                  }
                >
                  {item.title}
                </NavLink>
              ))}
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center p-2 border justify-between rounded-md w-[500px]">
              <input
                type="text"
                className="p-2 border-gray-300 rounded-lg outline-none"
                placeholder="Search posts..."
              />
              <IoSearchOutline color="grey" size={20} />
            </div>
            {!user ? (
              <div className="flex items-center gap-5">
                <Link to="/register">
                  <button className="p-2 text-white rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Đăng ký
                  </button>
                </Link>
                <Link to="/login">
                  <button className="p-2 text-white rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Đăng nhập
                  </button>
                </Link>
              </div>
            ) : (
              <div className="relative w-[150px] ">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png"
                  alt=""
                  className="w-[60px] h-[60px] rounded-full object-cover cursor-pointer"
                  onClick={() => setShowMenu((prev) => !prev)}
                />

                {!showMenu ? (
                  ""
                ) : (
                  <div className="absolute border rounded-xl">
                    <div className="py-2 border-b-2">
                      <span className="px-5">{user?.userInfo.username}</span>
                    </div>
                    <ul className="cursor-pointer ">
                      <Link
                        to="/profile"
                        className="flex items-center hover:bg-slate-200"
                      >
                        <ImProfile /> <li className="px-5 py-1 ">Hồ sơ</li>
                      </Link>

                      <li
                        className="px-5 border-b-1 hover:bg-slate-200"
                        onClick={handleLogout}
                      >
                        <span className="flex items-center gap-4">
                          <IoIosLogOut />
                          Đăng xuất
                        </span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* <button
                  onClick={handleLogout}
                  className="p-2 text-white rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                >
                  Thoát
                </button> */}
              </div>
            )}
          </div>
        </div>
        <Outlet></Outlet>
        <Footer />
      </div>
    </>
  );
};

export default Header;
