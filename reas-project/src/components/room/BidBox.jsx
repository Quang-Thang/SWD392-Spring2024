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

const BidBox = ({ roomName, bidTimes, userName, currentBid }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const bidInputRef = useRef(null);
  const [bidAmount, setBidAmount] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);

  console.log("bidTimes in bidbox: ", bidTimes);

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
    try {
      const newBid = {
        amount: bidText,
        userName: user.userInfo.username,
        timestamp: serverTimestamp(),
      };
      const reference = ref(realtimeDB, "rooms/" + roomName);
      set(reference, {
        userName: userName,
        currentBid: currentBid.amount,
        times: 0,
      });

      await setDoc(
        doc(db, "rooms", roomName, "bids", "Bid of " + roomName),
        newBid
      );

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
      <form onSubmit={handleSubmitBid}>
        <div className="flex items-center pl-1 mt-5">
          <input
            type="number"
            ref={bidInputRef}
            className="px-5 py-2  border border-purple-500 rounded outline-none w-full basis-[95%]"
          />
          <span className="mx-3 font-bold select-none basis-[5%] text-xl">
            VND
          </span>
        </div>

        <br />
        <div className="flex items-center justify-center w-full">
          <button
            className="w-[150px] px-5 py-1 border border-purple-500 rounded outline-none"
            type="submit"
            disabled={disabledButton}
          >
            <span className="relative flex items-center justify-center gap-3 text-xl font-semibold">
              <RiAuctionFill color="blue" className="absolute left-0" /> Bid
            </span>
          </button>
        </div>
      </form>
      <div>
        <h1 className="pt-5 text-2xl font-medium">
          <span>
            Mức cược hiện tại:{" "}
            <b className="font-extrabold">{bidAmount.amount} VND</b> được ra giá
            bởi{" "}
          </span>
          <span className="font-extrabold">{bidAmount.userName} </span>
        </h1>
      </div>
    </>
  );
};

export default BidBox;
