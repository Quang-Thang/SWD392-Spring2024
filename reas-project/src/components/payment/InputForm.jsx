import React from "react";

const InputForm = ({ label, placeholder }) => {
  return (
    <>
      <label className="text-xl font-semibold">{label}</label>
      <br />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-5 py-2 border rounded-lg border-inputBorder"
      />
    </>
  );
};

export default InputForm;
