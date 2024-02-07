import React, { useEffect } from "react";
import Header from "../components/user_profile/Header";
import UserInformation from "../components/user_profile/UserInformation";
import Footer from "../components/user_profile/Footer";
import userAPI from "../services/userAPI";

const UserProfile = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await userAPI.getAll();
      console.log(userList);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Header />
      <UserInformation />
      <Footer />
    </>
  );
};

export default UserProfile;
