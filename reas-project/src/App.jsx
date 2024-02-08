import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AdminDashboardLayout from "./layout/AdminDashboardLayout";
import DashboardContent from "./components/admin/DashboardContent";
import UserList from "./components/admin/UserList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<DashboardContent />} />
          <Route path="/admin/userList" element={<UserList/>} />
        </Route>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
