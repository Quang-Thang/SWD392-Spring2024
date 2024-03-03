import React from "react";
import { Link } from "react-router-dom";
import HomepageLayout from "../layout/HomepageLayout";
import HomeBanner from "../modules/home/HomeBanner";
import HomeFeature from "../modules/home/HomeFeature";
import HomeNewest from "../modules/home/HomeNewest";

const HomePage = () => {
  return (
    <>
      <HomepageLayout>
        <HomeBanner />
        <HomeFeature />
        <HomeNewest />
      </HomepageLayout>
      {/* <div className="flex items-center justify-between">
        <Button>
          <Link to="/login">Login</Link>
        </Button>
        <Button>
          {" "}
          <Link to="/register">Register</Link>
        </Button>
        <Button>
          <Link to="/admin">Admin</Link>
        </Button>
      </div> */}
    </>
  );
};

export default HomePage;
