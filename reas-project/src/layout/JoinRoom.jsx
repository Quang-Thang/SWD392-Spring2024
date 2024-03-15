import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const JoinRoom = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate("/room", { state: { roomName, userName, role, userId } }); // Navigate with state
    if (user.userInfo.role === "Admin") {
      setIsAdmin(true);
      var isActive = "Ongoing";
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

      const roomARef = doc(db, "rooms", roomName);
      await updateDoc(roomARef, {
        status: isActive,
      });
      console.log("Status field added to roomA successfully!");

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
      <div className="flex">
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
    </>
  );
};

export default JoinRoom;
