import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { db, onValue, realtimeDB, ref } from "../firebase/firebase-config";
import { IoLogOut } from "react-icons/io5";
import ChatTabs from "../components/room/ChatTabs";
import UserGrid from "../components/room/UserGrid";
import { useSelector } from "react-redux";
import BidBox from "../components/room/BidBox";
import ConfirmBox from "../components/room/ConfirmBox";
import { FaMoneyBill } from "react-icons/fa";
import { RiAuctionLine } from "react-icons/ri";
import CheckoutButton from "../components/room/CheckoutButton";
import axios from "axios";

const Room = () => {
  const location = useLocation();
  const [bidAmount, setBidAmount] = useState({});
  const { realEstateId, realEstateInfo, userName, role, userId } =
    location.state || {};
  const [bidTimes, setBidTimes] = useState(null);
  const [winner, setWinner] = useState(null);
  const [latestBidUser, setLatestBidUser] = useState(null);
  const [isClose, setIsClose] = useState(false);
  const [bidId, setBidId] = useState(null);

  const user = useSelector((state) => state.auth.login.currentUser);

  const handleOutRoom = async () => {
    const userOut = {
      id: userId,
      role: role,
      userName: userName,
    };
    try {
      await deleteDoc(
        doc(db, "rooms", realEstateId, "users", user.userInfo.userId),
        userOut
      );
      console.log("Delete success");
    } catch (error) {
      console.log("Delete fail", error);
    }
  };

  const getConfirmBid = () => {
    const confirmRef = ref(realtimeDB, "rooms/" + realEstateId);
    onValue(confirmRef, (snapshot) => {
      const data = snapshot.val();
      console.log("times: ", data.times);
      setBidTimes(data.times);
      setLatestBidUser(data);
      console.log("latestBidUser: ", latestBidUser);
      if (data.times === 3) {
        setWinner({
          name: bidAmount.userName,
          userId: data.userId,
          amount: bidAmount.amount,
        });
        setIsClose(true);
      }
    });
  };
  const getBid = () => {
    // No async needed here since onSnapshot is real-time
    const bidsRef = collection(db, "rooms", realEstateId, "bids");
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
  // useEffect(() => {}, []);

  const logBid = async () => {
    try {
      const res = await axios.post(
        "https://swdprojectapi.azurewebsites.net/api/bids",
        {
          amount: latestBidUser?.currentBid,
          memberId: winner.userId,
          auctionId: realEstateId,
        }
      );
      getBid();
      setBidId(res.data.data.bidId);
      console.log("amount: ", bidAmount?.amount);
      console.log("memberId", winner.userId);
      console.log("auctionId", realEstateId);
      console.log("Bid id: ", res.data);
      console.log("bidId 2: ", bidId);
    } catch (error) {
      console.log("Bug at logbid: ", error);
    }
  };
  useEffect(() => {
    getBid();
    if (isClose) {
      getBid();
      logBid();
    } else {
      console.log("Auction not finish yet");
    }
  }, [isClose]);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      {user ? (
        <div className="h-screen bg-slate-900">
          <div className="flex items-center justify-between">
            <h1 className="mb-10 text-2xl font-bold text-white">{`Mã phòng: ${realEstateId}`}</h1>
            <h1 className="mb-10 mr-5 text-2xl font-bold text-white">{`Tên người dùng: ${user?.userInfo?.username}`}</h1>
          </div>
          <div className="flex items-center justify-between px-10">
            <Link to="/" className="mb-1 ml-auto">
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
          <div className="flex p-3 rounded-lg">
            <div className="basis-[70%]">
              <div className="flex">
                <div className="basis-[50%]">
                  <div className="pr-5">
                    <img
                      src={realEstateInfo?.thumbnail}
                      alt=""
                      className="w-full h-[500px] rounded-xl"
                    />
                  </div>
                  <div className="p-3 mt-5 rounded-lg bg-slate-800 h-[250px] w-[630px]">
                    <span className="flex items-center gap-4 text-3xl font-semibold text-white">
                      <FaMoneyBill />
                      {formatter.format(bidAmount?.amount)} bởi{" "}
                      {latestBidUser?.userName}
                    </span>{" "}
                    <span className="flex items-center gap-4 my-3 text-xl text-white">
                      <RiAuctionLine size={30} />
                      <span className="text-2xl font-semibold">
                        Lần thứ {bidTimes}
                      </span>
                    </span>
                    {user?.userInfo.userId === winner?.userId && (
                      <div className="fixed z-50 p-4 text-white -translate-x-1/2 bg-green-500 rounded-lg top-16 left-1/2">
                        <h1 className="text-xl font-semibold">
                          Người thắng cuộc
                        </h1>
                        <p>
                          <span className="">Xin chúc mừng bạn </span>
                          <span className="font-bold">
                            {bidAmount.userName}
                          </span>{" "}
                          đã giành chiến thắng
                        </p>
                        <CheckoutButton
                          realEstateInfo={realEstateInfo}
                          bidId={bidId}
                        />
                      </div>
                    )}
                    {user?.userInfo.role === "Admin" ? (
                      <>
                        <ConfirmBox
                          roomName={realEstateId}
                          currentBid={bidAmount}
                          userName={latestBidUser?.userName}
                          userId={latestBidUser?.userId}
                          isClose={isClose}
                        />
                      </>
                    ) : (
                      <BidBox
                        userName={latestBidUser?.userName}
                        currentBid={bidAmount}
                        roomName={realEstateId}
                        bidTimes={bidTimes}
                        isClose={isClose}
                      />
                    )}
                  </div>
                </div>
                <div className="basis-[50%] pr-5">
                  <div className="h-full p-3 bg-slate-800 rounded-xl">
                    <UserGrid roomName={realEstateId} userName={userName} />
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-[30%] bg-white rounded-lg">
              <div className="overflow-hidden border rounded">
                <ChatTabs
                  roomName={realEstateId}
                  userName={userName}
                  role={role}
                  userId={userId}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Phiên đăng nhập hết hạn vui lòng đăng nhập lại</h1>
          <Link to="/login">
            <button>Tại đây</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Room;
