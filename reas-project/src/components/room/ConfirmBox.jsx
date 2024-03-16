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
import { MdFileDownloadDone } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";

const ConfirmBox = ({ roomName, currentBid, userName, userId, isClose }) => {
  const [bidAmount, setBidAmount] = useState({});
  const [confirmBid, setConfirmBid] = useState({});
  const [bidTimes, setBidTimes] = useState(1);
  const [disabledButton, setDisabledButton] = useState(false);
  console.log("UserId: ", userId);

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
        userId: userId,
        currentBid: currentBid.amount,
        times: bidTimes,
      });
    } catch (error) {
      console.log("Bug at confirmbox: ", error);
    }
  };

  useEffect(() => {
    setBidTimes(0);
  }, [currentBid.amount]);

  return (
    <>
      {!isClose ? (
        <div>
          <div>
            <h1 className="pt-5 text-2xl font-medium">
              <span className="text-white">
                Mức cược hiện tại:{" "}
                <b className="font-extrabold">{currentBid.amount} VND</b> được
                ra giá bởi{" "}
              </span>
              <span className="font-extrabold text-white">{userName} </span>
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
          </div>
        </div>
      ) : (
        <div className="text-2xl font-semibold text-white">
          <span className="flex items-center gap-4">
            <div className="p-1 rounded-full bg-slate-500">
              <MdFileDownloadDone />
            </div>
            Cuộc đấu giá đã kết thúc
          </span>

          <span className="flex items-center gap-4 mt-3">
            <IoPersonCircleOutline size={30} /> {userName} đã giành chiến thắng
          </span>
        </div>
      )}
    </>
  );
};

export default ConfirmBox;
