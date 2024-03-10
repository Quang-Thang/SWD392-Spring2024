import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <>
      <div className="flex items-center justify-between py-5 mx-5 text-gray-500 border-b-2 border-gray-300">
        <div className="flex items-center gap-x-4">
          <span>Contact: 024 3275 234</span>
          <span>Email: reas@fpt.edu.vn</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <span className="mx-2">Hello, {user.userInfo.email}</span>
          <span>
            <FaChevronDown />
          </span>
        </div>
      </div>
      <div className="flex items-center mt-10 gap-x-40">
        <div className="px-5">
          <img
            src="https://seeklogo.com/images/F/fpt-logo-5B8F17203A-seeklogo.com.png"
            alt=""
            className="w-[150px] h-[80px]"
          />
        </div>
        <div>
          <div>
            <Dropdown />
          </div>
        </div>
      </div>
      <div>
        <Navbar />
      </div>
      <h3 className="mx-10 mt-5 text-gray-400">Home Page / Account</h3>
    </>
  );
};

export default Header;
