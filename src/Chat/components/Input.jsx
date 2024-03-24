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
import axios from "axios";

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
    // if me message is sent to Chat Bot and is not empty, send it to the Python server
    if (data.user.uid === '04Tb6Cy8X0Rtn9wjgDUkKUmhGTu1' && text.trim() !== "") {
      try {
        const response = await axios.post('http://localhost:5000/ask', {
          question: text.trim() // send the message to the server/ChatBot
        });
        const answer = response.data.answer; //take the answer from the server

        console.log('ChatBot: ', answer);
      } catch (error) {
        console.error('Error ChatBot :((', error);
      }
    }
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
                text,
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
          text: encryptedText, // encrypted message
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
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
