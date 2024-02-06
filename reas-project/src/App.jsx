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

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<DashboardContent />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
