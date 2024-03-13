import React, { useEffect, useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import Datepicker from "react-datepicker";
import { PiSignOut } from "react-icons/pi";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/APIRequest";
import axios from "axios";

const data = [
  {
    name: "Notification",
    icon: <IoNotificationsSharp />,
  },
  {
    name: "Account Information",
    icon: <FaCalendarAlt />,
  },
  {
    name: "My Auction",
    icon: <RiAuctionFill />,
  },
  {
    name: "Auction Property",
    icon: <BsBuilding />,
  },
  {
    name: "Transaction",
    icon: <FaMoneyBill />,
  },
  {
    name: "Logout",
    icon: <PiSignOut />,
  },
];

const UserInformation = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const maxDate = new Date();

  console.log("user in profile: ", user.userInfo.username);

  // useEffect(() => {
  //   try {
  //     const res = getAllUsers(user.token, dispatch);
  //     if (res) {
  //       console.log("Success res: ", res);
  //     } else {
  //       console.log("Faill");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <>
      <h1 className="mx-5 text-black">Account Setting</h1>
      <div className="flex">
        <div className="basis-[20%] bg-primary mx-5 rounded-lg">
          <div className="relative flex flex-col items-center pb-24 text-gray-200">
            <span className="mt-2 ">{user.userInfo.username}</span>
            <span className="mt-2">{user.userInfo.role}</span>

            <img
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="absolute mx-auto rounded-full w-44 h-44 top-20"
            />
          </div>
          <div className="w-full h-32 bg-white "></div>
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-3 text-white border-t-2 border-gray-200 border-y-4 gap-x-3 hover:bg-white hover:text-black"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div className="basis-[80%] border-2 border-slate-100 p-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button className="px-4 py-2 text-white border rounded-full bg-primary hover:bg-white hover:text-black hover:border-black hover:border">
              Update
            </button>
          </div>
          <div>
            <div className="grid grid-cols-3 mt-10 gap-x-4">
              <input
                type="text"
                placeholder="Family name"
                className="px-4 py-2 border rounded-md outline-none border-slate-200"
              />
              <input
                type="text"
                placeholder="Middle name"
                className="px-4 py-2 border rounded-md outline-none border-slate-200"
              />
              <input
                type="text"
                placeholder="Last name"
                className="px-4 py-2 border rounded-md outline-none border-slate-200"
              />
            </div>
            <div className="grid grid-cols-3 mt-10 gap-x-4">
              <label>
                <Datepicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  maxDate={maxDate}
                  placeholderText="Date of Birth"
                  className="px-4 py-2 border rounded-md outline-none border-slate-200 "
                  icon={<FaCalendarAlt />}
                />
              </label>
              <select
                className="px-4 py-2 border rounded-md outline-none border-slate-200 text-slate-400"
                placeholder="Gender"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
              <input
                type="text"
                placeholder="Telephone"
                className="px-4 py-2 border rounded-md outline-none border-slate-200"
              />
            </div>
            <div className="grid grid-cols-3 mt-10 gap-x-4">
              <input
                type="text"
                placeholder="Email"
                className="col-span-2 px-4 py-2 border rounded-md outline-none border-slate-200"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                className="px-4 py-2 border rounded-md outline-none border-slate-200"
              />
            </div>
            <div className="grid mt-10 gap-x-4">
              <input
                type="text"
                placeholder="Address"
                className="px-4 py-2 border rounded-md outline-none border-slate-200"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInformation;
