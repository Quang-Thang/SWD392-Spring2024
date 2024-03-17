import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { checkout, sendMail } from "../../services/PaymentService";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Invoice from "./Invoice";
import { getBidInfoById } from "../../services/BidService";
import moment from "moment";
import PaymentBox from "./PaymentBox";

const data = {
  realEstateName: "Gia Định Plaza",
  address: "Quận 1",
  owner: "Mr.Gia Định",
  time: "2024/3/18 10:49 AM",
  bidAmount: "3.000.000.000 VNĐ",
  status: "Đang chờ thanh toán",
};
const PaymentForm = () => {
  const location = useLocation();
  const { bidId } = location.state || {};
  const [auctionInfo, setAuctionInfo] = useState(null);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const now = new Date();

  const getBidInfo = async () => {
    const res = await getBidInfoById(bidId);
    if (res) {
      console.log("Bing: ", res.data.data);
      setAuctionInfo(res.data.data);
    } else {
      console.log("Cook");
    }
  };
  useEffect(() => {
    getBidInfo();
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <h1 className="pl-40 mt-10 mb-5 text-3xl font-semibold">
        Chi tiết hóa đơn
      </h1>
      <div className="flex px-36">
        <div className="basis-[60%] m-5">
          <div className="flex">
            <div className="basis-[60%]">
              <img
                src={
                  auctionInfo?.auction.thumbnailUrl ||
                  "https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg"
                }
                alt=""
                className="w-[600px] h-[500px] rounded-tl-lg rounded-bl-lg"
              />
            </div>
            <div className="basis-[40%] border-2 border-l-0 p-4 rounded-tr-lg rounded-br-lg">
              <h2 className="billTitle">Tên bất động sản:</h2>{" "}
              <div className="cardTitle">
                {auctionInfo?.auction.title || "Không thể hiển thị"}
              </div>
              <h2 className="billTitle">Địa chỉ:</h2>
              <div className="cardTitle">
                {auctionInfo?.auction.address || "Không thể hiển thị"}
              </div>
              <h2 className="billTitle">Chủ:</h2>
              <div className="cardTitle">
                {auctionInfo?.auction.owner || "Giấu tên"}
              </div>
              <h2 className="billTitle">Người điều hành phòng đấu giá:</h2>
              <div className="cardTitle">
                {auctionInfo?.auction.admin || "Giấu tên"}
              </div>
              <h2 className="billTitle">Đã đấu giá thành công lúc:</h2>{" "}
              <div className="cardTitle">
                {moment(now.toUTCString()).format("YYYY/MM/DD - h:mm A") ||
                  "Không thể hiển thị thời gian"}
              </div>
              <h2 className="billTitle">Mức giá:</h2>
              <div className="cardTitle">
                {formatter.format(auctionInfo?.amount)}
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[40%] p-10 border rounded-md m-5 h-full">
          <PaymentBox
            now={now}
            time={auctionInfo?.date}
            amount={auctionInfo?.amount}
            title={auctionInfo?.auction.title}
          />
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
