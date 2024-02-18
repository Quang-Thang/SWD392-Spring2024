import {
  FaTachometerAlt,
  FaRegSun,
  FaChevronRight,
  FaWrench,
  FaChartBar,
  FaStickyNote,
  FaCalendarAlt,
  FaChevronLeft,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#4E73DF] h-screen px-[25px] ">
      <div className="px-[10px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
        <h1 className="text-xl font-extrabold leading-6 text-white cursor-pointer">
          <Link to="/admin">Trang Quản Trị</Link>
        </h1>
      </div>
      <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <FaTachometerAlt color="white" />
        <p className="text-sm font-bold leading-5 text-white">Dashboard</p>
      </div>
      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-4 text-white/[0.4]">
          INTERFACE
        </p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaRegSun color="white" />
            <p className="text-[14px] leading-5 font-normal text-white">
              Components
            </p>
          </div>
          <FaChevronRight color="white" />
        </div>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaUser color="white" />
            <p className="text-[14px] leading-5 font-normal text-white">
              <Link to="/admin/userList">Quản lý người dùng</Link>
            </p>
          </div>
          <FaChevronRight color="white" />
        </div>
      </div>

      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-4 text-white/[0.4]">
          ADDONS
        </p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaStickyNote color="white" />
            <p className="text-[14px] leading-5 font-normal text-white">
              Pages
            </p>
          </div>
          <FaChevronRight color="white" />
        </div>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaChartBar color="white" />
            <p className="text-[14px] leading-5 font-normal text-white">
              Charts
            </p>
          </div>
          <FaChevronRight color="white" />
        </div>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaCalendarAlt color="white" />
            <p className="text-[14px] leading-5 font-normal text-white">
              Tables
            </p>
          </div>
          <FaChevronRight color="white" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center mt-4">
          <div className="h-10 w-10 bg-[#3C5EC1] rounded-full flex items-center justify-center cursor-pointer">
            <FaChevronLeft color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
