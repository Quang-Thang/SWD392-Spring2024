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
  // const [hubConnection, setHubConnection] = useState < HubConnection > null;

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
