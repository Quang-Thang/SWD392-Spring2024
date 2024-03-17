import React, { useEffect, useRef, useState } from "react";
import InputForm from "./InputForm";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import moment from "moment";

const PaymentBox = ({ now, amount, title }) => {
  const cardElementOptions = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#F7A14C",
        color: "#000",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#F7A14C" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe(); // Provided by Stripe Elements
  const elements = useElements();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const form = useRef();

  // useEffect(() => {

  // }, []);

  const formatedDate = moment(now).format("YYYY/MM/DD - h:mm A");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement)
    );
    setProcessing(false);

    if (error) {
      setError(error.message);
      console.log("Bug at payment: ", error);
    } else {
      // Send the token to your backend for charging

      console.log("Token:", token.id);
      if (token) {
        try {
          await axios.post(
            "https://swdprojectapi.azurewebsites.net/api/payments",
            {
              amount: amount,
              stripeToken: token.id,
            }
          );
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
          console.log("Checkout success");
          navigate("/invoice", {
            state: { now, amount, userName, email, formatedDate, title },
          });
        } catch (error) {
          console.log("Bug at checkout: ", error);
        }
      }
    }
  };

  return (
    <>
      <h1 className="mb-2 text-3xl font-semibold">Thanh toán tại đây</h1>
      <h2 className="my-2 text-2xl">
        Vui lòng nhập thông tin cá nhân bên dưới
      </h2>
      <div>
        <div>
          <form ref={form}>
            <label className="block mb-2 font-semibold text-gray-700">
              Tên của bạn
            </label>
            <input
              type="text"
              name="user_name"
              className="w-full p-3 px-5 border rounded-lg"
              onChange={(e) => setUserName(e.target.value)}
            />

            <label className="block mb-2 font-semibold text-gray-700">
              Địa chỉ Email
            </label>
            <input
              type="email"
              name="user_email"
              className="w-full p-3 px-5 border rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="hidden">
              <label className="block mb-2 font-semibold text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                className="w-[300px] p-3 px-5 border border-gray-600 rounded-lg focus:outline-none focus:border-sky-500"
              />
              <input type="text" name="title" value={title} />
              <input type="text" name="date" value={formatedDate} />
              <input type="number" name="amount" value={amount} />
              <input
                type="submit"
                value="Send"
                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-700"
              />
              <input type="text" />
            </div>
          </form>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="pt-5">
            <label htmlFor="card-number" className="text-2xl font-semibold">
              Số thẻ
            </label>
            <div className="px-5 py-2 my-3 border rounded-lg border-inputBorder">
              <CardElement options={cardElementOptions} />
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              className="px-6 py-3 text-white bg-orange-500 rounded-lg"
              type="submit"
              disabled={processing}
            >
              {processing ? "Processing..." : "Thực hiện thanh toán"}
            </button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default PaymentBox;
