import React from "react";
import Proptypes from "prop-types";
import { Input } from "../ui/input";

const inputForm = ({ type = "text", className = "" }) => {
  return (
    <>
      <Input
        type={type}
        className={`w-full outline-none border shadow-md rounded-lg ${className}`}
      />
      ;
    </>
  );
};

export default inputForm;
