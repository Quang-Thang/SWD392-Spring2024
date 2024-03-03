import React from "react";
import Header from "../components/user_profile/Header";
import UserInformation from "../components/user_profile/UserInformation";
import Footer from "../components/user_profile/Footer";

const UserProfile = () => {
  return (
    <>
      <Header />
      <UserInformation />
      <Footer />
    </>
  );
};

export default UserProfile;
