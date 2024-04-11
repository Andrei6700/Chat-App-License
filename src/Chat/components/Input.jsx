import React, { useContext, useState } from "react";
import Attach from "../../img/paperclip.svg";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { v4 as uuid } from "uuid";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { formatRelative } from "date-fns";
import { useTheme } from "../../context/dark-mode";
import { encrypt } from "../../AES Encryption/encrypt";

//display individual messages with relative date formatting
const DisplayMessage = ({ message }) => {
  const createdAt = message.date.toDate();
  const formattedDate = formatRelative(createdAt, new Date());

  return (
    <div>
      <p>{message.text}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

// Input component for sending messages and handling file uploads
const Input = () => {
  const [text, setText] = useState(""); // State for message text
  const [img, setImg] = useState(null); // State for uploaded image
  const { theme } = useTheme(); // Context for current theme (dark or light)
  const { currentUser } = useContext(AuthContext); // Context for user authentication data
  const { data } = useContext(ChatContext); // Context for chat-related data

      // Function to handle sending messages and images
  const handleSend = async () => {
    const encryptedText = encrypt(text.trim()); // Encrypt the message text
    if (!text.trim() && !img) {
      return;
    }

    if (img) {
      await uploadImage(encryptedText); // Handle image upload if image is present
    } else {
      await sendMessage(encryptedText); // Send message if only text is present
    } 

    setText(""); // Clear the text input after sending
    setImg(null); // Clear the image input after sending
  };

    // Function to upload images to Firebase Storage and update Firestore
  const uploadImage = async (encryptedText) => {
    const storageRef = ref(storage, uuid()); // Create a unique reference for the image
    const uploadTask = uploadBytesResumable(storageRef, img); // Start the upload task

    try {
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref); // Get the URL of the uploaded image

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: encryptedText,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: downloadURL,
        }),
      });

      await updateLastMessage(data.chatId, encryptedText); // Update the last message info
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

      // Function to send text messages and update Firestore
  const sendMessage = async (encryptedText) => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: encryptedText,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateLastMessage(data.chatId, text);  // Update the last message info
  };

      // Function to update the last message in user chats
  const updateLastMessage = async (chatId, text) => {
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });
  };

      // Event handler for sending message on Enter key press
  const handleKey = (e) => {
    if (e.code === "Enter" && text.trim() !== "") {
      handleSend();
    }
  };

  return (
    <div className={`bodyinput ${theme}`}>
      <input
        className={`inputChatPage ${theme}`}
        type="text"
        name="text"
        placeholder="Type something..."
        onKeyDown={handleKey}
        onChange={(e) => setText(e.target.value)}
        value={text}
        required
      />
      {text && (
        <div className="clear-button" onClick={() => setText("")}>
          &times;
        </div>
      )}
      <input
        type="file"
        style={{ display: "none" }}
        id="file"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <label htmlFor="file">
        <img src={Attach} alt="" />
      </label>
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Input;
