import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import AdminPage from "../components/admin/DashboardContent";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
