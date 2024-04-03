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
import { encrypt } from '../../AES Encryption/encrypt';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { theme } = useTheme();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const Message = ({ message }) => {
    const createdAt = message.date.toDate();
    const formattedDate = formatRelative(createdAt, new Date());
  };

  const handleSend = async () => {
    const encryptedText = encrypt(text.trim()); 
    if (!text.trim() && !img) {
      return;
    }
  
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      try {
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
  
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: encryptedText, // mesajul criptat
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
  
        await updateLastMessage(data.chatId, encryptedText);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      await sendMessage(encryptedText);
    }
  
    setText("");
    setImg(null);
  };
  
  const sendMessage = async (encryptedText) => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: encryptedText, // mesajul criptat
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
  
    await updateLastMessage(data.chatId, text);
  };
  
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

    setText("");
    setImg(null);
  };

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
