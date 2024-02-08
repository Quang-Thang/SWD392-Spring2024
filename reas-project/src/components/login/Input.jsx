import React from "react";

const Input = ({
  label = "",
  onChange = () => {},
  className = "",
  type = "text",
  placeholder = "Username",
}) => {
  return (
    <>
      <label htmlFor="Username">{label}</label>
      <br />
      <input
        type={type}
        className={`w-full px-4 py-2 border rounded-md outline-none border-slate-400 ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
