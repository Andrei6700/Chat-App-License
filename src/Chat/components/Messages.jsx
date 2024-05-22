import React, { useContext, useEffect, useState, useRef } from "react";
import Message from "./Message";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useTheme } from "../../context/dark-mode";
import { format } from "date-fns";
import { updateDoc } from "firebase/firestore";
import { decrypt } from "../../AES Encryption/decrypt";

const Messages = () => {
  // const Message = React.lazy(()=> import("./Message") )
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { theme } = useTheme();
  const messagesEndRef = useRef(null);

  // Use the useEffect hook to run side effects after render
  useEffect(() => {
    // Create a real-time listener on the chat document with id data.chatId in the database
    // The listener is unsubscribed when the component is unmounted
    const unSub = onSnapshot(doc(db, "chats", data.chatId), async (docData) => {
      // Check if the document exists
      if (docData.exists()) {
        // Map over the messages in the document
        // If the sender of the message is not the current user and the message is not read,
        // return a new object with the same properties as the message and read set to true
        // Otherwise, return the message as is
        const newMessages = docData.data().messages.map((message) => {
          if (message.senderId !== currentUser.uid && !message.read) {
            return { ...message, read: true };
          }
          return message;
        });
        // Update the state with the new messages
        setMessages(newMessages);
        // Update the messages in the document in the database with the new messages
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: newMessages,
        });
      }
    });
    // Return a cleanup function that unsubscribes the listener when the component is unmounted
    return () => {
      unSub();
    };
    // The effect depends on data.chatId and currentUser.uid, and will run again if either of them changes
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
            message={{ ...message, text: decryptedMessage }}
            showDate={shouldShowDate(index)}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
