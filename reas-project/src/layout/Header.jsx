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
              <div className="relative">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png"
                  alt=""
                  className="object-cover w-12 h-12 rounded-full cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu && (
                  <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        <ImProfile className="inline-block mr-2" /> Hồ sơ
                      </Link>
                      {user.userInfo.role == "Admin" ? (
                        <div className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200">
                          <Link to="/admin">Trang quản trị</Link>
                        </div>
                      ) : (
                        ""
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                      >
                        <IoIosLogOut className="inline-block mr-2" /> Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
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
