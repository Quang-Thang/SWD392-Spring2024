import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const JoinRoom = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(0);

  const navigate = useNavigate();

  console.log(user.userInfo);
  const handleSubmit = async () => {
    // Assuming any login logic is done here
    if (
      roomName.trim() === "" &&
      userName.trim() === "" &&
      role.trim() === ""
    ) {
      toast.error("Please input room name and user name and role");
      return;
    } else if (roomName.trim() === "") {
      toast.error("Please input room name");
      return;
    } else if (userName.trim() === "") {
      toast.error("Please input user name");
      return;
    } else if (role.trim() === "") {
      toast.error("Please input role");
      return;
    } else {
      navigate("/room", { state: { roomName, userName, role, userId } }); // Navigate with state
    }

    try {
      const newUser = {
        userName: user.userInfo.username,
        role: user.userInfo.role,
        id: user.userInfo.userId,
      };

      await setDoc(
        doc(db, "rooms", roomName, "users", user.userInfo.userId),
        newUser
      );
      console.log("Add user success");
    } catch (error) {
      console.log("Add user failed" + error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="basis-[70%]">
          <h1>Join Room</h1>
          <div>
            <input
              type="text"
              placeholder="Room name"
              onChange={(e) => setRoomName(e.target.value)}
              className="px-5 py-2 my-5 border border-purple-400 rounded outline-none"
            />
            <br />
            <input
              type="text"
              placeholder="Your name"
              onChange={(e) => setUserName(e.target.value)}
              className="px-5 py-2 mb-5 border border-purple-400 rounded outline-none"
            />
            <br />
            <input
              type="text"
              placeholder="Your role"
              onChange={(e) => setRole(e.target.value)}
              className="px-5 py-2 mb-5 border border-purple-400 rounded outline-none"
            />
            <br />
            <input
              type="text"
              placeholder="Your id"
              onChange={(e) => setUserId(e.target.value)}
              className="px-5 py-2 mb-5 border border-purple-400 rounded outline-none"
            />
            <br />
            <button
              onClick={handleSubmit}
              className="px-5 py-2 border border-purple-400 rounded"
            >
              Join
            </button>
          </div>
        </div>
        {/* <div className="basis-[30%]">
          <ChatTabs />
        </div> */}
      </div>
    </>
  );
};

export default JoinRoom;
