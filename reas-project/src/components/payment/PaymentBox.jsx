import React, { useState } from "react";
import InputForm from "./InputForm";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SendInvoice from "./SendInvoice";

const PaymentBox = ({ time, amount, title }) => {
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
  const [isCheckout, setIsCheckout] = useState(false);
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
          setIsCheckout(true);
          //   await sendMail("loquangthang01@gmail.com", "Hello 3", "alo alo");
          navigate("/invoice");
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
        <SendInvoice
          time={time}
          amount={amount}
          title={title}
          isCheckout={isCheckout}
        />
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
