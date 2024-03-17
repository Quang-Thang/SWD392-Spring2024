import { logBid } from "../../services/BidService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutButton = ({ realEstateInfo, bidId }) => {
  const navigate = useNavigate();

  console.log("BidId: ", bidId);
  // const [bidSuccessId, setBidSuccessId] = useState(null);
  // setBidSuccessId(bidId.data.data.bidId);
  const handleCheckout = async (e) => {
    e.preventDefault();

    navigate("/checkout", { state: { bidId } });
  };
  return (
    <div>
      <button
        onClick={handleCheckout}
        className="px-5 py-2 text-white bg-green-600 rounded-lg"
      >
        Thanh toán tại đây
      </button>
    </div>
  );
};

export default CheckoutButton;
