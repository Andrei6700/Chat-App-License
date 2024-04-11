import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useTheme } from "../../context/dark-mode";
// import { format } from "date-fns";

const Chats = () => {
  // State to store the chats data
  const [chats, setChats] = useState([]);
  // Custom hook to get the current theme (dark or light)
  const { theme } = useTheme();
  // Context to access the current user's information
  const { currentUser } = useContext(AuthContext);
  // Context to dispatch actions related to chat
  const { dispatch } = useContext(ChatContext);

  // Effect hook to fetch chats data from Firebase Firestore
  useEffect(() => {
    const getChats = () => {
      // "Subscribe" to the userChats document in Firestore
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // "Subscribe" to the userChats document in Firestore
        setChats(doc.data());
      });
      // Cleanup function to unsubscribe from the document when the component unmounts
      return () => {
        unsub();
      };
    };
    // Only run the getChats function if currentUser.uid is available
    currentUser.uid && getChats();
  }, [currentUser?.uid]);
  // Function to handle selecting a chat
  const handleSelect = (u) => {
    // Dispatch an action to change the current user in the chat context
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
