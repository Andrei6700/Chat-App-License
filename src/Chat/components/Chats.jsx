import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useTheme } from "../../context/dark-mode";
import { format } from "date-fns";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { theme } = useTheme();
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className={`chats ${theme === "dark" ? "dark" : ""}`}>
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div className="div" key={chat[0]}>
              <div
                className={`userChat ${theme}`}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <img src={chat[1].userInfo?.photoURL} alt="" />
                <div className={`userChatInfo ${theme}`}>
                  <span>{chat[1].userInfo?.displayName}</span>
                  <p className={`responsiveP ${theme}`}>
                    {chat[1].lastMessage?.text?.startsWith("encrypted:")
                      ? "[Image]"
                      : chat[1].lastMessage?.text}
                  </p>
                </div>
              </div>
              <hr className="splitter" />
            </div>
          ))}
    </div>
  );
};

export default Chats;
