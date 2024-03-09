import { collection, increment, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  db,
  onValue,
  realtimeDB,
  ref,
  set,
  update,
} from "../../firebase/firebase-config";
import { toast } from "react-toastify";

const ConfirmBox = ({ roomName, currentBid, userName }) => {
  const [bidAmount, setBidAmount] = useState({});
  const [confirmBid, setConfirmBid] = useState({});
  const [bidTimes, setBidTimes] = useState(1);
  const [disabledButton, setDisabledButton] = useState(false);

  console.log(currentBid.amount);

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (bidTimes >= 3) {
      setDisabledButton(true);
      console.log("bidTimes: ", bidTimes);
    }
    try {
      setBidTimes((t) => t + 1);
      const reference = ref(realtimeDB, "rooms/" + roomName);
      set(reference, {
        userName: userName,
        currentBid: currentBid.amount,
        times: bidTimes,
      });
    } catch (error) {
      console.log("Bug at confirmbox: ", error);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    try {
      const reference = ref(realtimeDB, "rooms/" + roomName);
      set(reference, {
        userName: userName,
        currentBid: currentBid.amount,
        times: 0,
      });
      setBidTimes(0);
    } catch (error) {
      console.log("Bug at confirmbox: ", error);
    }
  };

  return (
    <>
      <div>
        <h1 className="pt-5 text-2xl font-medium">
          <span>
            Mức cược hiện tại:{" "}
            <b className="font-extrabold">{currentBid.amount} VND</b> được ra
            giá bởi{" "}
          </span>
          <span className="font-extrabold">{userName} </span>
        </h1>
      </div>
      <div>
        <button
          className="px-5 py-2 text-gray-100 rounded-lg shadow-lg bg-primary"
          onClick={handleConfirm}
          disabled={disabledButton}
        >
          Xác nhận giá trị đặt cược
        </button>
        <button
          className="px-5 py-2 text-gray-100 rounded-lg shadow-lg bg-primary"
          onClick={handleReset}
          disabled={disabledButton}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default ConfirmBox;
