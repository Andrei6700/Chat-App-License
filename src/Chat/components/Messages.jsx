import React, { useContext, useEffect, useState, useRef } from "react";
import Message from "./Message";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useTheme } from "../../context/dark-mode";
import { format } from "date-fns";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { theme } = useTheme();
  const messagesEndRef = useRef(null);

  const shouldShowDate = (index) => {
    if (index === 0) return true; 
    const currentDate = messages[index].date.toDate();
    const previousDate = messages[index - 1].date.toDate();
    return format(currentDate, "dd/MM/yyyy") !== format(previousDate, "dd/MM/yyyy");
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`messages ${theme}`}>
     {messages.map((message, index) => (
  <Message key={index} message={message} showDate={shouldShowDate(index)} />
))}
     <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;