import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";

const navbar = [
  {
    title: "Trang Admin",
    link: "/admin",
  },
  {
    title: "Bài đăng",
    link: "/postlist",
  },
];

const Dashboardview = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  console.log(user.userInfo.role);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    location.reload();
    // user = null;
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="h-[100px] flex items-end border-b-2 p-5 relative">
          <div className="absolute flex items-end gap-10 right-7 top-7">
            {!user ? (
              <div className="flex items-center gap-5 ">
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
                        <div>
                          <div className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200">
                            <Link to="/admin">Trang quản trị</Link>
                          </div>
                          <div className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200">
                            <Link to="/">Trang chủ</Link>
                          </div>
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
          {/* <div className="flex items-center gap-20">
            <img
              src="https://seeklogo.com/images/F/fpt-logo-5B8F17203A-seeklogo.com.png"
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
          </div> */}
          {/* <div className="flex items-center gap-10">
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

                      {user.userInfo.role == "Admin" ? (
                        <div>
                          <Link to="/admin">Trang quản trị</Link>
                        </div>
                      ) : (
                        ""
                      )}

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
              </div>
            )}
          </div> */}
        </div>
        {user ? (
          <Outlet></Outlet>
        ) : (
          <div>
            <Link to="/">Cook</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboardview;
