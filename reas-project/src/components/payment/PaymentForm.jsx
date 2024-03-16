import React, { useState } from "react";
import InputForm from "./InputForm";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { checkout, sendMail } from "../../services/PaymentService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Invoice from "./Invoice";

const data = {
  realEstateName: "Gia Định Plaza",
  address: "Quận 1",
  owner: "Mr.Gia Định",
  time: "2024/3/18 10:49 AM",
  bidAmount: "3.000.000.000 VNĐ",
  status: "Đang chờ thanh toán",
};
const PaymentForm = () => {
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
  const [amount, setAmount] = useState(300000);
  const navigate = useNavigate();

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
          await sendMail("loquangthang01@gmail.com", "Hello 3", "alo alo");
          navigate("/invoice");
        } catch (error) {
          console.log("Bug at checkout: ", error);
        }
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="basis-[60%] m-5">
          <h1 className="mb-5 text-3xl font-semibold">Chi tiết hóa đơn</h1>
          <div className="flex">
            <div className="basis-[60%]">
              <img
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-[600px] h-[500px] rounded-lg"
              />
            </div>
            <div className="basis-[40%] bg-slate-200 p-4 rounded-lg">
              <h2 className="billTitle">Tên bất động sản:</h2>{" "}
              <div className="cardTitle">{data.realEstateName}</div>
              <h2 className="billTitle">Địa chỉ:</h2>
              <div className="cardTitle">{data.address}</div>
              <h2 className="billTitle">Chủ:</h2>
              <div className="cardTitle">{data.owner}</div>
              <h2 className="billTitle">Đã đấu giá thành công lúc:</h2>{" "}
              <div className="cardTitle">{data.time}</div>
              <h2 className="billTitle">Mức giá:</h2>
              <div className="cardTitle">{data.bidAmount}</div>
              <h2 className="billTitle">Trạng thái:</h2>
              <div className="cardTitle">{data.status}</div>
            </div>
          </div>
        </div>
        <div className="basis-[40%] p-3 border rounded-md m-5">
          <h1 className="mb-2 text-3xl font-semibold">
            Phương thức thanh toán
          </h1>
          <h2>Vui lòng hoàn tất thanh toán tại đây</h2>
          <div>
            <InputForm label="Email" placeholder="Nhập địa chỉ email của bạn" />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="card-number">Số thẻ</label>
                <div className="px-5 py-2 border rounded-lg border-inputBorder">
                  <CardElement options={cardElementOptions} />
                </div>
              </div>
              <button
                className="px-5 py-2 text-white bg-orange-500 rounded-lg"
                type="submit"
                disabled={processing}
              >
                {processing ? "Processing..." : "Pay"}
              </button>
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
