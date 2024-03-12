import React from "react";

const InputForm = ({ placeholder }) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className="w-[900px] py-4 px-5 outline-none border-2 border-primary rounded-xl mb-10"
      />
      <br />
    </>
  );
};

export default InputForm;
