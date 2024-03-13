import React from "react";
import Sidebar from "../components/admin/Sidebar";
import Dashboardview from "../components/admin/Dashboardview";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import DashboardContent from "../components/admin/DashboardContent";

const AdminDashboardLayout = () => {
  return (
    <>
      <div className="flex">
        <div className="basis-[15%]">
          <Sidebar />
        </div>
        <div className="basis-[85%] border">
          <Dashboardview />
          <div className="p-5 border m-5">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardLayout;
