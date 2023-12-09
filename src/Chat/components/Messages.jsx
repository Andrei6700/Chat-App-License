import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useTheme } from "../../context/dark-mode";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { theme } = useTheme();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className={`messages ${theme}`}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default Messages;
