import React from "react";
import CardItem from "./CardItem";
import Overview from "./Overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import RecentSales from "./RecentSales";

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-5">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardContent;
