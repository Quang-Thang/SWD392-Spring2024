import React from "react";
import Sidebar from "../components/admin/Sidebar";
import Dashboardview from "../components/admin/Dashboardview";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex">
        <div className="basis-[12%] h-[100vh]">
          <Sidebar />
        </div>
        <div className="basis-[88%] border">
          <Dashboardview />
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
