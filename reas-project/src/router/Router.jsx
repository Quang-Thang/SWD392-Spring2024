import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import AdminPage from "../components/admin/DashboardContent";
import UserInformation from "../components/user_profile/UserInformation";
import LoginPage from "../pages/LoginPage";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Homepage </div>} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<UserInformation />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
