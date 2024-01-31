import "./App.css";
import Dashboardview from "./components/admin/Dashboardview";
import Sidebar from "./components/admin/Sidebar";
import UserInfomation from "./components/user_profile/UserInformation";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* <div className="flex">
        <div className="basis-[12%] h-[100vh]">
          <Sidebar />
        </div>
        <div className="basis-[88%] border">
          <Dashboardview />
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div> */}
      <UserInfomation />
    </>
  );
}

export default App;
