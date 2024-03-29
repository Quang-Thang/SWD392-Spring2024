import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import InputForm from "./InputForm";

const SendInvoice = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    emailjs
      .sendForm("service_x8e7jet", "template_o7m1h0e", form.current, {
        publicKey: "DjZuABdH9_3fr08gm",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  }, []);
  return (
    <div className="">
      <form ref={form} onSubmit={sendEmail}>
        <label className="block mb-2 font-semibold text-gray-700">Name</label>
        <input
          type="text"
          name="user_name"
          className="p-3 px-5 border rounded-lg"
        />

        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="user_email"
          className="p-3 px-5 border rounded-lg"
        />

        <label className="block mb-2 font-semibold text-gray-700">
          Message
        </label>
        <textarea
          name="message"
          className="w-[300px] p-3 px-5 border border-gray-600 rounded-lg focus:outline-none focus:border-sky-500"
        />

        <input
          type="submit"
          value="Send"
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-700"
        />
      </form>
    </div>
  );
};

export default SendInvoice;
