import React from "react";
import { Link } from "react-router-dom";

const VerifyMail = () => {
  return (
    <>
      <div>
        <h1>Vui lòng kiểm tra mail và xác nhận</h1>
        <Link to="/login">
          <button>Nhấn vào nếu bạn xác nhận</button>
        </Link>
      </div>
    </>
  );
};

export default VerifyMail;
