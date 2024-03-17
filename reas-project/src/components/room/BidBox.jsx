import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { db, realtimeDB, ref, set } from "../../firebase/firebase-config";
import { useSelector } from "react-redux";
import { RiAuctionFill } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaMoneyBill } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";

const BidBox = ({ roomName, bidTimes, userName, currentBid, isClose }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const bidInputRef = useRef(null);
  const [bidAmount, setBidAmount] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    if (bidTimes >= 3) {
      setDisabledButton(true);
    }
    const bidText = bidInputRef.current.value;
    if (bidText.trim() === "") {
      toast.error("Vui lòng nhập số tiền muốn cược 🚀");
      return;
    }
    if (bidText <= bidAmount.amount) {
      console.log("Error boy");
      toast.error("Vui lòng đặt cược lớn hơn giá trị cược hiện tại 🚀");
      return;
    }
    const minimumBid = bidAmount.amount * 1.2;
    if (bidText < minimumBid) {
      toast.error(
        `Vui lòng đặt cược ít nhất ${minimumBid} VND (cao hơn 20% giá hiện tại) 🚀`
      );
      return;
    }
    try {
      let bidNumber = parseInt(bidText);
      console.log("Type of current bid: ", typeof currentBid.amount);
      const newBid = {
        amount: bidNumber,
        userName: user.userInfo.username,
        timestamp: serverTimestamp(),
      };
      const reference = ref(realtimeDB, "rooms/" + roomName);

      await setDoc(
        doc(db, "rooms", roomName, "bids", "Bid of " + roomName),
        newBid
      );
      set(reference, {
        userName: user.userInfo.username,
        userId: user.userInfo.userId,
        currentBid: bidNumber,
        times: 0,
      });
      bidTimes = 0;
      bidInputRef.current.value = "";
      toast.success("Đặt cược thành công 🚀");
      console.log("Bing roi");
    } catch (error) {
      console.error("Error submitting bid:", error);
    }
  };

  useEffect(() => {
    const getBid = () => {
      // No async needed here since onSnapshot is real-time
      const bidsRef = collection(db, "rooms", roomName, "bids");
      const unsubscribe = onSnapshot(bidsRef, (querySnapshot) => {
        // Important: Store the unsubscribe function
        querySnapshot.forEach((doc) => {
          setBidAmount(doc.data());
        });
      });

      return unsubscribe; // Use this for cleanup later
    };
    getBid();

    // Cleanup function for useEffect
    return () => {
      // If a getBid listener is active, unsubscribe when the component unmounts
      const unsubscribeBid = getBid();
      if (unsubscribeBid) unsubscribeBid();
    };
  }, []);

  return (
    <>
      {!isClose ? (
        <div>
          <form onSubmit={handleSubmitBid}>
            <div className="flex items-center pl-1 mt-5">
              <input
                type="number"
                ref={bidInputRef}
                className="px-5 py-2  border-2 border-red-500 rounded outline-none w-full basis-[95%]"
              />
              <span className="mx-3 font-bold select-none basis-[5%] text-xl text-white">
                VND
              </span>
            </div>

            <br />
            <div className="flex items-center justify-center w-full">
              <button
                className="w-[150px] px-5 py-1 border-2 border-white rounded-lg outline-none"
                type="submit"
                disabled={disabledButton}
              >
                <span className="relative flex items-center justify-center gap-3 text-xl font-semibold">
                  <RiAuctionFill color="white" className="absolute left-0" />{" "}
                  <span className="font-semibold text-white">Bid</span>
                </span>
              </button>
            </div>
          </form>
          <div>
            {/* <h1 className="pt-5 text-2xl font-medium">
              <span>
                Mức cược hiện tại:{" "}
                <b className="font-extrabold">{bidAmount.amount} VND</b> được ra
                giá bởi{" "}
              </span>
              <span className="font-extrabold">{bidAmount.userName} </span>
            </h1> */}
          </div>
        </div>
      ) : (
        <div className="text-2xl font-semibold text-white">
          <span className="flex items-center gap-4 my-5">
            <div className="p-1 rounded-full bg-slate-500">
              <MdFileDownloadDone />
            </div>
            <span className="text-red-500">Cuộc đấu giá đã kết thúc</span>
          </span>

          {userName === user.userInfo.userName ? (
            <span className="flex items-center gap-4 mt-3">
              <IoPersonCircleOutline size={30} /> Bạn đã giành chiến thắng
            </span>
          ) : (
            <span className="flex items-center gap-4 mt-3 text-yellow-500">
              <IoPersonCircleOutline size={30} /> {userName} đã giành chiến
              thắng
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default BidBox;
