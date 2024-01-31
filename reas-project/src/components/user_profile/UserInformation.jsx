import React, { useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import Datepicker from "react-datepicker";
import { PiListFill } from "react-icons/pi";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

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
    icon: <PiListFill />,
  },
  {
    name: "Auction Property",
    icon: <PiListFill />,
  },
  {
    name: "Transaction",
    icon: <PiListFill />,
  },
  {
    name: "Logout",
    icon: <PiListFill />,
  },
];

const UserInformation = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const maxDate = new Date();

  return (
    <>
      <h1 className="mx-5 text-white">Account Setting</h1>
      <div className="flex">
        <div className="basis-[20%] bg-primary mx-5 rounded-lg">
          <div className="relative flex flex-col items-center pb-24 text-gray-200">
            <span className="mt-2 ">Bala bruh</span>
            <span className="mt-2">Customer</span>

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
              className="flex items-center p-3 text-white border-t-2 border-gray-200 gap-x-3 hover:bg-white hover:text-black"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
          <div></div>
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
                  className="border border-slate-200 py-2 px-4 w-[440px] outline-none rounded-md"
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
                className="col-span-1 px-4 py-2 border rounded-md outline-none border-slate-200"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInformation;
