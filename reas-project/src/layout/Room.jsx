import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { IoIosSend } from "react-icons/io";
import { db } from "../firebase/firebase-config";
import { uid } from "uid";
import { toast } from "react-toastify";
import { PiClockCountdownFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";
import { RiAuctionFill } from "react-icons/ri";
import ChatTabs from "../components/room/ChatTabs";
import UserGrid from "../components/room/UserGrid";
import { useSelector } from "react-redux";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const { roomName, role, userId } = location.state || {};
  const [bidAmount, setBidAmount] = useState({});
  const bidInputRef = useRef(null);
  const [timeRemain, setTimeRemain] = useState(60);
  const intervalRef = useRef();
  const [start, setStart] = useState(false);
  const [bidSuccess, setBidSuccess] = useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);

  const userName = user.userInfo.username;

  const handleSubmitBid = async (e) => {
    e.preventDefault();
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
        userName: userName,
        timestamp: serverTimestamp(),
      };

      await setDoc(
        doc(db, "rooms", roomName, "bids", "Bid of " + roomName),
        newBid
      );

      setStart(true);
      bidInputRef.current.value = "";
      toast.success("Đặt cược thành công 🚀");
      console.log("Bing roi");
    } catch (error) {
      console.error("Error submitting bid:", error);
    }
  };

  const handleOutRoom = async () => {
    const userOut = {
      id: userId,
      role: role,
      userName: userName,
    };
    try {
      await deleteDoc(
        doc(db, "rooms", roomName, "users", user.userInfo.userId),
        userOut
      );
      console.log("Delete success");
    } catch (error) {
      console.log("Delete fail", error);
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

  const handleStart = () => {
    setStart(true);
  };

  return (
    <>
      <div>
        <h1 className="mb-10 text-2xl font-bold">{`Welcome to ${roomName}, Mr.${user.userInfo.username}`}</h1>
        {role === "Admin" ? <h1>I am an admin</h1> : null}
        <div className="flex items-center justify-between px-10">
          <div className="px-3 py-2 text-white rounded-xl bg-slate-900">
            <h1 className="flex items-center gap-3 text-2xl font-medium">
              <PiClockCountdownFill />
              {/* Thời gian còn lại: {timeRemain} giây */}
            </h1>
          </div>
          <Link to="/">
            <button
              className="px-2 py-2 bg-red-500 rounded"
              onClick={handleOutRoom}
            >
              <span className="flex items-center justify-between gap-1 text-white">
                <IoLogOut color="white" size="20" />
                Thoát
              </span>
            </button>
          </Link>
        </div>
        <div className="flex p-10">
          <div className="basis-[70%]">
            <div className="flex">
              <div className="basis-[50%]">
                <div className="pr-5">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg"
                    alt=""
                    className="w-full h-[500px] rounded-xl"
                  />
                </div>
              </div>
              <div className="basis-[50%] pr-5">
                <div className="bg-slate-900 rounded-xl h-[500px] p-3">
                  <UserGrid roomName={roomName} />
                </div>
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
                    >
                      <span className="relative flex items-center justify-center gap-3 text-xl font-semibold">
                        <RiAuctionFill
                          color="blue"
                          className="absolute left-0"
                        />{" "}
                        Bid
                      </span>
                    </button>
                  </div>
                </form>
                <div>
                  <h1 className="pt-5 text-2xl font-medium">
                    <span>
                      Current bid:{" "}
                      <b className="font-extrabold">{bidAmount.amount} VND</b>{" "}
                      was bided by{" "}
                    </span>
                    <span className="font-extrabold">
                      {bidAmount.userName}{" "}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-[30%]  bg-white h-[750px]">
            <div className="overflow-hidden border rounded">
              <ChatTabs
                roomName={roomName}
                userName={userName}
                role={role}
                userId={userId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
