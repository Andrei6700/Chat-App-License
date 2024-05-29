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
import axios from 'axios';

const CHATBOT_UID = "c91Timipb2gNuKeQUPAOSrLdj0W2"; // UID-ul chatbotului

const Input = () => {
  const [text, setText] = useState("");  // State for input text
  const [img, setImg] = useState(null);  // State for selected image
  const { theme } = useTheme();  // Get the current theme from context
  const { currentUser } = useContext(AuthContext);  // Get the current user from AuthContext
  const { data } = useContext(ChatContext);  // Get chat data from ChatContext
  const [previousQuestion, setPreviousQuestion] = useState("");  // State for the previous question

  // handle sending messages
  const handleSend = async () => {
    const encryptedText = encrypt(text.trim());  // Encrypt the text input
    if (!text.trim() && !img) {
      return; // Return if there is no text or image to send
    }
  
    if (img) {
      const storageRef = ref(storage, uuid()); // Create a reference to storage with a unique ID
      const uploadTask = uploadBytesResumable(storageRef, img); // Upload the image
  
      try {
        const snapshot = await uploadTask;  // Await
        const downloadURL = await getDownloadURL(snapshot.ref);  // Get the download URL of the uploaded image
  
                // Update Firestore document chats with the new message
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: encryptedText,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
  
        await updateLastMessage(data.chatId, encryptedText); // Update the last message
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      await sendMessage(encryptedText); // Send text message if there is no imag
    }

    // Send message to ChatBot if the user is ChatBot
    if (data.user.uid === CHATBOT_UID) {
      // Trimite mesajul către ChatBot
      axios.post('http://localhost:5000/ask', { question: text.trim(), previous_question: previousQuestion })
        .then(response => {
          const botMessage = response.data.answer; // Get the bot's reply
          sendBotReply(botMessage); // Send the bot's reply to the chat
          if (response.data.unanswered_question) {
            setPreviousQuestion(response.data.unanswered_question); // Set the previous question if it's unanswered
          } else {
            setPreviousQuestion(""); // Reset previous question if not applicable
          }
        })
        .catch(error => {
           console.error("Error sending message to ChatBot:", error);   // check for errors, hope i don thave
        });
    }
  
    setText("");
    setImg(null);
  };

//asynchronous function  that takes encryptedText as a parameter, basic send a message
  const sendMessage = async (encryptedText) => {
      // Use updateDoc to update a document in the "chats" collection in the database
  // The document has an id of data.chatId
  // The update operation adds a new message to the "messages" array in the document
  // The new message has a unique id, the encrypted text, the id of the sender, and the current timestamp
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: encryptedText, // the encrypted message
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateLastMessage(data.chatId, text); // Update the last message
  };

  //send a bot's reply
  const sendBotReply = async (botMessage) => {
    const encryptedBotMessage = encrypt(botMessage); // Encrypt the bot's reply
        // Update Firestore document with the bot's reply
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: encryptedBotMessage,
        senderId: CHATBOT_UID,
        date: Timestamp.now(),
      }),
    });
  // Call the updateLastMessage function with the chatId and the original (unencrypted) text
    await updateLastMessage(data.chatId, botMessage); // Update the last message
  };

  //update the last message in the chat
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

  // handle for 'Enter' key press for sending messages instead press on button
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
        onChange={(e) => setText(e.target.value)}  // Update text state on input change
        value={text}
        required
      />
      {text && (
        <div className="clear-button" onClick={() => setText("")}>
          &times;   {/* Display a clear button when there is text */} 
        </div>
      )}
      <input
        type="file"
        style={{ display: "none" }}
        id="file"
        onChange={(e) => setImg(e.target.files[0])}  // Update image state on file selection 
      />
      <label htmlFor="file">
        <img src={Attach} alt="" />
      </label>
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Input;
