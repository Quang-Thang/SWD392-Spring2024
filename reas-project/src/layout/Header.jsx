import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";

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
  const handleLogout = () => {
    location.reload();
  };

  const user = useSelector((state) => state.auth.login.currentUser);
  console.log("User at header: ", user);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="h-[100px] flex items-center justify-between mb-10 border-b-2 p-5">
          <div className="flex items-center gap-20">
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
              <div>
                <h1>{user?.userInfo.username}</h1>
                <button
                  onClick={handleLogout}
                  className="p-2 text-white rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                >
                  Thoát
                </button>
              </div>
            )}
          </div>
        </div>
        <Outlet></Outlet>
        <footer className="bg-[#121212] text-white py-10 mt-auto">
          <div className="container flex flex-wrap mx-auto">
            <div className="w-full mb-6 lg:w-1/3 lg:mb-0">
              <h2 className="mb-4 text-2xl font-bold">About Us</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className="w-full mb-6 lg:w-1/3 lg:mb-0">
              <h2 className="mb-4 text-2xl font-bold">Contact</h2>
              <p>Email: </p>
              <p>Phone: +84 906281412</p>
            </div>

            <div className="w-full lg:w-1/3">
              <h2 className="mb-4 text-2xl font-bold">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-gray-400">
                  Facebook
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  Twitter
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 text-center border-t border-gray-600">
            <p>&copy; 2024 Real Estate Auction. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Header;
