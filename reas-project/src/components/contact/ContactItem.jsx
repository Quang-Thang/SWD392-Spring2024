import React from "react";

const ContactItem = ({ icon, title, children }) => {
  return (
    <>
      <div className="flex items-center p-5 w-[500px] rounded-2xl contact-item">
        <div className="basis-[20%]">{icon}</div>
        <div className="basis-[80%]">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-3 text-gray-600">{children}</p>
        </div>
      </div>
    </>
  );
};

export default ContactItem;
