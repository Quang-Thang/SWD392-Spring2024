import React from "react";
import CardItem from "./CardItem";

const DashboardContent = () => {
  const data = [
    { title: "Total Users this week", value: 10 },
    { title: "Total Users this month", value: 50 },
    { title: "Total real estate was sold this week", value: 5 },
    { title: "Total real estate was sold this month", value: 20 },
  ];

  return (
    <>
      <CardItem data={data} />
      <div className="grid gap-4 mt-5 md:grid-cols-2 lg:grid-cols-7"></div>
    </>
  );
};

export default DashboardContent;
