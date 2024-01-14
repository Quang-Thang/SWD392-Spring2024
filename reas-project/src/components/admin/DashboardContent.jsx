import { FaEllipsisV, FaRegCalendarMinus } from "react-icons/fa";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PieComponent from "./PieComponent";

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
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const DashboardContent = () => {
  return (
    <div className="pt-6 px-6 bg-[#F8F9FC]">
      <div className="flex items-center justify-between">
        <h1 className="text-[#5a5c69] text-xl leading-9 font-normal cursor-pointer">
          Dashboad
        </h1>
        <button className="bg-[#2E59D9] h-8 rounded text-white flex items-center justify-center px-8 cursor-pointer">
          Generate Report
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8 pb-4 mt-6 ">
        <div className="h-24 rounded-lg bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-7 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-xs leading-4 font-bold ">
              EARNINGS (MONTHLY)
            </h2>
            <h1 className="text-xl leading-6 font-bold text-[#5a5c69] mt-1 ">
              $40,000
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color="" />
        </div>
        <div className="h-24 rounded-lg bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-7 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1cc88a] text-xs leading-4 font-bold ">
              EARNINGS (ANNUNAL)
            </h2>
            <h1 className="text-xl leading-6 font-bold text-[#5a5c69] mt-1 ">
              $240,000
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color="" />
        </div>
        <div className="h-24 rounded-lg bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-7 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-xs leading-4 font-bold ">
              EARNINGS (MONTHLY)
            </h2>
            <h1 className="text-xl leading-6 font-bold text-[#5a5c69] mt-1 ">
              $40,000
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color="" />
        </div>
        <div className="h-24 rounded-lg bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-7 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-xs leading-4 font-bold ">
              EARNINGS (MONTHLY)
            </h2>
            <h1 className="text-xl leading-6 font-bold text-[#5a5c69] mt-1 ">
              $40,000
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color="" />
        </div>
      </div>
      <div className="flex w-full mt-6 gap-7 ">
        <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded ">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-4 px-5 border-b-2 border-[#EDEDED] mb-5 ">
            <h2>Earings Overview</h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div>
            <LineChart
              width={1150}
              height={500}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
        <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded ">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-4 px-5 border-b-2 border-[#EDEDED]">
            <h2>Revenue Resources</h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="pl-9 ">
            <PieComponent />
          </div>
        </div>
      </div>
      <div className="flex w-full mt-5 gap-7 ">
        <div className="basis-[55%] border bg-white shadow-md cursor-pointer rounded ">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-4 px-5 border-b-2 border-[#EDEDED]">
            <h2>Project Overview</h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
        </div>
        <div className="basis-[45%] border">d</div>
      </div>
    </div>
  );
};

export default DashboardContent;
