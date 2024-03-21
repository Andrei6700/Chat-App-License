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
    if (encryptedText === "") {
      return;
    }
    // message without encryption
    console.log("Message sent:", text); 
    // message with encryption
    console.log("Message sent:", encryptedText); 
    // Check if the message is intended for 04Tb6Cy8X0Rtn9wjgDUkKUmhGTu1 aka chatbot
    if (data.user.uid === "04Tb6Cy8X0Rtn9wjgDUkKUmhGTu1") {
      // Send the message to the server
      console.log("Sending message to server:", text); // Print the message being sent to the server
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: text }) // body: JSON.stringify({ question: encryptedText })
      });
  
      const responseData = await response.json();
      console.log(responseData);
  
      // Handle the response from the server 
    } else {
      // Send the message to the Firebase database
      if (img) {
        const storageRef = ref(storage, uuid());
  
        const uploadTask = uploadBytesResumable(storageRef, img);
  
        uploadTask.on(
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text:encryptedText, //the message it s encrypted in data base 
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: encryptedText,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
    }
  
    setText("");
    setImg(null);
  };
  

  const handleKey = (e) => {
    if (e.code == "Enter" && text.trim() !== "") {
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