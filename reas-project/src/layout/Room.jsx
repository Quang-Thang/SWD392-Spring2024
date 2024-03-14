import React, { useEffect, useRef, useState } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
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
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, onValue, realtimeDB, ref } from "../firebase/firebase-config";
import { IoLogOut } from "react-icons/io5";
import ChatTabs from "../components/room/ChatTabs";
import UserGrid from "../components/room/UserGrid";
import { useSelector } from "react-redux";
import BidBox from "../components/room/BidBox";
import ConfirmBox from "../components/room/ConfirmBox";

const Room = () => {
  const location = useLocation();
  const [bidAmount, setBidAmount] = useState({});
  const { roomName, userName, role, userId } = location.state || {};
  const [bidTimes, setBidTimes] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isOngoing, setIsOngoing] = useState(true);

  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();

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
      if (role === "Admin") {
        const roomARef = doc(db, "rooms", roomName);
        await updateDoc(roomARef, {
          status: "Closed",
        });
        setIsOngoing(false);
        console.log("Room is closed. Room status: ", isOngoing);
      }
      console.log("Delete success");
    } catch (error) {
      console.log("Delete fail", error);
    }
  };

  const getConfirmBid = () => {
    const confirmRef = ref(realtimeDB, "rooms/" + roomName);
    onValue(confirmRef, (snapshot) => {
      const data = snapshot.val();
      console.log("times: ", data.times);
      setBidTimes(data.times);
      if (data.times === 3) {
        setWinner({
          name: bidAmount.userName,
          amount: bidAmount.amount,
        });
      }
    });
  };
  const getBid = () => {
    // No async needed here since onSnapshot is real-time
    const bidsRef = collection(db, "rooms", roomName, "bids");
    const unsubscribe = onSnapshot(bidsRef, (querySnapshot) => {
      // Important: Store the unsubscribe function
      querySnapshot.forEach((doc) => {
        setBidAmount(doc.data());
      });
    });

    getConfirmBid();
    // setIsOngoing(true);

    return unsubscribe; // Use this for cleanup later
  };
  useEffect(() => {
    getBid();

    // Cleanup function for useEffect

    // If a getBid listener is active, unsubscribe when the component unmounts
    if (!isOngoing) {
      navigate("/");
      console.log("Admin out");
    }
    // const unsubscribeBid = getBid();
    // if (unsubscribeBid) unsubscribeBid();
  }, []);

  const getStatus = async () => {
    const roomARef = doc(db, "rooms", roomName);
    const docSnap = await getDoc(roomARef);
    if (docSnap.exists()) {
      const status = docSnap.data().status;
      console.log("Status:", status);
      setIsOngoing(status);
      return status;
    } else {
      console.log("Document not found!");
      // Handle case where the document might not exist
    }
  };

  const handleClose = () => {
    setIsOngoing(false);
    console.log(isOngoing);
  };
  return (
    <>
      {!isOngoing ? (
        <div>
          <Link to="/">
            <button className="px-5 py-2 bg-blue-400 rounded-lg">Out</button>
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="mb-10 text-2xl font-bold">{`Welcome to ${roomName}, Mr.${user.userInfo.username}`}</h1>
          <div className="flex items-center justify-between px-10">
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
                    <UserGrid roomName={roomName} userName={userName} />
                  </div>
                  <h1>
                    {bidAmount.amount} lần thứ {bidTimes}
                  </h1>
                  {winner && (
                    <div className="fixed z-50 p-4 text-white -translate-x-1/2 bg-green-500 rounded-lg top-16 left-1/2">
                      <h1>Winner!</h1>
                      <p>
                        Congratulations,{" "}
                        <span className="font-bold">{bidAmount.userName}</span>{" "}
                        won with a bid of {bidAmount.amount}
                      </p>
                    </div>
                  )}
                  {user.userInfo.role === "Admin" ? (
                    <>
                      <ConfirmBox
                        roomName={roomName}
                        currentBid={bidAmount}
                        userName={bidAmount.userName}
                      />
                      <button onClick={handleClose}>Close</button>
                    </>
                  ) : (
                    <BidBox
                      userName={bidAmount.userName}
                      currentBid={bidAmount}
                      roomName={roomName}
                      bidTimes={bidTimes}
                    />
                  )}
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
      )}
    </>
  );
};

export default Room;
