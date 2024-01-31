import React from "react";
import Proptypes from "prop-types";

const inputForm = ({ title = "", ...rest }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Family name"
        className="px-4 py-2 border rounded-md outline-none border-slate-200"
      />
    </div>
  );
};

export default inputForm;
