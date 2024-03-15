import React, { useEffect, useRef, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import { IoIosSend } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { uid } from "uid";
import { toast } from "react-toastify";

const ChatTabs = ({ roomName, userName, role }) => {
  const [value, setValue] = useState("1");
  const messageRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [userJoined, setUserJoined] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();
    const messageText = messageRef.current.value;
    if (messageText.trim() === "") return;
    try {
      const message = {
        content: messageText,
        userName: userName,
        timestamp: serverTimestamp(),
      };
      await setDoc(doc(db, "rooms", roomName, "messages", uid(32)), message);
      messageRef.current.value = "";
      console.log("Bing roi");
    } catch (error) {
      console.log("Loi roi em oi! " + error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function formatTimestamp(timestamp) {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const handleRemove = async (user) => {
    if (user.role === "admin") {
      toast.error("Cannot remove an admin");
      return;
    } // Only admins can remove users

    const userRemove = {
      id: user.id,
      role: user.role,
      userName: user.userName,
    };
    try {
      await deleteDoc(
        doc(db, "rooms", "roomName", "users", user.id),
        userRemove
      );
      console.log("Delete user successfully");
    } catch (error) {
      console.log("Remove user failed ", error);
    }

    console.log(user.id);
  };

  useEffect(() => {
    const getMessages = async () => {
      const messagesRef = collection(db, "rooms", roomName, "messages");
      const messagesQuery = query(messagesRef, orderBy("timestamp"));
      // Real-time listener
      onSnapshot(messagesQuery, (querySnapshot) => {
        const messageList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setMessages(messageList);
      });
    };
    getMessages();

    const getUsers = async () => {
      const usersRef = collection(db, "rooms", roomName, "users");
      const usersQuery = query(usersRef, orderBy("userName"));

      onSnapshot(usersQuery, (querySnapshot) => {
        const userList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setUserJoined(userList);
      });
    };

    getUsers();
  }, []);

  return (
    <Box className="h-[650px] relative w-full">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: 0 }}>
          <TabList onChange={handleChange}>
            <Tab value="1" icon={<GroupIcon />} />
            <Tab value="2" icon={<ChatIcon />} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="h-full">
            {userJoined &&
              userJoined.map((item, index) => (
                <div
                  key={"index" + index}
                  className="flex items-center justify-between py-2 border-b-2 "
                >
                  <div className="">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png"
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                    <span className="text-xl">{item.userName}</span>
                    <span className="mx-3 italic text-red-500">
                      {item.role}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemove(item)}
                    className={
                      role === "admin"
                        ? `hover:bg-slate-100 p-1 rounded-full`
                        : `cursor-not-allowed`
                    }
                  >
                    <FaSignOutAlt
                      size={25}
                      color={role === "admin" ? `` : `grey`}
                    />
                  </button>
                </div>
              ))}
          </div>
        </TabPanel>
        <TabPanel value="2">
          <ul className="w-full h-full pr-5 overflow-y-scroll">
            {messages.length > 0 &&
              messages.map((msg) => (
                <li
                  className="flex items-center justify-between mb-4"
                  key={msg.timestamp}
                >
                  <span className="basis-[82%]">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png"
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                    <span className="font-bold text-red-500">
                      {msg.userName}
                    </span>
                    <span> {msg.content}</span>
                  </span>
                  <span className="basis-[16%]">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </li>
              ))}
          </ul>

          <div className="absolute flex items-center justify-center w-full gap-2 bottom-1 left-1">
            <input
              className="px-5 py-2 my-5 border border-purple-400 rounded outline-none basis-[85%] bg-white shadow-md"
              type="text"
              ref={messageRef}
            />
            <button
              className="basis-[7%] p-1 bg-slate-500 rounded-full hover:bg-slate-600 active:bg-slate-700"
              onClick={handleSend}
            >
              <IoIosSend size="30" />
            </button>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ChatTabs;
