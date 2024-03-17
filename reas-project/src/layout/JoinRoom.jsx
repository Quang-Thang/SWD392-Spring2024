import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const JoinRoom = ({
  realEstateId,
  realEstateInfo,
  stepPrice,
  initialPrice,
}) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  // const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(0);

  const navigate = useNavigate();

  console.log("Real estate id: ", realEstateInfo);

  const handleSubmit = async () => {
    navigate("/room", {
      state: {
        realEstateId,
        realEstateInfo,
        userName,
        role,
        userId,
        stepPrice,
        initialPrice,
      },
    }); // Navigate with state

    try {
      const newUser = {
        userName: user.userInfo.username,
        role: user.userInfo.role,
        id: user.userInfo.userId,
      };

      await setDoc(
        doc(db, "rooms", realEstateId, "users", user.userInfo.userId),
        newUser
      );

      console.log("Add user success");
    } catch (error) {
      console.log("Add user failed " + error);
    }
  };

  useEffect(() => {
    if (user && user.userInfo) {
      setUserName(user.userInfo.username);
      setUserId(user.userInfo.userId);
      setRole(user.userInfo.role);
      console.log("userName in join room: ", user.userInfo.username);
    }
  }, [user]);

  return (
    <>
      {user ? (
        <div>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 font-semibold text-white rounded-md bg-primary"
          >
            Tham gia
          </button>
        </div>
      ) : (
        <div>
          <h1>Vui lòng đăng nhập trước khi vào phòng</h1>
          <Link to="/login">
            <span className="text-blue-500">Đăng nhập tại đây</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default JoinRoom;
