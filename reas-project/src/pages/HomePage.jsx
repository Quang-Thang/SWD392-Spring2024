import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomepageLayout from "../layout/HomepageLayout";
import HomeBanner from "../modules/home/HomeBanner";
import HomeFeature from "../modules/home/HomeFeature";
import HomeNewest from "../modules/home/HomeNewest";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

const HomePage = () => {
  localStorage.setItem("toan03182@gmail.com", "true");
  localStorage.setItem("tanthanh123@gmail.com", "true");
  localStorage.setItem("nhoxtrongan147@gmail.com", "true");
  localStorage.setItem("loquangthang01@gmail.com", "true");
  return (
    <>
      <HomepageLayout>
        <HomeBanner />
        <HomeFeature />
        <HomeNewest />
      </HomepageLayout>
    </>
  );
};

export default HomePage;
