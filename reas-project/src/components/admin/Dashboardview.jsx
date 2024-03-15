import { FaBell, FaEnvelope, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Dashboardview = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  console.log(user);
  return (
    <div className="flex items-center justify-between h-20 px-6 shadow-lg">
      <div className="flex items-center rounded-md ">
        <input
          type="text"
          className="bg-[#F8F9FC] h-10 outline-none pl-3 w-96 rounded-md placeholder:text-sm leading-5 font-normal"
          placeholder="Search for..."
        />
        <div className="bg-[#4E73DF] h-10 px-4 flex items-center justify-center cursor-pointer rounded-tr-md rounded-br-md">
          <FaSearch color="white" />
        </div>
      </div>
      <div className="relative flex items-center gap-4 ">
        <div className="flex items-center gap-6 pr-6 border-r-2">
          <FaBell />
          <FaEnvelope />
        </div>
        <div className="relative flex items-center gap-4">
          <p>Douglas McGee</p>
          <div className="h-12 w-12 rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center relative">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardview;
