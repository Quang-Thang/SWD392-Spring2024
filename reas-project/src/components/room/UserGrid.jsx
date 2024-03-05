import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";

const UserGrid = ({ roomName }) => {
  const [userJoined, setUserJoined] = useState([]);
  useEffect(() => {
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
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {userJoined.length > 0 &&
          userJoined.map((item, index) => (
            <div
              className="flex flex-col items-center p-2 text-white rounded-xl bg-slate-700"
              key={index}
            >
              <img
                src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png"
                alt=""
                className="w-[60px] h-[60px] rounded-full object-cover"
              />
              <div className="mt-2 font-semibold">{item.userName}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserGrid;
