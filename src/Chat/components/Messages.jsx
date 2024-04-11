import React, {
  useContext,
  useEffect,
    useRef,
  useReducer,
} from "react";
import Message from "./Message";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { useTheme } from "../../context/dark-mode";
// import { format } from "date-fns";
import { decrypt } from "../../AES Encryption/decrypt";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  // collection,
  // query,
  // orderBy,
  // limit,
  doc,
  // getDoc,
  onSnapshot,
  // updateDoc,
  // getDocs,
  // startAfter,
} from "firebase/firestore";

// Initial state for the reducer (empty array)
const initialState = [];

// Reducer function for managing messages state
const messagesReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGES":
      return action.payload; // Set the entire messages array
    case "UPDATE_MESSAGES":
      return state.map((message) => {
        // Update read status of messages
        if (message.senderId !== action.payload.senderId && !message.read) {
          return { ...message, read: true };
        }
        return message;
      });
    default:
      return state; // Return current state for unrecognized actions
  }
};

// Main component for displaying messages
const Messages = () => {
  const { currentUser } = useContext(AuthContext); // Current user from AuthContext
  const [messages, dispatch] = useReducer(messagesReducer, initialState); // State management using reducer
  const { data } = useContext(ChatContext); // Chat data from ChatContext
  const { theme } = useTheme(); // Current theme from theme context
  const messagesEndRef = useRef(null); // Ref for scrolling to the end of messages

  // Effect for subscribing to message updates in Firestor
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), async (docData) => {
      if (docData.exists()) {
        const newMessages = docData.data().messages.map((message) => {
          // Mark messages as read if they are from other users
          if (message.senderId !== currentUser.uid && !message.read) {
            return { ...message, read: true };
          }
          return message;
        });
        dispatch({ type: "SET_MESSAGES", payload: newMessages }); // Dispatch new messages to state
        // Batch update read status in Firestore
        const messagesToUpdate = newMessages.filter(
          (message) => message.senderId !== currentUser.uid && !message.read
        );
        if (messagesToUpdate.length > 0) {
          const batch = db.batch();
          messagesToUpdate.forEach((message) => {
            const messageRef = doc(
              db,
              "chats",
              data.chatId,
              "messages",
              message.id
            );
            batch.update(messageRef, { read: true });
          });
          await batch.commit();
        }
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId, currentUser.uid]);
  // Function to determine if the date should be shown for a message
  const shouldShowDate = (index) => {
    if (index === 0) return true;
    const currentDate = messages[index].date.toDate();
    const previousDate = messages[index - 1].date.toDate();
    const currentDateObj = currentDate.toDateString();
    const previousDateObj = previousDate.toDateString();
    return currentDateObj !== previousDateObj;
  };
  // Effect to scroll to the bottom of the messages when messages update
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={`messages ${theme}`}>
      <InfiniteScroll
        dataLength={messages.length}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        inverse={true}
      >
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
      </InfiniteScroll>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
