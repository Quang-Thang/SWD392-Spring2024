import { Route, Routes } from "react-router-dom";
import "./App.css";
<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AdminDashboardLayout from "./layout/AdminDashboardLayout";
import DashboardContent from "./components/admin/DashboardContent";
import UserList from "./components/admin/UserList";
import AuctionRoom from "./components/admin/AuctionRoom";
import JoinRoom from "./layout/JoinRoom";
import Room from "./layout/Room";
import { ToastContainer } from "react-toastify";
import Header from "./layout/Header";
import PostList from "./layout/PostList";
import Contact from "./layout/Contact";
import PostDetail from "./layout/PostDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path="/postlist" element={<PostList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/postDetail" element={<PostDetail />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<DashboardContent />} />
          <Route path="/admin/userList" element={<UserList />} />
          <Route path="/admin/auctionRoom" element={<AuctionRoom />} />
        </Route>

        <Route path="/joinroom" element={<JoinRoom />} />
        <Route path="/room" element={<Room />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
=======
import Login from "./login/Login";
import Register from "./login/Register";
function App() {
  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"background": '#323433'}}>
       <Routes>
        <Route path='login' element={ <Login/>}/>
        <Route path='register' element={<Register/>}/>
       </Routes>
    </div>
>>>>>>> f41397e60e9edfd116dd66897392afba7fa4ad91
  );
}

export default App;
