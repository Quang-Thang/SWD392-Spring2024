import { Button } from "@mui/material";
import { FaSync } from "react-icons/fa";
import { OverviewSales } from "./Graph/LineChart";
import { UserRoles } from "./Graph/PieChart";

export default function GraphDashboard({ linegraph, piegraph }) {
  return (
    <div className="grid gap-8 mt-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-2 p-6 bg-white border rounded-lg shadow-sm">
        <div className="flex justify-between gap-4 space-y-8">
          <h2 className="text-2xl font-bold text-slate-700">Sales</h2>
          <Button color="inherit" size="small" startIcon={<FaSync />}>
            Sync
          </Button>
        </div>
        <OverviewSales chartSeries={linegraph} sx={{ height: "100%" }} />
      </div>
      <div className="col-span-1 p-6 space-y-8 bg-white border rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-slate-700">User Roles</h2>
        <UserRoles
          chartSeries={piegraph}
          labels={["Admin", "Staff", "Member"]}
          sx={{ height: "100%" }}
        />
      </div>
    </div>
  );
}
