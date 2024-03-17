import React from "react";
import { Link } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";

const VerifyMail = () => {
  return (
    <>
      <div className="p-16 mx-auto my-auto bg-orange-300 rounded-xl">
        <h1 className="flex justify-center w-full mb-5 text-2xl font-bold text-gray-900">
          Vui lòng kiểm tra mail và xác nhận
        </h1>
        <Link to="/login">
          <button className="flex items-center justify-center w-full gap-2 py-2 bg-green-500 border rounded-lg hover:bg-green-600">
            <GiConfirmed color="yellow" size={20} /> Nhấn vào nếu bạn đã xác
            nhận
          </button>
        </Link>
      </div>
    </>
  );
};

export default VerifyMail;
