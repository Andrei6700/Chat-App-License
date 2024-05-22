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
  
    // Verificăm dacă destinatarul mesajului este ChatBot
    const isChatBotRecipient = data.user.uid === '7BVlKy0cHwVc4brvfjQmsKsICdF2';

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      try {
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
  
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: encryptedText,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
  
        await updateLastMessage(data.chatId, encryptedText);

        if (isChatBotRecipient) {
          await sendMessageToChatBot(text); // Trimite mesajul original către ChatBot
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      await sendMessage(encryptedText);

      if (isChatBotRecipient) {
        await sendMessageToChatBot(text); // Trimite mesajul original către ChatBot
      }
    }
  
    setText("");
    setImg(null);
  };

  // Funcție pentru a trimite mesajul către ChatBot.py
  const sendMessageToChatBot = async (messageText) => {
    try {
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: messageText }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message to ChatBot');
      }

      console.log('Message sent to ChatBot successfully!');
    } catch (error) {
      console.error('Error sending message to ChatBot:', error);
    }
  };

  // Define an asynchronous function called sendMessage that takes encryptedText as a parameter
  const sendMessage = async (encryptedText) => {
    // Use updateDoc to update a document in the "chats" collection in the database
    // The document has an id of data.chatId
    // The update operation adds a new message to the "messages" array in the document
    // The new message has a unique id, the encrypted text, the id of the sender, and the current timestamp
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: encryptedText,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    // Call the updateLastMessage function with the chatId and the original (unencrypted) text
    await updateLastMessage(data.chatId, text);
  };
  
  const updateLastMessage = async (chatId, text) => {
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId]: {
        lastMessage: {
          text,
        },
        date: serverTimestamp(),
      },
    });
  
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [chatId]: {
        lastMessage: {
          text,
        },
        date: serverTimestamp(),
      },
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
