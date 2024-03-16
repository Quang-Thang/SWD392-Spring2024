import React, { useEffect } from "react";
import CardItem from "./CardItem";
import GraphDashboard from "./Graph";
import {
  getAdmins,
  getMembers,
  getStaffs,
  getUserList,
} from "../../services/UserService";

const DashboardContent = () => {
  const [admin, setAdmin] = React.useState([]);
  const [staff, setStaff] = React.useState([]);
  const [member, setMember] = React.useState([]);

  const fetchAdminData = async () => {
    try {
      const response = await getAdmins();
      setAdmin(response?.data);
      // console.log("Response:", response?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetcStaffData = async () => {
    try {
      const response = await getStaffs();
      setStaff(response?.data);
      // console.log("Response:", response?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchMemberData = async () => {
    try {
      const response = await getMembers();
      setMember(response?.data);
      // console.log("Response:", response?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchAdminData();
    fetcStaffData();
    fetchMemberData();
  }, []);

  const data = [
    { id: "1", title: "Total Admin", value: admin?.length || 0, type: "user" },
    { id: "2", title: "Total Staff", value: staff?.length || 0, type: "user" },
    {
      id: "3",
      title: "Total Member",
      value: member?.length || 0,
      type: "estate",
    },
    {
      id: "4",
      title: "Total User",
      value: admin?.length + staff?.length + member?.length || 0,
      type: "estate",
    },
  ];
  const piegraph = [admin?.length, staff?.length, member?.length];

  // console.log([admin?.length, staff?.length, member?.length]);

  const linegraph = [
    {
      name: "This year",
      data: [30, 40, 25, 50, 49, 21, 70, 51, 49, 60, 70, 91],
    },
    {
      name: "Last year",
      data: [20, 30, 25, 40, 30, 21, 60, 51, 40, 60, 70, 91],
    },
  ];

  return (
    <>
      <CardItem data={data} />
      <div className="grid gap-4 mt-5 md:grid-cols-2 lg:grid-cols-7"></div>
      <GraphDashboard
        linegraph={linegraph}
        piegraph={[admin?.length, staff?.length, member?.length]}
      />
    </>
  );
};

export default DashboardContent;
