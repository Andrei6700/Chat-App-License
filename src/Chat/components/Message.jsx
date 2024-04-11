import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { isToday, isYesterday } from "date-fns";
import { format } from "date-fns";
import { useTheme } from "../../context/dark-mode";

const Message = ({ message, showDate }) => {
  // Use context to access the current user and chat data
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  // Use custom hook to get the current theme (light or dark)
  const { theme } = useTheme();
  // Convert message date from Firestore Timestamp to JavaScript Date object
  const createdAt = message.date.toDate();
  // Format the time of the message
  const formattedHour = format(createdAt, "HH:mm");
  // Determine the display date string based on whether the date is today, yesterday, or earlier
  const formattedDate = isToday(createdAt)
    ? "Today"
    : isYesterday(createdAt)
    ? "Yesterday"
    : format(createdAt, "dd.MM.yyyy");

  // Determine the alt text for the image based on whether the message is from the current user
  const altText =
    message.senderId === currentUser.uid
      ? "User's profile picture"
      : "Chat participant's profile picture";

  return (
    <div>
      {/* Conditionally render the date container if showDate is true */}
      {showDate && (
        <div className="messageDate-Container">
          <span className={`messageDate ${theme}`}>{formattedDate}</span>
        </div>
      )}
      {/* Message container with dynamic classes based on the sender and theme */}
      <div
        className={`message ${
          message.senderId === currentUser.uid && "owner"
        } ${theme}`}
      >
        <div className="messageInfo">
          {/* Display user's or chat participant's profile picture */}
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt={altText}
          />
          <span>{formattedHour}</span>
        </div>
        <div className="messageContent">
          {/* Conditionally render text message */}
          {message.text && <p className="ResponsiveTextChat">{message.text}</p>}
          {/* Conditionally render image if present in the message */}

          {message.img && (
            <p className="ResponsiveTextChat">
              <img src={message.img} alt="" style={{ width: "441px" }} />
            </p>
          )}
          {/* Display read status for messages sent by the current user */}
          <span>
            {message.senderId === currentUser.uid &&
              (message.read ? "Seen" : "Unseen")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
