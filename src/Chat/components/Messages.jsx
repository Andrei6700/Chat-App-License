import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
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
  // Using the AuthContext to get the current user
  const { currentUser } = useContext(AuthContext);
  // State to store the messages
  const [messages, setMessages] = useState([]);
  // Using the ChatContext to get the chat data
  const { data } = useContext(ChatContext);
  // Using the useTheme hook to get the current theme
  const { theme } = useTheme();
  // Ref to the end of the messages list, used to scroll into view
  const messagesEndRef = useRef(null);

  // fetch messages from the Firestore
  const fetchMessages = useCallback(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), async (docData) => {
      if (docData.exists()) {
        // Mark messages as read if they are not sent by the current user and are unread
        const allMessages = docData.data().messages;
        const newMessages = allMessages.map((message) => {
          if (message.senderId !== currentUser.uid && !message.read) {
            return { ...message, read: true };
          }
          return message;
        });
        // Update the document in Firestore with the new messages
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: newMessages,
        });
        // Update the messages state with the new messages, limited by the limit state
        setMessages(newMessages); // No limit, load all messages
      }
    });
    return unSub;
  }, [data.chatId, currentUser.uid]);

  // Fetch messages on component mount and clean up on unmount
  useEffect(() => {
    const unSub = fetchMessages();
    return () => {
      unSub();
    };
  }, [fetchMessages]);

  // Scroll to the end of the messages list whenever the messages state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const shouldShowDate = (index) => {
    if (index === 0) return true;
    const currentDate = messages[index].date.toDate();
    const previousDate = messages[index - 1].date.toDate();
    return (
      format(currentDate, "dd/MM/yyyy") !== format(previousDate, "dd/MM/yyyy")
    );
  };

  return (
    <div className={`messages ${theme}`}>
      {messages.map((message, index) => {
        const decryptedMessage = decrypt(message.text);
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
