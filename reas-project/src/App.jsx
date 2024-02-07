import "./App.css";
import Dashboardview from "./components/admin/Dashboardview";
import Sidebar from "./components/admin/Sidebar";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DashboardContent from "./components/admin/DashboardContent";
import { AuthProvider } from "./contexts/auth-context";
import UserProfile from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

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
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<DashboardContent />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
