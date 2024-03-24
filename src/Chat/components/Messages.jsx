import React, { useContext, useEffect, useState, useRef } from "react";
import Message from "./Message";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useTheme } from "../../context/dark-mode";
import { format } from "date-fns";
import { updateDoc } from "firebase/firestore";
import { decrypt } from '../../AES Encryption/decrypt';

const Messages = () => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { theme } = useTheme();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), async (docData) => {
      if (docData.exists()) {
        const newMessages = docData.data().messages.map((message) => {
          if (message.senderId !== currentUser.uid && !message.read) {
            return { ...message, read: true };
          }
          return message;
        });
        setMessages(newMessages);

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: newMessages,
        });
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId, currentUser.uid]);

  const shouldShowDate = (index) => {
    if (index === 0) return true;
    const currentDate = messages[index].date.toDate();
    const previousDate = messages[index - 1].date.toDate();
    return (
      format(currentDate, "dd/MM/yyyy") !== format(previousDate, "dd/MM/yyyy")
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`messages ${theme}`}>
    {messages.map((message, index) => {
  const decryptedMessage = decrypt(message.text);
  //  console.log('Decrypted message:', decryptedMessage); 
  return (
    <Message
      key={index}
      message={{...message, text: decryptedMessage}} 
      showDate={shouldShowDate(index)}
    />
  );
})}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;