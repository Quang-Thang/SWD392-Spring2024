import React, { Fragment } from "react";
import Header from "./Header";

const HomepageLayout = ({ children }) => {
  return (
    <Fragment>
      {/* <Header></Header> */}
      {children}
    </Fragment>
  );
};

export default HomepageLayout;
