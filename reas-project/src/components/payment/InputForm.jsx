import React from "react";

const InputForm = ({ label, placeholder, name, type = "text" }) => {
  return (
    <>
      <label className="text-xl font-semibold">{label}</label>
      <br />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-5 py-2 my-3 border rounded-lg outline-none border-inputBorder"
        name={name}
      />
    </>
  );
};

export default InputForm;
